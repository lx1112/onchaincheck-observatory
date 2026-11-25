// Built from a private repository (agent-data-api scripts/x402-reliability.ts). Do not edit.
import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// src/market/reliability.ts
var PROBE_TOP = 500;
var PROBE_PER_HOST = 15;
var PROBE_TIMEOUT_MS = 1e4;
var PROBE_USER_AGENT = "OnchainCheck-reliability/1 (+https://onchaincheck.dev; unpaid x402 availability check)";
function pickTargets(rows2, top2 = PROBE_TOP, perHost = PROBE_PER_HOST) {
  const perHostCount = /* @__PURE__ */ new Map();
  const out = [];
  for (const r of [...rows2].sort((a, b) => b.payers30d - a.payers30d || a.resource.localeCompare(b.resource))) {
    if (!/^(GET|POST|PUT|PATCH|DELETE)$/.test(r.method)) continue;
    if (!/^https:\/\//.test(r.resource)) continue;
    if (/\/:[A-Za-z_]|[{}]/.test(r.resource)) continue;
    const n = perHostCount.get(r.host) ?? 0;
    if (n >= perHost) continue;
    perHostCount.set(r.host, n + 1);
    out.push(r);
    if (out.length >= top2) break;
  }
  return out;
}
var USDC_DECIMALS = 6;
var decodeHeader = (v) => {
  try {
    return JSON.parse(atob(v.trim()));
  } catch {
    try {
      return JSON.parse(v);
    } catch {
      return null;
    }
  }
};
function parseChallenge(header, body) {
  const candidates = [header ? decodeHeader(header) : null, (() => {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  })()];
  for (const c of candidates) {
    const accepts = c?.accepts;
    if (Array.isArray(accepts) && accepts.length && typeof accepts[0] === "object" && accepts[0]) {
      const r = accepts[0];
      if (r.payTo || r.amount || r.maxAmountRequired) return r;
    }
  }
  return null;
}
function priceOf(r) {
  const raw = r.amount ?? r.maxAmountRequired;
  if (!raw || !/^\d{1,18}$/.test(raw)) return null;
  const usd = Number(raw) / 10 ** USDC_DECIMALS;
  return usd > 0 && usd <= 1e3 ? Math.round(usd * 1e6) / 1e6 : null;
}
function classify(target, answer) {
  const base2 = { resource: target.resource, host: target.host, status: answer.status, ms: answer.ms, price_usd: null, pay_to: null };
  if (answer.status === null) {
    return { ...base2, ms: null, outcome: answer.timedOut ? "timeout" : "unreachable", error: (answer.error ?? "no answer").slice(0, 120) };
  }
  if (answer.status === 429) return { ...base2, outcome: "rate_limited", error: "HTTP 429" };
  if (answer.status >= 500) return { ...base2, outcome: "server_error", error: `HTTP ${answer.status}` };
  if (answer.status !== 402) return { ...base2, outcome: "not_402", error: `HTTP ${answer.status}` };
  const req = parseChallenge(answer.header, answer.body);
  if (!req) return { ...base2, outcome: "bad_challenge", error: "402 without parseable payment requirements" };
  return { ...base2, outcome: "ok", price_usd: priceOf(req), pay_to: typeof req.payTo === "string" ? req.payTo.slice(0, 64) : null, error: null };
}
function requestFor(t) {
  const headers = { "user-agent": PROBE_USER_AGENT, accept: "application/json" };
  let example = {};
  try {
    const parsed = t.input_example ? JSON.parse(t.input_example) : {};
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) example = parsed;
  } catch {
  }
  if (t.method === "GET" || t.method === "DELETE") {
    const url = new URL(t.resource);
    for (const [k, v] of Object.entries(example)) {
      if (["string", "number", "boolean"].includes(typeof v) && !url.searchParams.has(k)) url.searchParams.set(k, String(v));
    }
    return { url: url.toString(), init: { method: t.method, headers } };
  }
  return { url: t.resource, init: { method: t.method, headers: { ...headers, "content-type": "application/json" }, body: JSON.stringify(example) } };
}
var sqlText = (v) => v === null ? "NULL" : `'${v.replaceAll("'", "''")}'`;
var sqlNum = (v) => v === null || !Number.isFinite(v) ? "NULL" : String(v);
function upsertSql(day2, ts2, probes2, perStatement = 50) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day2)) throw new Error(`bad day ${day2}`);
  const out = [];
  for (let i = 0; i < probes2.length; i += perStatement) {
    const values = probes2.slice(i, i + perStatement).map((p) => {
      const ok = p.outcome === "ok" ? 1 : 0;
      const limited = p.outcome === "rate_limited" ? 1 : 0;
      const answered = p.ms === null ? 0 : 1;
      return `('${day2}', ${sqlText(p.resource)}, ${sqlText(p.host)}, 1, ${ok}, ${limited}, ${answered}, ${sqlNum(p.ms ?? 0)}, ${sqlNum(p.ms)}, ${p.outcome === "server_error" ? 1 : 0}, ${p.outcome === "timeout" || p.outcome === "unreachable" ? 1 : 0}, ${sqlText(p.outcome)}, ${sqlNum(p.status)}, ${sqlText(p.error)}, ${sqlNum(p.price_usd)}, ${sqlText(p.pay_to)}, ${ts2}, ${ts2})`;
    });
    out.push(
      "INSERT INTO x402_reliability_days (day, resource, host, checks, ok, rate_limited, answered, ms_sum, ms_max, server_errors, no_answer, last_outcome, last_status, last_error, price_usd, pay_to, first_ts, last_ts) VALUES " + values.join(", ") + " ON CONFLICT (day, resource) DO UPDATE SET checks = checks + excluded.checks, ok = ok + excluded.ok, rate_limited = rate_limited + excluded.rate_limited, answered = answered + excluded.answered, ms_sum = ms_sum + excluded.ms_sum, ms_max = max(coalesce(ms_max, 0), coalesce(excluded.ms_max, 0)), server_errors = server_errors + excluded.server_errors, no_answer = no_answer + excluded.no_answer, last_outcome = excluded.last_outcome, last_status = excluded.last_status, last_error = excluded.last_error, price_usd = coalesce(excluded.price_usd, price_usd), pay_to = coalesce(excluded.pay_to, pay_to), last_ts = excluded.last_ts;"
    );
  }
  return out;
}
function runSql(ts2, probes2) {
  const n = (o) => probes2.filter((p) => p.outcome === o).length;
  const ms = probes2.map((p) => p.ms).filter((x) => x !== null).sort((a, b) => a - b);
  const p50 = ms.length ? ms[Math.floor(ms.length / 2)] : null;
  return `INSERT OR REPLACE INTO x402_reliability_runs (ts, probed, ok, rate_limited, not_402, bad_challenge, server_error, no_answer, ms_p50, hosts) VALUES (${ts2}, ${probes2.length}, ${n("ok")}, ${n("rate_limited")}, ${n("not_402")}, ${n("bad_challenge")}, ${n("server_error")}, ${n("timeout") + n("unreachable")}, ${sqlNum(p50)}, ${new Set(probes2.map((p) => p.host)).size});`;
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
function d1From(args2) {
  const testnet = args2.includes("--testnet");
  if (args2.includes("--d1") || testnet) {
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

// scripts/x402-reliability.ts
var args = process.argv.slice(2);
var dry = args.includes("--dry");
var topAt = args.indexOf("--top");
var top = topAt >= 0 ? Number(args[topAt + 1]) : PROBE_TOP;
var HOSTS_AT_ONCE = 8;
var BODY_LIMIT = 64e3;
var db = d1From(args);
var rows = await db.query(
  "SELECT resource, host, method, input_example, price_usd, payers30d FROM x402_endpoints WHERE day = (SELECT max(day) FROM x402_endpoints) ORDER BY payers30d DESC LIMIT 5000"
);
var targets = pickTargets(rows, top);
if (!targets.length) throw new Error("x402_endpoints is empty: run npm run x402-endpoints first");
var ts = Math.floor(Date.now() / 1e3);
var day = new Date(ts * 1e3).toISOString().slice(0, 10);
async function probe(t) {
  const { url, init } = requestFor(t);
  const started = performance.now();
  try {
    const res = await fetch(url, { ...init, redirect: "manual", signal: AbortSignal.timeout(PROBE_TIMEOUT_MS) });
    const ms = Math.round(performance.now() - started);
    const body = res.status === 402 ? (await res.text()).slice(0, BODY_LIMIT) : (res.body?.cancel(), "");
    return classify(t, { status: res.status, ms, header: res.headers.get("payment-required"), body });
  } catch (e) {
    const err = e;
    const timedOut = err.name === "TimeoutError" || err.name === "AbortError";
    const cause = err.cause?.code;
    return classify(t, { status: null, ms: null, header: null, body: "", timedOut, error: cause ?? err.message });
  }
}
var byHost = /* @__PURE__ */ new Map();
for (const t of targets) byHost.set(t.host, [...byHost.get(t.host) ?? [], t]);
var queue = [...byHost.values()];
var probes = [];
await Promise.all(
  Array.from({ length: HOSTS_AT_ONCE }, async () => {
    for (let list = queue.shift(); list; list = queue.shift()) {
      for (const t of list) probes.push(await probe(t));
    }
  })
);
var count = (o) => probes.filter((p) => p.outcome === o).length;
console.log(
  `x402-reliability: ${probes.length} listings on ${byHost.size} hosts: ${count("ok")} ok, ${count("rate_limited")} rate limited, ${count("not_402")} not 402, ${count("bad_challenge")} bad challenge, ${count("server_error")} 5xx, ${count("timeout")} timeouts, ${count("unreachable")} unreachable`
);
if (dry) {
  for (const p of probes.filter((x) => x.outcome !== "ok").slice(0, 10)) console.log(`  ${p.outcome} ${p.status ?? "-"} ${p.resource} ${p.error ?? ""}`);
  process.exit(0);
}
if (count("unreachable") + count("timeout") > probes.length * 0.8) {
  await db.exec([runSql(ts, probes)], "x402-reliability-run");
  throw new Error("over 80% of probes got no answer: network problem on this runner; listings not recorded");
}
await db.exec([...upsertSql(day, ts, probes), runSql(ts, probes)], "x402-reliability");
console.log(`x402-reliability: recorded ${probes.length} checks for ${day}`);
