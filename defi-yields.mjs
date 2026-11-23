// Built from a private repository (agent-data-api scripts/defi-yields.ts). Do not edit.
import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// scripts/defi-yields.ts
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// src/market/yields.ts
var YIELD_COLUMNS = [
  "pool",
  "chain",
  "project",
  "symbol",
  "pool_meta",
  "tvl_usd",
  "apy",
  "apy_base",
  "apy_reward",
  "apy_pct_1d",
  "apy_pct_7d",
  "apy_mean_30d",
  "stablecoin",
  "il_risk",
  "exposure",
  "outlier",
  "prediction",
  "prediction_prob",
  "sigma",
  "updated_at"
];
var MIN_TVL = 1e6;
var fin = (v) => typeof v === "number" && Number.isFinite(v) ? v : null;
var str = (v, max = 120) => typeof v === "string" && v ? v.slice(0, max) : null;
function yieldRow(p, updatedAt) {
  const tvl = fin(p?.tvlUsd);
  if (tvl === null || tvl < MIN_TVL || !str(p?.pool) || !str(p?.chain) || !str(p?.project) || !str(p?.symbol)) return null;
  const apy = fin(p.apy);
  if (apy !== null && (apy < 0 || apy > 1e6)) return null;
  return {
    pool: str(p.pool, 80),
    chain: str(p.chain, 40),
    project: str(p.project, 60),
    symbol: str(p.symbol, 80),
    pool_meta: str(p.poolMeta, 120),
    tvl_usd: Math.round(tvl),
    apy,
    apy_base: fin(p.apyBase),
    apy_reward: fin(p.apyReward),
    apy_pct_1d: fin(p.apyPct1D),
    apy_pct_7d: fin(p.apyPct7D),
    apy_mean_30d: fin(p.apyMean30d),
    stablecoin: p.stablecoin ? 1 : 0,
    il_risk: str(p.ilRisk, 10),
    exposure: str(p.exposure, 10),
    outlier: p.outlier ? 1 : 0,
    prediction: str(p.predictions?.predictedClass, 30),
    prediction_prob: fin(p.predictions?.predictedProbability),
    sigma: fin(p.sigma),
    updated_at: updatedAt
  };
}
var lit = (v) => v === null ? "NULL" : typeof v === "number" ? String(v) : `'${v.replace(/'/g, "''")}'`;
function insertStatements(rows2, perStatement = 200) {
  const out = [];
  for (let i = 0; i < rows2.length; i += perStatement) {
    const values = rows2.slice(i, i + perStatement).map((r) => `(${YIELD_COLUMNS.map((c) => lit(r[c])).join(",")})`).join(",\n");
    out.push(`INSERT OR REPLACE INTO defi_yields (${YIELD_COLUMNS.join(",")}) VALUES
${values};`);
  }
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
function d1File(file, target = {}) {
  return withRetries(target, () => {
    const out = execFileSync("npx", [...base(target), "--yes", "--file", file], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28 });
    return out.match(/Executed[^\n]*/)?.[0] ?? out.slice(-300);
  });
}

// scripts/defi-yields.ts
var args = process.argv.slice(2);
var dry = args.includes("--dry");
var local = args.includes("--d1") || args.includes("--testnet");
var testnet = args.includes("--testnet");
var res = await fetch("https://yields.llama.fi/pools", { headers: { "user-agent": "onchaincheck.dev defi-yields", accept: "application/json" }, signal: AbortSignal.timeout(6e4) });
if (!res.ok) throw new Error(`DefiLlama yields ${res.status}`);
var body = await res.json();
var pools = Array.isArray(body?.data) ? body.data : [];
if (pools.length < 1e3) throw new Error(`DefiLlama yields answered only ${pools.length} pools; not replacing the table`);
var now = Math.floor(Date.now() / 1e3);
var seen = /* @__PURE__ */ new Set();
var rows = pools.map((p) => yieldRow(p, now)).filter((r) => r !== null && !seen.has(String(r.pool)) && (seen.add(String(r.pool)), true));
console.log(`defi-yields: ${pools.length} pools, ${rows.length} with TVL >= $1M`);
if (dry) process.exit(0);
var statements = [...insertStatements(rows, 100), `DELETE FROM defi_yields WHERE updated_at < ${now};`];
if (local) {
  const file = join(tmpdir(), `defi-yields-${now}.sql`);
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
  console.log(`defi-yields: wrote ${rows.length} rows in ${statements.length - 1} statements`);
}
