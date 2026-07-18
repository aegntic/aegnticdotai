---
title: 'Introducing aedex: The Aegntic Decentralized Exchange for AI Agents'
description: 'One CLI. One balance. Every data tool. Meet aedex — the CLI that lets agents discover, inspect, and run data tools with a single prepaid balance.'
pubDate: '2025-07-19'
heroImage: '/assets/aedex-hero.jpg'
tags: ['aedex', 'aegntic', 'cli', 'ai-agents', 'developer-tools', 'product-launch']
---

# Introducing aedex: The Aegntic Decentralized Exchange for AI Agents

**One CLI. One balance. Every data tool.**

After months of building in stealth, we're ready to introduce **aedex** — the CLI that lets AI agents (and the developers who build them) discover, inspect, and run data tools with a single prepaid balance.

---

## The Problem We're Solving

Every AI agent that needs real-world data hits the same wall:

- **Apify** for scraping
- **Bright Data** for web data
- **CoinGecko** for markets
- **OpenWeather** for weather
- **HackerNews** for tech signals
- **Frankfurter** for FX rates
- And dozens more...

Each requires its own API key, its own billing, its own docs, its own SDK. A human tolerates 2-3 integrations. An agent trying to wire up 50 tools? It hardcodes two and gives up.

---

## What is aedex?

**aedex = aegntic decentralized exchange**

Think of it as **OpenRouter for data tools** — but with a twist: it's built for agents first, humans second.

```
┌─────────────────────────────────────────────────────────────┐
│                    aedex Architecture                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────┐    ┌──────────────┐    ┌──────────────────┐   │
│   │  Agent  │───▶│  aedex CLI   │───▶│  Gateway API     │   │
│   │ (or dev)│    │ (aedex/ae)   │    │ (Hono + Drizzle) │   │
│   └─────────┘    └──────┬───────┘    └────────┬─────────┘   │
│                         │                       │            │
│                         ▼                       ▼            │
│                  ┌─────────────┐          ┌──────────┐       │
│                  │  MCP Server │          │  Ledger  │       │
│                  │  (16 tools) │          │ (signed) │       │
│                  └─────────────┘          └──────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### One Command, Any Tool

```bash
# Discover what's available
aedex discover -q "weather"

# Inspect before you run
aedex inspect openmeteo/weather/current --json

# Run it, get billed per result
aedex run openmeteo/weather/current --query '{"latitude":52.52,"longitude":13.41}' -w

# Check your balance (4 decimal places — sub-cent precision)
aedex balance
```

**Output:**
```
$ aedex balance
Workspace Balance
  Balance:   9.9840 USD
  Held:      0.0000 USD
  Available: 9.9840 USD
```

---

## What Makes aedex Different

### 1. **Per-Result Billing, Not Per-Call**
Most APIs charge per API call regardless of results. aedex charges **per result returned**. A search returning 0 items costs $0. A scrape returning 100 items costs 100× the unit price. Failed runs? **Free.**

### 2. **One Balance, Infinite Tools**
Prepay once ($10 free credit on signup). Use it across HackerNews, CoinGecko, Frankfurter, Open-Meteo, Apify, and every provider we add. No per-provider wallets.

### 3. **Signed, Tamper-Evident Ledger**
Every charge is an Ed25519-signed entry in an append-only ledger. `GET /v1/balance/audit` returns a cryptographic proof no row was ever mutated or deleted. Balance survives restarts because it's **derived, not stored**.

### 4. **Agent-Native (MCP Server Built-In)**
Run `aedex-mcp` and any MCP-compatible agent (Claude Code, Cursor, Codex) gets instant access to 20+ tools through a single standardized interface. No SDK to learn — just `discover`, `inspect`, `run`.

### 5. **Real Providers, Real Data**
- **Open-Meteo**: Weather, free, no key
- **HackerNews**: Top stories, user profiles
- **CoinGecko**: Real-time crypto markets
- **Frankfurter**: ECB FX rates
- **Apify**: Web search & scraping (credentialed)
- **cldcde skills**: 8 external skills (MCP foundry, mutation gate, n8n orbit, etc.)

---

## The Moat: Telemetry → Reliability → Routing

Most aggregators stop at discovery. aedex goes further:

```
run_events (telemetry) 
    │
    ▼
reliability scoring (p50/p95 latency, success rate, item yield)
    │
    ▼
weighted routing (route to best provider per capability)
    │
    ▼
signed ledger (audit trail for every charge)
```

**The moat compounds:** more calls → better telemetry → better routing → more calls.

---

## Live Now

| Component | Status |
|-----------|--------|
| Signed ledger (Ed25519) | ✅ |
| Telemetry (`run_events`) | ✅ |
| Reliability leaderboard | ✅ |
| 4 no-key providers | ✅ |
| 1 credentialed (Apify) | ✅ |
| 8 cldcde skills | ✅ |
| MCP server | ✅ |
| Web dashboard | ✅ |
| Web live | ✅ (ae-cli-web.vercel.app) |

---

## What's Next

1. **Reliability-weighted discover** — `discover -q "weather"` returns tools ranked by proven success rate
2. **Router demo** — same query, 2+ providers, auto-route to best
3. **Stripe top-up** — webhook → ledger topup → balance refresh
4. **pgvector catalog** — semantic search over embeddings
5. **Deploy** — Cloud Postgres + Fly.io gateway + Vercel web

---

## Try It

```bash
git clone https://github.com/aegntic/aedex
cd aedex && pnpm i && pnpm build
# Set AEGNTIC_APIFY_TOKEN in services/gateway/.env for Apify
pnpm dev  # starts gateway on :3101
# In another terminal:
cd packages/cli && node dist/index.js discover -q "weather"
```

---

## The Vision

**aedex becomes the operating system for AI development:**

- Where developers discover AI capabilities
- Where agents orchestrate AI services
- Where enterprises deploy AI safely
- Where the community advances together

The repo is private until Launch, but the build log is public. Follow [@aedex_ai](https://twitter.com/aedex_ai) for updates.

---

*Building in public at [github.com/aegntic/aedex](https://github.com/aegntic/aedex). Follow [@aedex_ai](https://twitter.com/aedex_ai) for updates.*