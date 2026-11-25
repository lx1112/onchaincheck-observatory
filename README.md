# OnchainCheck Observatory

The recording jobs behind [OnchainCheck](https://onchaincheck.dev), a pay-per-call API for AI agents (x402, USDC on
Base). Every 2 hours this repository's workflow watches crypto markets and writes what it saw, with timestamps, to
OnchainCheck's database. The paid routes answer from that record, and it can't be rebuilt after the fact.

What each job records:

- `history-discover.mjs`: new liquidity pools on Base, Ethereum, Arbitrum, Optimism, Polygon and Solana (from
  GeckoTerminal), and each token's deployer. The API scores every pool at first sight and rechecks it at 24 h, 48 h
  and 7 days (`/token`, `/tokens/screener`, `/track-record`).
- `x-wallets.mjs`: X (Twitter) handles that Polymarket traders publish on the public leaderboards (`/x/wallets`,
  `/x/polymarket-bets`).
- `hl-leaders.mjs`: the top 500 Hyperliquid accounts by P&L per window (`/hyperliquid/smart-money`), one copy of
  that leaderboard per day, and the open perp positions of the top ~75 accounts every run (opens, closes and flips).
- `pm-record.mjs`: the busiest open Polymarket markets, which leaderboard traders are among each side's biggest
  holders, the $5,000+ trades in them, and how each market resolved, so the record can say how often the top traders
  were right (`/polymarket/*`, `/x/polymarket-bets`).
- `defi-yields.mjs`, `defi-tvl.mjs`: DeFi yields and protocol TVL (`/defi/yields`, `/defi/tvl`).
- `treasury-auctions.mjs`: upcoming US Treasury auctions (`/economy/calendar`).
- `x402-reliability.mjs`: one unpaid request every 2 hours to each of the ~500 busiest x402 Bazaar listings (at most
  15 per host, one request per host at a time), recording whether it answered a valid 402 payment challenge, how fast,
  and at what price. Requests identify themselves as `OnchainCheck-reliability/1`. A seller who wants out can open an
  issue here.
- `labels-sync.mjs`: adds address labels inside the database from what the jobs above recorded: each wallet that
  deployed a token we saw a pool for, and deployers with two or more pools whose liquidity went to about zero. No
  outside requests.

The `.mjs` files are bundled builds; their source lives in a private repository. Everything they read is public data.
The workflow runs only when OnchainCheck's scheduler starts it (`workflow_dispatch`), and needs two repository
secrets: `CLOUDFLARE_API_TOKEN` (D1 edit only) and `ALCHEMY_KEY`.

Run a job yourself without writing anything:

```bash
node history-discover.mjs --dry
node hl-leaders.mjs --dry
node pm-record.mjs --dry
```
