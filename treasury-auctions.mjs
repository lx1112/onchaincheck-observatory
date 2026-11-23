// Built from a private repository (agent-data-api scripts/treasury-auctions.ts). Do not edit.
import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// src/gov/calendar.ts
var nthSunday = (y, m, n) => {
  const d = new Date(Date.UTC(y, m, 1));
  return 1 + (7 - d.getUTCDay()) % 7 + 7 * (n - 1);
};
function nyOffset(y, mo, d, h) {
  const start = Date.UTC(y, 2, nthSunday(y, 2, 2), 2);
  const end = Date.UTC(y, 10, nthSunday(y, 10, 1), 2);
  const t = Date.UTC(y, mo, d, h);
  return t >= start && t < end ? -4 : -5;
}
function etToUtc(y, mo, d, h, mi) {
  return new Date(Date.UTC(y, mo, d, h - nyOffset(y, mo, d, h), mi)).toISOString();
}
var etLabel = (h, mi) => `${(h + 11) % 12 + 1}:${String(mi).padStart(2, "0")} ${h < 12 ? "AM" : "PM"} ET`;
var num = (s) => typeof s === "string" && s.trim() !== "" && Number.isFinite(Number(s)) ? Number(s) : null;
var day = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : null;
var security = (x) => `${x.securityTerm ?? ""} ${x.type === "TIPS" ? "TIPS" : x.type === "FRN" ? "FRN" : x.securityType ?? ""}`.replace(/\s+/g, " ").trim();
function closeTime(x, d) {
  const m = String(x.competitiveAuctionCloseTime ?? "").match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  const bill = /bill/i.test(x.securityType ?? "");
  const h = m ? Number(m[1]) % 12 + (/pm/i.test(m[3]) ? 12 : 0) : bill ? 11 : 13;
  const mi = m ? Number(m[2]) : bill ? 30 : 0;
  const [y, mo, dd] = d.split("-").map(Number);
  return { at: etToUtc(y, mo - 1, dd, h, mi), timeEt: etLabel(h, mi), ...!m && { timeEstimated: true } };
}
var share = (x) => {
  const [i, dr, pd] = ["indirectBiddersCompetitiveParAwarded", "directBiddersCompetitiveParAwarded", "primaryDealersCompetitiveParAwarded"].map((k) => num(x[k]) ?? 0);
  const tot = i + dr + pd;
  return tot ? { indirectPct: Math.round(i / tot * 1e3) / 10, directPct: Math.round(dr / tot * 1e3) / 10, primaryDealerPct: Math.round(pd / tot * 1e3) / 10 } : null;
};
function parseAuctions(upcoming, auctioned) {
  const out = [];
  const add = (x, done) => {
    const d = day(x.auctionDate) ?? day(x.competitiveAuctionCloseDate);
    if (!d) return;
    const name = security(x);
    const bill = /bill/i.test(x.securityType ?? "");
    const longEnd = /(10|20|30)-Year/.test(x.securityTerm ?? "") || x.type === "TIPS";
    out.push({
      ...closeTime(x, d),
      date: d,
      event: `${name} auction${x.reopening === "Yes" ? " (reopening)" : ""}`,
      period: null,
      source: "Treasury",
      category: "treasury auction",
      importance: longEnd ? "high" : bill ? "low" : "medium",
      detail: {
        cusip: x.cusip ?? null,
        offeringUsd: num(x.offeringAmount),
        issueDate: day(x.issueDate),
        maturityDate: day(x.maturityDate),
        ...done && {
          result: {
            highYieldPct: num(x.highYield) ?? num(x.investmentRate),
            ...bill && { highDiscountRatePct: num(x.highRate) },
            bidToCover: num(x.bidToCoverRatio),
            ...!bill && { couponPct: num(x.interestRate) },
            awardedShares: share(x)
          }
        }
      }
    });
  };
  for (const x of auctioned ?? []) add(x, true);
  const seen = new Set(out.map((e) => `${e.detail?.cusip}|${e.date}`));
  for (const x of upcoming ?? []) if (!seen.has(`${x.cusip}|${day(x.auctionDate) ?? day(x.competitiveAuctionCloseDate)}`)) add(x, false);
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
function d1Query(sql2, target = {}) {
  return withRetries(target, () => {
    const out = execFileSync("npx", [...base(target), "--json", "--command", sql2], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 1 << 28
    });
    return JSON.parse(out.slice(out.search(/^\[/m)))[0].results;
  });
}

// scripts/treasury-auctions.ts
var args = process.argv.slice(2);
var get = async (u) => {
  const r = await fetch(u, { headers: { "user-agent": "onchaincheck.dev economic-calendar", accept: "application/json" }, signal: AbortSignal.timeout(3e4) });
  if (!r.ok) throw new Error(`TreasuryDirect ${r.status}`);
  return r.json();
};
var base2 = "https://www.treasurydirect.gov/TA_WS/securities";
var events = parseAuctions(await get(`${base2}/upcoming?format=json`), await get(`${base2}/auctioned?format=json&days=10`));
if (!events.length) throw new Error("TreasuryDirect answered no auctions; not replacing the snapshot");
var now = Math.floor(Date.now() / 1e3);
var value = JSON.stringify(events);
console.log(`treasury-auctions: ${events.length} auctions, ${value.length} bytes`);
if (args.includes("--dry")) process.exit(0);
var sql = `INSERT OR REPLACE INTO snapshots (key, value, updated_at) VALUES ('treasury-auctions', '${value.replace(/'/g, "''")}', ${now})`;
if (args.includes("--d1") || args.includes("--testnet")) {
  d1Query(sql, args.includes("--testnet") ? { db: "agent-data-testnet", mainnet: false } : { db: "agent-data-history" });
} else {
  const { CLOUDFLARE_API_TOKEN: token, CF_ACCOUNT_ID: account, D1_DATABASE_ID: database } = process.env;
  if (!(token && account && database)) throw new Error("CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID and D1_DATABASE_ID are required (or pass --d1/--testnet/--dry)");
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${database}/query`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ sql: "INSERT OR REPLACE INTO snapshots (key, value, updated_at) VALUES ('treasury-auctions', ?, ?)", params: [value, now] })
  });
  const j = await r.json().catch(() => null);
  if (!r.ok || !j?.success) throw new Error(`D1 ${r.status}: ${JSON.stringify(j?.errors ?? j).slice(0, 300)}`);
}
console.log("treasury-auctions: written");
