// Built from a private repository (agent-data-api scripts/hl-leaders.ts). Do not edit.
import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// scripts/hl-leaders.ts
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// src/hyperliquid/info.ts
var num = (v) => {
  const x = typeof v === "string" && v !== "" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(x) ? x : null;
};

// src/hyperliquid/leaders.ts
var LEADERBOARD_URL = "https://stats-data.hyperliquid.xyz/Mainnet/leaderboard";
var PERIODS = ["day", "week", "month", "all"];
var FILE_WINDOW = { day: "day", week: "week", month: "month", all: "allTime" };
var TOP_PER_PERIOD = 500;
var ADDR = /^0x[0-9a-f]{40}$/;
function leaderRows(file2, nowS, top = TOP_PER_PERIOD) {
  const rows2 = file2?.leaderboardRows;
  if (!Array.isArray(rows2)) return [];
  const out = [];
  for (const period of PERIODS) {
    const w = FILE_WINDOW[period];
    const ranked = [];
    for (const r of rows2) {
      const address = typeof r?.ethAddress === "string" ? r.ethAddress.toLowerCase() : "";
      if (!ADDR.test(address) || !Array.isArray(r.windowPerformances)) continue;
      const perf = r.windowPerformances.find((p) => Array.isArray(p) && p[0] === w);
      const pnl = num(perf?.[1]?.pnl);
      if (pnl === null) continue;
      const name = typeof r.displayName === "string" && r.displayName.trim() ? r.displayName.trim().slice(0, 60) : null;
      ranked.push({ period, address, display_name: name, account_value: num(r.accountValue), pnl, roi: num(perf[1].roi), volume: num(perf[1].vlm), updated_at: nowS });
    }
    ranked.sort((a, b) => b.pnl - a.pnl);
    ranked.slice(0, top).forEach((r, i) => out.push({ ...r, rank: i + 1 }));
  }
  return out;
}
var COLUMNS = ["period", "rank", "address", "display_name", "account_value", "pnl", "roi", "volume", "updated_at"];
var lit = (v) => v === null ? "NULL" : typeof v === "number" ? Number.isFinite(v) ? String(v) : "NULL" : `'${v.replace(/'/g, "''")}'`;
function replaceStatements(rows2, nowS, perStatement = 250) {
  const out = [];
  for (let i = 0; i < rows2.length; i += perStatement) {
    const values = rows2.slice(i, i + perStatement).map((r) => `(${COLUMNS.map((c) => lit(r[c])).join(",")})`).join(",\n");
    out.push(
      `INSERT INTO hl_leaders (${COLUMNS.join(",")}) VALUES
${values}
ON CONFLICT (period, address) DO UPDATE SET rank = excluded.rank, display_name = excluded.display_name, account_value = excluded.account_value, pnl = excluded.pnl, roi = excluded.roi, volume = excluded.volume, updated_at = excluded.updated_at;`
    );
  }
  out.push(`DELETE FROM hl_leaders WHERE updated_at < ${nowS};`);
  return out;
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
function d1File(file2, target = {}) {
  return withRetries(target, () => {
    const out = execFileSync("npx", [...base(target), "--yes", "--file", file2], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28 });
    return out.match(/Executed[^\n]*/)?.[0] ?? out.slice(-300);
  });
}

// scripts/hl-leaders.ts
var args = process.argv.slice(2);
var dry = args.includes("--dry");
var testnet = args.includes("--testnet");
var local = args.includes("--d1") || testnet;
var res = await fetch(LEADERBOARD_URL, { headers: { "user-agent": "onchaincheck.dev hl-leaders", accept: "application/json" }, signal: AbortSignal.timeout(9e4) });
if (!res.ok) throw new Error(`Hyperliquid leaderboard ${res.status}`);
var file = await res.json();
var accounts = Array.isArray(file?.leaderboardRows) ? file.leaderboardRows.length : 0;
if (accounts < 1e3) throw new Error(`Hyperliquid leaderboard had only ${accounts} accounts; not replacing the table`);
var now = Math.floor(Date.now() / 1e3);
var rows = leaderRows(file, now);
var perPeriod = Object.entries(rows.reduce((m, r) => (m[r.period] = (m[r.period] ?? 0) + 1, m), {}));
console.log(`hl-leaders: ${accounts} accounts, ${rows.length} rows (${perPeriod.map(([p, n]) => `${p} ${n}`).join(", ")}), ${new Set(rows.map((r) => r.address)).size} distinct accounts`);
if (dry) {
  for (const r of rows.filter((x) => x.period === "month").slice(0, 3)) console.log(`  month #${r.rank} ${r.address} ${r.display_name ?? ""} pnl ${Math.round(r.pnl)}`);
  process.exit(0);
}
var statements = replaceStatements(rows, now);
if (local) {
  const path = join(tmpdir(), `hl-leaders-${now}.sql`);
  writeFileSync(path, statements.join("\n"));
  console.log(d1File(path, testnet ? { db: "agent-data-testnet", mainnet: false } : { db: "agent-data-history" }));
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
  console.log(`hl-leaders: wrote ${rows.length} rows in ${statements.length - 1} statements`);
}
