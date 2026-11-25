// Built from a private repository (agent-data-api scripts/labels-sync.ts). Do not edit.
import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// src/history/labels.ts
var DEPLOYER_SOURCE = "history";
var FUNDER_SOURCE = "funders";
function deployerLabelSql(ts) {
  const t = Math.floor(ts);
  return [
    `INSERT OR IGNORE INTO address_labels (chain, address, label, category, source, first_seen, last_seen, seen) SELECT chain, (CASE WHEN chain = 'solana' THEN deployer ELSE lower(deployer) END), 'token-deployer', 'deployer', '${DEPLOYER_SOURCE}', min(first_seen), ${t}, 1 FROM pools WHERE deployer IS NOT NULL AND deployer <> '' GROUP BY chain, (CASE WHEN chain = 'solana' THEN deployer ELSE lower(deployer) END);`,
    `INSERT INTO address_labels (chain, address, label, category, source, first_seen, last_seen, seen) SELECT p.chain, (CASE WHEN p.chain = 'solana' THEN p.deployer ELSE lower(p.deployer) END), 'repeat-rugger', 'deployer', '${DEPLOYER_SOURCE}', ${t}, ${t}, 1 FROM pools p JOIN checks c ON c.chain = p.chain AND c.pool_key = p.pool_key WHERE c.gone = 1 AND p.deployer IS NOT NULL AND p.deployer <> '' GROUP BY p.chain, (CASE WHEN p.chain = 'solana' THEN p.deployer ELSE lower(p.deployer) END) HAVING count(DISTINCT p.pool_key) >= 2 ON CONFLICT (chain, address, category, label, source) DO UPDATE SET seen = seen + 1, last_seen = excluded.last_seen WHERE date(last_seen, 'unixepoch') < date(excluded.last_seen, 'unixepoch');`,
    `INSERT OR IGNORE INTO address_labels (chain, address, label, category, source, first_seen, last_seen, seen) SELECT d.chain, (CASE WHEN d.chain = 'solana' THEN d.wallet ELSE lower(d.wallet) END), 'first-funded-by-' || f.kind || ':' || f.label, 'funder', '${FUNDER_SOURCE}', coalesce(d.funded_at, d.checked_at), ${t}, 1 FROM deployer_funders d JOIN funders f ON f.chain = d.chain AND f.address = d.funder WHERE d.funder IS NOT NULL AND f.kind IN ('exchange', 'bridge', 'hub') AND f.label IS NOT NULL AND f.label <> '';`
  ];
}

// scripts/lib/d1-any.ts
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// scripts/lib/d1.ts
import { execFileSync } from "node:child_process";
var TRANSIENT = /\b(7403|7429|7500)\b|ECONNRESET|ETIMEDOUT|fetch failed/;
var SQL_ERROR = /SQLITE_|no such (table|column)|syntax error/i;
function base({ db: db2 = "agent-data-history", mainnet = true }) {
  return ["wrangler", "d1", "execute", db2, ...mainnet ? ["--env", "mainnet"] : [], "--remote"];
}
function errorText(e) {
  const err = e;
  return `${err.stdout?.toString() ?? ""} ${err.stderr?.toString() ?? ""}`.replace(/\s+/g, " ").trim().slice(0, 600) || String(err.message ?? e);
}
function withRetries(target, run) {
  const attempts = target.attempts ?? 3;
  for (let attempt = 1; ; attempt++) {
    try {
      return run();
    } catch (e) {
      const text = errorText(e);
      if (attempt >= attempts || !TRANSIENT.test(text) || SQL_ERROR.test(text)) throw new Error(`wrangler d1 execute failed: ${text}`);
      console.error(`D1 attempt ${attempt} failed (${text.match(TRANSIENT)?.[0]}); retrying`);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, target.waitMs ?? 2e4);
    }
  }
}
function d1Query(sql, target = {}) {
  return withRetries(target, () => {
    const out = execFileSync("npx", [...base(target), "--json", "--command", sql], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 1 << 28
    });
    return JSON.parse(out.slice(out.search(/^\[/m)))[0].results;
  });
}
function d1File(file, target = {}) {
  return withRetries(target, () => {
    const out = execFileSync("npx", [...base(target), "--yes", "--file", file], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28 });
    return out.match(/Executed[^\n]*/)?.[0] ?? out.slice(-300);
  });
}

// scripts/lib/d1-any.ts
function d1From(args) {
  const testnet = args.includes("--testnet");
  if (args.includes("--d1") || testnet) {
    const target = testnet ? { db: "agent-data-testnet", mainnet: false } : { db: "agent-data-history" };
    return {
      query: async (sql) => d1Query(sql, target),
      exec: async (statements, label) => {
        if (!statements.length) return;
        const path = join(tmpdir(), `${label}-${Date.now()}.sql`);
        writeFileSync(path, statements.join("\n"));
        console.log(`${label}: ${d1File(path, target)}`);
      }
    };
  }
  const { CLOUDFLARE_API_TOKEN: token, CF_ACCOUNT_ID: account, D1_DATABASE_ID: database } = process.env;
  if (!(token && account && database)) throw new Error("CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID and D1_DATABASE_ID are required (or pass --d1/--testnet/--dry)");
  const url = `https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${database}/query`;
  const run = async (sql) => {
    for (let attempt = 1; ; attempt++) {
      const r = await fetch(url, { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ sql }) });
      const j = await r.json().catch(() => null);
      if (r.ok && j?.success) return j.result?.[0]?.results ?? [];
      if (attempt >= 3) throw new Error(`D1 ${r.status}: ${JSON.stringify(j?.errors ?? j).slice(0, 300)}`);
      await new Promise((ok) => setTimeout(ok, 5e3 * attempt));
    }
  };
  return {
    query: async (sql) => await run(sql),
    exec: async (statements) => {
      for (const sql of statements) await run(sql);
    }
  };
}

// scripts/labels-sync.ts
var db = d1From(process.argv.slice(2));
await db.exec(deployerLabelSql(Date.now() / 1e3), "deployer labels");
var counts = await db.query(
  "SELECT label, count(*) n FROM address_labels WHERE category = 'deployer' GROUP BY label"
);
console.log("deployer labels:", counts.map((c) => `${c.label} ${c.n}`).join(", "));
