// Built from a private repository (agent-data-api scripts/x-wallets.ts). Do not edit.
import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// scripts/x-wallets.ts
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// src/x/handles.ts
function normalizeHandle(raw) {
  if (typeof raw !== "string") return null;
  const s = raw.trim().replace(/^https?:\/\//i, "").replace(/^(www\.|mobile\.)?(x|twitter)\.com\//i, "").replace(/^@/, "").replace(/[/?#].*$/, "");
  return /^[A-Za-z0-9_]{1,15}$/.test(s) ? s : null;
}

// src/x/wallets.ts
var BOARD_PERIODS = ["day", "week", "month", "all"];
var BOARD_SORTS = ["PNL", "VOLUME"];
var BOARD_CATEGORIES = ["overall", "crypto", "politics"];
var BOARD_LIMIT = 1e3;
var WALLETS_SHOWN = 50;
function boards() {
  return BOARD_PERIODS.flatMap((period) => BOARD_SORTS.flatMap((sort) => BOARD_CATEGORIES.map((category) => ({ period, sort, category }))));
}
function boardUrl(b) {
  const p = new URLSearchParams({ time_period: b.period, sort_by: b.sort, limit: String(BOARD_LIMIT) });
  if (b.category !== "overall") p.set("category", b.category);
  return `https://data-api.polymarket.com/v2/leaderboard?${p}`;
}
var ADDRESS = /^0x[0-9a-fA-F]{40}$/;
var str = (v) => typeof v === "string" && v.trim() ? v.trim() : null;
function leaderboardRows(rows2, b, nowS) {
  if (!Array.isArray(rows2)) return [];
  const out = [];
  for (const r of rows2) {
    const handle = normalizeHandle(r?.x_username);
    const wallet = str(r?.user_id);
    if (!handle || !wallet || !ADDRESS.test(wallet)) continue;
    const name = str(r.user_name);
    const rank = typeof r.rank === "number" ? r.rank : null;
    out.push({
      handle_lc: handle.toLowerCase(),
      handle,
      wallet: wallet.toLowerCase(),
      source: "polymarket",
      detail: JSON.stringify({ name: name && !name.toLowerCase().startsWith(wallet.toLowerCase()) ? name : null, board: `${b.period}/${b.sort.toLowerCase()}/${b.category}`, rank }),
      first_seen: nowS,
      last_seen: nowS
    });
  }
  return out;
}
function dedupe(rows2) {
  const seen = /* @__PURE__ */ new Map();
  for (const r of rows2) {
    const k = `${r.handle_lc}|${r.wallet}|${r.source}`;
    if (!seen.has(k)) seen.set(k, r);
  }
  return [...seen.values()];
}
var COLUMNS = ["handle_lc", "handle", "wallet", "source", "detail", "first_seen", "last_seen"];
var lit = (v) => v === null ? "NULL" : typeof v === "number" ? String(v) : `'${v.replace(/'/g, "''")}'`;
function upsertStatements(rows2, perStatement = 100) {
  const out = [];
  for (let i = 0; i < rows2.length; i += perStatement) {
    const values = rows2.slice(i, i + perStatement).map((r) => `(${COLUMNS.map((c) => lit(r[c])).join(",")})`).join(",\n");
    out.push(
      `INSERT INTO x_wallets (${COLUMNS.join(",")}) VALUES
${values}
ON CONFLICT (handle_lc, wallet, source) DO UPDATE SET handle = excluded.handle, detail = excluded.detail, last_seen = MAX(x_wallets.last_seen, excluded.last_seen);`
    );
  }
  return out;
}
var LOOKUP_SQL = `SELECT handle, wallet, source, detail, first_seen, last_seen FROM x_wallets WHERE handle_lc = ? ORDER BY last_seen DESC, first_seen LIMIT ${WALLETS_SHOWN}`;

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

// scripts/x-wallets.ts
var args = process.argv.slice(2);
var dry = args.includes("--dry");
var local = args.includes("--d1");
var HEADERS = { "user-agent": "onchaincheck.dev x-wallets", accept: "application/json" };
var now = Math.floor(Date.now() / 1e3);
var rows = [];
var read = 0;
var failed = 0;
for (const b of boards()) {
  try {
    const r = await fetch(boardUrl(b), { headers: HEADERS, signal: AbortSignal.timeout(15e3) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = await r.json();
    const data = Array.isArray(j?.data) ? j.data : [];
    read += data.length;
    rows.push(...leaderboardRows(data, b, now));
  } catch (e) {
    failed++;
    console.error(`x-wallets: ${b.period}/${b.sort}/${b.category}: ${e}`);
  }
  await new Promise((ok) => setTimeout(ok, 300));
}
var unique = dedupe(rows);
console.log(`x-wallets: ${boards().length - failed}/${boards().length} leaderboards, ${read} rows, ${unique.length} handle->wallet pairs (${new Set(unique.map((r) => r.handle_lc)).size} handles)`);
if (failed === boards().length) throw new Error("every leaderboard failed");
if (dry) {
  for (const r of unique.slice(0, 5)) console.log(`  @${r.handle} -> ${r.wallet} ${r.detail}`);
  process.exit(0);
}
var statements = upsertStatements(unique, 100);
if (local) {
  const file = join(tmpdir(), `x-wallets-${now}.sql`);
  writeFileSync(file, statements.join("\n"));
  console.log(d1File(file, { db: "agent-data-history" }));
} else {
  const { CLOUDFLARE_API_TOKEN: token, CF_ACCOUNT_ID: account, D1_DATABASE_ID: database } = process.env;
  if (!(token && account && database)) throw new Error("CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID and D1_DATABASE_ID are required (or pass --d1/--dry)");
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
  console.log(`x-wallets: upserted ${unique.length} rows in ${statements.length} statements`);
}
