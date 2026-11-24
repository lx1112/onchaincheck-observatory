// Built from a private repository (agent-data-api scripts/hl-leaders.ts). Do not edit.
import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// src/history/insert-sql.ts
var lit = (v) => v === null ? "NULL" : typeof v === "number" ? Number.isFinite(v) ? String(v) : "NULL" : `'${v.replace(/'/g, "''")}'`;
function insertSql(table, cols, rows2, tail, per = 200) {
  const out = [];
  for (let i = 0; i < rows2.length; i += per) {
    const values = rows2.slice(i, i + per).map((r) => `(${cols.map((c) => lit(r[c] ?? null)).join(",")})`).join(",\n");
    out.push(`INSERT INTO ${table} (${cols.join(",")}) VALUES
${values}
${tail};`);
  }
  return out;
}

// src/hyperliquid/info.ts
var INFO = "https://api.hyperliquid.xyz/info";
var HL_HEADERS = { "content-type": "application/json", accept: "application/json", "user-agent": "onchaincheck/1.0 (+https://onchaincheck.dev)" };
var num = (v) => {
  const x = typeof v === "string" && v !== "" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(x) ? x : null;
};

// src/hyperliquid/history.ts
var utcDay = (nowS) => new Date(nowS * 1e3).toISOString().slice(0, 10);
var DAY_COLS = ["day", "period", "rank", "address", "display_name", "account_value", "pnl", "roi", "volume"];
function leaderDaySql(rows2, day2) {
  const r = rows2.map((x) => ({ day: day2, period: x.period, rank: x.rank, address: x.address, display_name: x.display_name, account_value: x.account_value, pnl: x.pnl, roi: x.roi, volume: x.volume }));
  return insertSql("hl_leader_days", DAY_COLS, r, "ON CONFLICT DO NOTHING", 250);
}
var POSITION_PICKS = [
  ["month", 50],
  ["week", 25],
  ["all", 25]
];
function positionAccounts(rows2, picks = POSITION_PICKS) {
  const out = [];
  for (const [period, n] of picks) {
    for (const r of rows2.filter((x) => x.period === period && x.rank <= n).sort((a, b) => a.rank - b.rank)) if (!out.includes(r.address)) out.push(r.address);
  }
  return out;
}
function positionRows(address, state, ts) {
  const s = state ?? {};
  const accountValue = num(s.marginSummary?.accountValue);
  const out = [];
  for (const ap of Array.isArray(s.assetPositions) ? s.assetPositions : []) {
    const p = ap?.position ?? null;
    const size = num(p?.szi);
    if (!p || typeof p.coin !== "string" || !p.coin || size === null || size === 0) continue;
    out.push({
      ts,
      address,
      coin: p.coin.slice(0, 40),
      size,
      notional_usd: num(p.positionValue),
      entry_px: num(p.entryPx),
      liq_px: num(p.liquidationPx),
      leverage: num(p.leverage?.value),
      unrealized_pnl: num(p.unrealizedPnl),
      account_value: accountValue
    });
  }
  if (!out.length) out.push({ ts, address, coin: "", size: 0, notional_usd: 0, entry_px: null, liq_px: null, leverage: null, unrealized_pnl: 0, account_value: accountValue });
  return out;
}
var POS_COLS = ["ts", "address", "coin", "size", "notional_usd", "entry_px", "liq_px", "leverage", "unrealized_pnl", "account_value"];
var positionSql = (rows2) => insertSql("hl_positions", POS_COLS, rows2, "ON CONFLICT DO NOTHING", 200);

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
var lit2 = (v) => v === null ? "NULL" : typeof v === "number" ? Number.isFinite(v) ? String(v) : "NULL" : `'${v.replace(/'/g, "''")}'`;
function replaceStatements(rows2, nowS, perStatement = 250) {
  const out = [];
  for (let i = 0; i < rows2.length; i += perStatement) {
    const values = rows2.slice(i, i + perStatement).map((r) => `(${COLUMNS.map((c) => lit2(r[c])).join(",")})`).join(",\n");
    out.push(
      `INSERT INTO hl_leaders (${COLUMNS.join(",")}) VALUES
${values}
ON CONFLICT (period, address) DO UPDATE SET rank = excluded.rank, display_name = excluded.display_name, account_value = excluded.account_value, pnl = excluded.pnl, roi = excluded.roi, volume = excluded.volume, updated_at = excluded.updated_at;`
    );
  }
  out.push(`DELETE FROM hl_leaders WHERE updated_at < ${nowS};`);
  return out;
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
function d1File(file2, target = {}) {
  return withRetries(target, () => {
    const out = execFileSync("npx", [...base(target), "--yes", "--file", file2], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28 });
    return out.match(/Executed[^\n]*/)?.[0] ?? out.slice(-300);
  });
}

// scripts/lib/d1-any.ts
function d1From(args2) {
  const testnet = args2.includes("--testnet");
  if (args2.includes("--d1") || testnet) {
    const target = testnet ? { db: "agent-data-testnet", mainnet: false } : { db: "agent-data-history" };
    return {
      query: async (sql) => d1Query(sql, target),
      exec: async (statements2, label) => {
        if (!statements2.length) return;
        const path = join(tmpdir(), `${label}-${Date.now()}.sql`);
        writeFileSync(path, statements2.join("\n"));
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
    exec: async (statements2) => {
      for (const sql of statements2) await run(sql);
    }
  };
}

// scripts/hl-leaders.ts
var args = process.argv.slice(2);
var dry = args.includes("--dry");
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
}
var db = dry ? null : d1From(args);
var statements = replaceStatements(rows, now);
if (db) {
  await db.exec(statements, "hl-leaders");
  console.log(`hl-leaders: wrote ${rows.length} rows in ${statements.length - 1} statements`);
}
var day = utcDay(now);
if (db) {
  const [{ n }] = await db.query(`SELECT count(*) AS n FROM hl_leader_days WHERE day = '${day}' AND period = 'all'`);
  if (Number(n) > 0) console.log(`hl-leaders: ${day} already recorded in hl_leader_days`);
  else {
    await db.exec(leaderDaySql(rows, day), "hl-leader-days");
    console.log(`hl-leaders: recorded ${rows.length} leaderboard rows for ${day}`);
  }
}
var picked = positionAccounts(rows);
var positions = [];
var failed = 0;
for (const address of picked) {
  try {
    const r = await fetch(INFO, { method: "POST", headers: HL_HEADERS, body: JSON.stringify({ type: "clearinghouseState", user: address }), signal: AbortSignal.timeout(15e3) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    positions.push(...positionRows(address, await r.json(), now));
  } catch (e) {
    failed++;
    console.error(`hl-leaders: positions of ${address}: ${e}`);
  }
  await new Promise((ok) => setTimeout(ok, 150));
}
var open = positions.filter((p) => p.coin !== "");
console.log(`hl-leaders: positions of ${picked.length - failed}/${picked.length} top accounts: ${open.length} open, ${positions.length - open.length} flat`);
if (failed > picked.length / 2) throw new Error("most position reads failed; not recording this snapshot");
if (dry) {
  for (const p of open.slice(0, 3)) console.log(`  ${p.address} ${p.coin} ${p.size} $${Math.round(p.notional_usd ?? 0)}`);
} else {
  await db.exec(positionSql(positions), "hl-positions");
  console.log(`hl-leaders: recorded ${positions.length} position rows`);
}
