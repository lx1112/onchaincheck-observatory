// Built from a private repository (agent-data-api scripts/defi-tvl.ts). Do not edit.
import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// scripts/defi-tvl.ts
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// src/market/tvl.ts
var MIN_TVL = 1e6;
var PROTOCOL_COLUMNS = [
  "slug",
  "name",
  "category",
  "parent",
  "chains",
  "chain_tvls",
  "chain_count",
  "tvl_usd",
  "change_1h",
  "change_1d",
  "change_7d",
  "mcap_usd",
  "url",
  "listed_at",
  "updated_at"
];
var fin = (v) => {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
};
var str = (v, max = 120) => typeof v === "string" && v && v !== "None" ? v.slice(0, max) : null;
function protocolRow(p, updatedAt) {
  const tvl = fin(p?.tvl);
  const slug = str(p?.slug, 80);
  const name = str(p?.name, 80);
  if (tvl === null || tvl < MIN_TVL || !slug || !name) return null;
  const plain = Object.entries(p.chainTvls ?? {}).filter(([k, v]) => !k.includes("-") && !/^(staking|borrowed|pool2|treasury|vesting|offers|doublecounted|liquidstaking|dcandlsoverlap)$/i.test(k) && fin(v) !== null && fin(v) > 0).map(([k, v]) => [k.slice(0, 40), Math.round(fin(v))]).sort((a, b) => b[1] - a[1]);
  const chainNames = plain.length ? plain.map(([k]) => k) : Array.isArray(p.chains) ? p.chains.filter((c) => typeof c === "string") : [];
  return {
    slug,
    name,
    category: str(p.category, 40),
    parent: str(p.parentProtocol, 80),
    chains: JSON.stringify(chainNames.slice(0, 10)),
    chain_tvls: JSON.stringify(Object.fromEntries(plain.slice(0, 15))),
    chain_count: chainNames.length,
    tvl_usd: Math.round(tvl),
    change_1h: fin(p.change_1h),
    change_1d: fin(p.change_1d),
    change_7d: fin(p.change_7d),
    mcap_usd: fin(p.mcap) && fin(p.mcap) > 0 ? Math.round(fin(p.mcap)) : null,
    url: str(p.url, 200),
    listed_at: fin(p.listedAt),
    updated_at: updatedAt
  };
}
var lit = (v) => v === null ? "NULL" : typeof v === "number" ? String(v) : `'${v.replace(/'/g, "''")}'`;
function protocolInserts(rows2, perStatement = 100) {
  const out = [];
  for (let i = 0; i < rows2.length; i += perStatement) {
    const values = rows2.slice(i, i + perStatement).map((r) => `(${PROTOCOL_COLUMNS.map((c) => lit(r[c])).join(",")})`).join(",\n");
    out.push(`INSERT OR REPLACE INTO defi_protocols (${PROTOCOL_COLUMNS.join(",")}) VALUES
${values};`);
  }
  return out;
}
function seriesChange(series, chain, token = null) {
  const pts = (Array.isArray(series) ? series : []).filter((p) => fin(p?.date) !== null && fin(p?.tvl) !== null);
  if (!pts.length) return null;
  pts.sort((a, b) => a.date - b.date);
  const last = pts[pts.length - 1];
  const ago = (days) => {
    const t = last.date - days * 86400;
    const p = [...pts].reverse().find((x) => x.date <= t);
    return p && p.tvl > 0 ? Math.round((last.tvl - p.tvl) / p.tvl * 1e4) / 100 : null;
  };
  return { chain, tvlUsd: Math.round(last.tvl), change1dPct: ago(1), change7dPct: ago(7), change30dPct: ago(30), token };
}

