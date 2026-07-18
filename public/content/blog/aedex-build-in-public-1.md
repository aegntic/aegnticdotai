---
title: 'aedex Build in Public #1: Spine Complete, 4 Real Providers, Honest Leaderboard'
description: 'The spine is complete: discover → run → bill → trust. 4 real providers, 1 credentialed, honest leaderboard with real failure rates. 86 tests green.'
pubDate: '2025-07-19'
heroImage: '/assets/build-public-1.jpg'
tags: ['aedex', 'aegntic', 'build-in-public', 'cli', 'ai-agents', 'open-source', 'typescript']
---

# aedex Build in Public #1: Spine Complete

**TL;DR**: The product spine is complete. `discover → run → bill → trust` works end-to-end on real data. 4 no-key providers + 1 credentialed (Apify). Honest leaderboard with real failure rates. 86 tests green. Web live at [ae-cli-web.vercel.app](https://ae-cli-web.vercel.app).

---

## The Spine Is Complete

Four checkpoints down. The product spine is solid:

```
discover (18 tools, full-text + pgvector-ready)
    │
    ▼
run (5 real providers: Open-Meteo, HackerNews, CoinGecko, Frankfurter, Apify)
    │
    ▼
bill (Ed25519 signed ledger, charge-actual, free-on-fail, survives restart)
    │
    ▼
trust (/v1/balance/audit + public /leaderboard with real reliability data)
```

---

## What Shipped Since Last Time

### 1. Three Real No-Key Providers (Checkpoint 4)

| Provider | Endpoints | Cost | Notes |
|----------|-----------|------|--------|
| **HackerNews** | `stories/top`, `user/:id` | $0.002/result | Firebase API |
| **CoinGecko** | `markets` (ids + limit) | $0.003/result | Public API v3 |
| **Frankfurter** | `rates/latest`, `rates/:date` | $0.002/call | ECB (via frankfurter.app) |

All server-side fetch, `AbortSignal.timeout(10s)`, no keys required. Swapped REST Countries (deprecated) for Frankfurter — it returns real 404s on bad currency codes, which makes the leaderboard honest.

### Real Telemetry, Real Failures

```
aedex run frankfurter/rates/latest --query '{"from":"ZZZNOTACURRENCY"}'
→ real HTTP 404 from Frankfurter
→ leaderboard shows 66.7% success rate
```

We don't hide failures. The leaderboard shows **66.7% success for Frankfurter** because one of three calls was a deliberate bad-currency test. That's the moat: **honest telemetry → honest routing**.

### Leaderboard (Live Data)

| Provider | Calls | Success | p50 Latency |
|----------|-------|---------|-------------|
| coingecko/markets | 6 | 100% | 280ms |
| openmeteo/weather | 6 | 100% | 320ms |
| hackernews/stories/top | 4 | 100% | 758ms |
| frankfurter/rates/latest | 3 | **66.7%** | 662ms |

---

### 2. Apify Adapter (Credentialed, Checkpoint 4)

First **credentialed** provider. Three actors:

| Endpoint | Apify Actor | Use Case |
|----------|-------------|----------|
| `system/echo` | `apify/hello-world` | Credential smoke test |
| `web/search` | `apify/rag-web-browser` | Search + markdown content |
| `web/scrape` | `apify/rag-web-browser` | URL → markdown |

Real actors, real costs ($0.01/result), real telemetry. Live test: `aedex run apify/system/echo` → 1 item, $0.01, signed ledger entry, telemetry row with 2.5s latency.

---

### 3. cldcde Skills as External Tools (Checkpoint 6)

8 aegntic-owned skills seeded as `kind=external` tools:

| Skill | Description |
|-------|-------------|
| `mcp-foundry` | Scaffold/harden MCP servers |
| `mutation-gate` | Safe mutation gates for agents |
| `n8n-orbit` | n8n workflow orchestration |
| `skill-builder` | Scaffold new skills from prompt |
| `visual-regression-forge` | Pixel-perfect visual diffs |
| `worktree-mesh` | Parallel git worktree orchestration |
| `claude-template-switchboard` | Claude Code template switching |
| `context7-radar` | Context7 library lookup |

All `kind=external`, per-call pricing, discoverable via `aedex discover`, invocable via same `aedex run` command. The catalog went from 18 → 26 tools.

---

### 4. MCP Server (aedex as a Tool)

Run `aedex-mcp` and any MCP-compatible agent (Claude Code, Cursor, Codex) gets:

```json
{
  "tools": [
    "discover", "inspect", "run", "get_run", 
    "balance", "balance_audit"
  ]
}
```

One MCP server hiding 20+ upstream tools. The agent doesn't need to know about Apify vs CoinGecko — it just calls `run`.

---

### 5. Web Dashboard Live

| Route | Status |
|-------|--------|
| `/` | Landing (hero + featured) |
| `/app` | Console (key gate, balance hero, run history) |
| `/leaderboard` | **SSR/ISR (5min)**, real data, color-coded success rates |

The `/leaderboard` page is the GEO asset — SSR with 5min ISR, real data embedded in HTML for crawlers.

---

## What's Real vs What's Next

| Component | Status | Notes |
|-----------|--------|-------|
| Signed ledger | ✅ | Ed25519, audit endpoint, survives restart |
| Telemetry | ✅ | `run_events` table, 13 cols, 22 rows |
| Reliability leaderboard | ✅ | `/leaderboard` (public), `/v1/reliability` (auth) |
| 4 no-key providers | ✅ | HN, CoinGecko, Frankfurter, Open-Meteo |
| 1 credentialed (Apify) | ✅ | 3 actors, real billing |
| 8 cldcde skills | ✅ | External kind, seeded |
| MCP server | ✅ | 6 tools, stdio |
| Web dashboard | ✅ | Vercel, SSR/ISR |
| Stripe top-up | ❌ | Need Stripe key |
| Cloud Postgres | ❌ | Local Docker only |
| Gateway deploy | ❌ | Need Fly/Railway |
| Apify production | ⚠️ | Free tier only |
| pgvector semantic search | 🔜 | v2, needs embedding API |

---

## What's Next (Priority Order)

1. **Reliability-weighted discover** — `discover -q "weather"` returns tools ranked by `successRate × 1/latency`, not text match
2. **Router demo** — Same query, 2 providers, auto-route to best one
3. **Stripe top-up** — Webhook → ledger topup → balance refresh
4. **pgvector catalog** — Semantic search over embeddings (needs embedding API)
3. **cldcde external skills** — `kind=external` with real implementations
4. **Router demo** — Two providers per capability, auto-route by reliability
7. **Phase 4** — Bind `itemCount`/`resultHash` into signed payload
8. **Deploy** — Cloud Postgres + Fly.io gateway + Vercel web pointing at live gateway

---

## The Honest Bits

**What's working:**
- Signed ledger survives restarts, audit endpoint cryptographically verifies
- Telemetry captures real latency/success/itemCount/agent-rejected signal
- Leaderboard shows 66.7% for Frankfurter because we *tested* a bad currency
- Apify real calls work, billed per result, telemetry row created
- cldcde skills expand catalog without touching gateway code

**What's not done:**
- No cloud Postgres (local Docker only)
- No gateway deploy (local :3101 only)
- No Stripe (no top-up flow)
- Apify on free tier only (rate limited)
- No provider redundancy (router needs ≥2 per capability)

**Biggest threat:** OpenRouter for tools. If they add per-result billing + signed ledger, they win distribution. Our wedge: telemetry → routing → trust. They have distribution; we have the ledger + telemetry loop.

---

## The Ask

**If you're building agents that need real data:**

1. **Try it locally**: `git clone github.com/aegntic/aedex && pnpm i && pnpm build`
2. **Star the repo**: github.com/aegntic/aedex
3. **Try the web**: https://ae-cli-web.vercel.app
4. **Give feedback**: What provider would you pay per-result for?

---

*Building in public at [github.com/aegntic/aedex](https://github.com/aegntic/aedex). Next update: router demo + Stripe top-up.*

---

*Building in public at [github.com/aegntic/aedex](https://github.com/aegntic/aedex). Follow [@aedex_ai](https://twitter.com/aedex_ai) for updates.*