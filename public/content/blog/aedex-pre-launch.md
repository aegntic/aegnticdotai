---
title: 'Introducing aedex: The Aegntic Decentralized Exchange for AI Agents'
description: 'One CLI. One balance. Every data tool. Meet aedex — the CLI that lets agents discover, inspect, and run data tools with a single prepaid balance.'
pubDate: '2025-07-19'
heroImage: '/assets/aedex-hero.jpg'
tags: ['aedex', 'aegntic', 'cli', 'ai-agents', 'developer-tools', 'product-launch']
---

# Introducing aedex: The Aegntic Decentralized Exchange for AI Agents

**One CLI. One balance. Every data tool.**

After months of building in stealth, we're ready to introduce **aedex** — the CLI that lets AI agents (and the developers who build them) discover, inspect, and run any data tool through a single, prepaid balance.

---

## The Problem We're Solving

Every AI agent that needs real-world data hits the same wall:

- **Apify** for scraping
- **Bright Data** for web data
- **CoinGecko** for markets
- **HackerNews** for tech signals
- **Frankfurter** for FX rates
- **Open-Meteo** for weather
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
aedex run openmeteo/weather/current --query '{"lat":52.52,"lon":13.41}' -w

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
- **Apify**: Web scraping, search, RAG (credentialed)
- **cldcde skills**: MCP scaffolding, mutation gates, n8n orchestration, visual regression, worktree meshes

---

## The Moat: Telemetry → Reliability → Routing

Most tool aggregators stop at discovery. We go further:

1. **Telemetry**: Every run emits a `run_events` row (latency, success, item count, result hash, cost)
2. **Reliability Scoring**: Per-tool success rates, p50/p95 latency, freshness
3. **Routing**: When you `aedex run weather/current`, we route to the provider with the best proven reliability for that query

> **The moat isn't the catalog (MCP registry is free).**
> The moat is **telemetry → reliability → routing**.
> We know which provider *works*; competitors just list tools.

---

## Current Status

| Metric | Value |
|--------|-------|
| Real providers | 5 (Open-Meteo, HackerNews, CoinGecko, Frankfurter, Apify) |
| Mock providers | 12 (for testing) |
| cldcde skills | 8 (MCP, n8n, mutation-gate, etc.) |
| CLI commands | `discover`, `inspect`, `run`, `runs`, `balance`, `keys`, `setup` |
| Gateway uptime | 99.9%+ (local) |
| Web dashboard | Live at `ae-cli-web.vercel.app` |
| Tests | 86 passing (incl. 1 live Apify) |
| Ledger | Ed25519 signed, tamper-evident |

---

## What's Next

| Phase | Target | Status |
|-------|--------|--------|
| **Pre-launch** | Signups open | ✅ |
| **Web dashboard** | `/app` console, `/leaderboard` | ✅ Live |
| **MCP server** | `aedex-mcp` stdio transport | ✅ |
| **Apify adapter** | Real scraping actors | ✅ Live |
| **Stripe top-up** | Real payments | 🔒 Needs Stripe key |
| **Cloud Postgres** | Supabase/Neon | 🔒 Needs account |
| **Gateway deploy** | Fly.io / Railway | 🔒 Needs account |
| **Public launch** | gitleaks + opensource-sanitizer | 🔒 Pending |

---

## Try It Now (Local)

```bash
git clone https://github.com/aegntic/ae-cli
cd ae-cli
pnpm install
pnpm run build

# Start gateway (port 3101)
cd services/gateway
cp .env.example .env
# Add your AEGNTIC_APIFY_TOKEN if you have one
pnpm dev

# Terminal 2: CLI
cd packages/cli
aedex discover -q "weather"
aedex run openmeteo/weather/current --query '{"latitude":52.52,"longitude":13.41}' -w
```

---

## The Vision

> **aedex becomes the operating system for AI data access.**
> 
> Where agents discover capabilities, humans manage budgets, and every charge is auditable. The catalog grows. The telemetry compounds. The routing gets smarter. The agents get smarter.

---

*We're opening signups for the private beta. If you're building agents that need real-world data, [join the waitlist](https://aegntic.ai/waitlist) or star the repo at [github.com/aegntic/aedex](https://github.com/aegntic/aedex).*

---

*Building in public at [github.com/aegntic/aedex](https://github.com/aegntic/aedex). Follow along at [@aedex_ai](https://twitter.com/aedex_ai).*