// scripts/lib/d1.ts
import { execFileSync } from "node:child_process";
var TRANSIENT = /\b(7403|7429|7500)\b|ECONNRESET|ETIMEDOUT|fetch failed/;
var SQL_ERROR = /SQLITE_|no such (table|column)|syntax error/i;
function base({ db = "agent-data-history", mainnet = true }) {
  return ["wrangler", "d1", "execute", db, ...mainnet ? ["--env", "mainnet"] : [], "--remote"];
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
function d1File(file, target = {}) {
  return withRetries(target, () => {
    const out = execFileSync("npx", [...base(target), "--yes", "--file", file], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28 });
    return out.match(/Executed[^\n]*/)?.[0] ?? out.slice(-300);
  });
}

// scripts/defi-tvl.ts
var args = process.argv.slice(2);
var dry = args.includes("--dry");
var local = args.includes("--d1") || args.includes("--testnet");
var testnet = args.includes("--testnet");
var UA = { "user-agent": "onchaincheck.dev defi-tvl", accept: "application/json" };
var get = async (url) => {
  const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(6e4) });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
};
var list = await get("https://api.llama.fi/protocols");
if (!Array.isArray(list) || list.length < 1e3) throw new Error(`DefiLlama protocols answered only ${list?.length} entries; not replacing the table`);
var now = Math.floor(Date.now() / 1e3);
var seen = /* @__PURE__ */ new Set();
var rows = list.map((p) => protocolRow(p, now)).filter((r) => r !== null && !seen.has(String(r.slug)) && (seen.add(String(r.slug)), true));
var chainList = await get("https://api.llama.fi/v2/chains");
var top = chainList.filter((c) => typeof c?.name === "string" && Number(c?.tvl) > 0).sort((a, b) => b.tvl - a.tvl).slice(0, 30);
var chains = [];
for (const c of top) {
  const s = await get(`https://api.llama.fi/v2/historicalChainTvl/${encodeURIComponent(c.name)}`).catch(() => null);
  chains.push(seriesChange(s, c.name, c.tokenSymbol ?? null) ?? { chain: c.name, tvlUsd: Math.round(c.tvl), change1dPct: null, change7dPct: null, change30dPct: null, token: c.tokenSymbol ?? null });
}
var total = seriesChange(await get("https://api.llama.fi/v2/historicalChainTvl"), "All chains");
if (!total) throw new Error("DefiLlama total TVL series was empty");
var snap = { total, chains, updatedAt: now };
var value = JSON.stringify(snap);
console.log(`defi-tvl: ${list.length} protocols, ${rows.length} with TVL >= $1M; ${chains.length} chains; total $${(total.tvlUsd / 1e9).toFixed(1)}B`);
if (dry) process.exit(0);
var statements = [
  ...protocolInserts(rows, 100),
  `DELETE FROM defi_protocols WHERE updated_at < ${now};`,
  `INSERT OR REPLACE INTO snapshots (key, value, updated_at) VALUES ('defi-chains', '${value.replace(/'/g, "''")}', ${now});`
];
if (local) {
  const file = join(tmpdir(), `defi-tvl-${now}.sql`);
  writeFileSync(file, statements.join("\n"));
  console.log(d1File(file, testnet ? { db: "agent-data-testnet", mainnet: false } : { db: "agent-data-history" }));
} else {
  const { CLOUDFLARE_API_TOKEN: token, CF_ACCOUNT_ID: account, D1_DATABASE_ID: database } = process.env;
  if (!(token && account && database)) throw new Error("CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID and D1_DATABASE_ID are required (or pass --d1/--testnet/--dry)");
  const url = `https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${database}/query`;
  for (const sql of statements) {
    for (let attempt = 1; ; attempt++) {
      const r = await fetch(url, { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ sql }) });
      const j = await r.json().catch(() => null);
      if (r.ok && j?.success) break;
      if (attempt >= 3) throw new Error(`D1 ${r.status}: ${JSON.stringify(j?.errors ?? j).slice(0, 300)}`);
      await new Promise((ok) => setTimeout(ok, 5e3 * attempt));
    }
  }
  console.log(`defi-tvl: wrote ${rows.length} rows in ${statements.length - 2} statements and the chain snapshot`);
}
