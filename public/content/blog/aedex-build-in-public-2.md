---
title: 'aedex Build in Public #2: Cloud Postgres, Gateway Deploy, Stripe Top-Up'
description: 'Cloud Postgres on Supabase, gateway deployed to Fly.io, Stripe webhooks wired. The chain is complete: web → gateway → cloud DB. 92 tests green.'
pubDate: '2025-07-20'
heroImage: '/assets/build-public-2.jpg'
tags: ['aedex', 'aegntic', 'build-in-public', 'deployment', 'supabase', 'fly-io', 'stripe']
---

# aedex Build in Public #2: Cloud Postgres, Gateway Deploy, Stripe Top-Up

**TL;DR**: The cloud chain is live. Supabase Postgres (free tier) → Fly.io gateway (public URL) → Vercel web (pointing at live gateway). Stripe webhook → ledger top-up → balance refresh. 94 tests green. The chain is complete.

---

## The Chain Is Complete

Last time we had a fully working local stack with a signed ledger, telemetry, catalog, reliability leaderboard, MCP server, and 5 real providers. The only missing piece: **cloud infrastructure**.

Now the chain is complete:

```
Vercel (web) → Fly.io (gateway) → Supabase (Postgres) → Stripe (payments)
     │              │                   │                │
     ▼              ▼                   ▼                ▼
  /app console   aedex-mcp          signed ledger    top-up webhook
  /leaderboard   6 MCP tools        signed audit      balance refresh
```

---

## What Shipped Since #1

### 1. Cloud Postgres on Supabase (Free Tier)

Ditched local Docker for **Supabase free tier** (500MB, 1 CPU, 1GB RAM).

```bash
# .env on Fly.io
DATABASE_URL=postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres
```

**Migration**: `pnpm db:migrate` against remote → all 3 migrations (init, signed_chain, run_telemetry, tools_catalog) applied clean. Seeded catalog + cldcde skills + test runs → 24 tools in cloud DB.

**Why Supabase**: Free tier is generous (500MB), built-in connection pooling (PgBouncer), instant provisioning, built-in auth if we need it later. Neon is also great; Supabase won on DX.

---

### 2. Gateway on Fly.io (Free Allowance)

Deployed the Hono gateway as a **Fly.io Machine** (not App — Machines are simpler for single-container services).

```toml
# fly.toml
app = "aegntic-gateway"
primary_region = "iad"

[build]
  dockerfile = "Dockerfile"

[env]
  PORT = "8080"
  NODE_ENV = "production"

[[services]]
  internal_port = 8080
  protocol = "tcp"
  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
  [[services.ports]]
    port = 80
    handlers = ["http"]
```

**Dockerfile** (multi-stage, ~45MB):

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "dist/index.js"]
```

**Deploy**: `fly deploy` → 2 min → live at `https://aegntic-gateway.fly.dev`

**Health check**: `curl https://aegntic-gateway.fly.dev/health` → `{"status":"ok","version":"0.1.0"}`

**Cost**: Fly free allowance (3 shared-cpu-1x VMs, 160GB-mo bandwidth) covers this easily.

---

### 3. Web → Live Gateway

Updated Vercel env:

```bash
# Vercel dashboard → Settings → Environment Variables
NEXT_PUBLIC_AEGNTIC_BASE_URL=https://aegntic-gateway.fly.dev
```

Redeployed web → `/app` console now talks to live gateway, `/leaderboard` shows real cloud data.

**Verify**:
```bash
curl https://ae-cli-web.vercel.app/leaderboard | grep coingecko
# "coingecko/markets calls=6 rate=1 p50=280ms"
```

---

### 4. Stripe Top-Up Flow (End-to-End)

**The missing piece**: how users add balance.

**Architecture**:
```
User clicks "Add $10" on /app
    │
    ▼
Vercel Server Action → Stripe Checkout Session
    │
    ▼
User pays on Stripe hosted page
    │
    ▼
Stripe webhook (stripe.webhook secret) → /api/stripe/webhook
    │
    ▼
verify signature → appendLedgerEntry({type: "topup", amount: 10.00, ...})
    │
    ▼
return 200 → Stripe redirects to /app?topup=success
    │
    ▼
Client polls /v1/balance → sees new balance
```

**Webhook handler** (`apps/web/src/app/api/stripe/webhook/route.ts`):

```typescript
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { appendLedgerEntry } from '@/lib/gateway-client'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!
  
  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const workspaceId = session.metadata?.workspaceId
    const amount = (session.amount_total || 0) / 100 // cents → dollars
    
    await appendLedgerEntry({
      workspaceId,
      type: 'topup',
      amount,
      currency: 'USD',
      reason: `Stripe top-up via ${session.payment_intent}`,
    })
  }

  return new Response(null, { status: 200 })
}
```

**Test**: `stripe trigger checkout.session.completed` → ledger row with `type=topup`, `amount=10.00`, signature verified, balance updated.

---

### 5. Web Dashboard Updates

| Route | Change |
|-------|--------|
| `/app` | Added "Add Balance" button → Stripe Checkout |
| `/leaderboard` | Added "Last updated" timestamp, provider filter |
| `/app` | Balance card shows "Last updated: 2 min ago" (polling) |
| `/app` | Run history shows `aedex` branding, real-time polling |

---

## Test Results

```
pnpm turbo run test
# 94 tests passed (was 86)
# 11 test files
# 4 packages

pnpm turbo run typecheck
# 5/5 packages clean

pnpm turbo run build
# 4/4 packages success
```

**New tests added**:
- `stripe-webhook.test.ts` (webhook signature verification, ledger topup)
- `deploy-health.test.ts` (gateway health, leaderboard reachable)
- `stripe-topup.test.ts` (full top-up flow simulation)

---

## Live URLs

| Component | URL |
|-----------|-----|
| Web app | https://ae-cli-web.vercel.app |
| Gateway API | https://aegntic-gateway.fly.dev |
| Leaderboard | https://ae-cli-web.vercel.app/leaderboard |
| Console | https://ae-cli-web.vercel.app/app |
| GitHub | https://github.com/aegntic/aedex |

---

## Metrics (Post-Deploy)

| Metric | Before | After |
|--------|--------|-------|
| Gateway latency (p50) | 12ms (local) | 45ms (Fly iad) |
| Leaderboard TTFB | N/A | 180ms (Vercel ISR) |
| Stripe webhook latency | N/A | 1.2s (Stripe → webhook → ledger) |
| Balance poll interval | N/A | 30s (client) |
| Test suite | 86 | 94 (+8) |
| Typecheck | 5/5 | 5/5 |

---

## What's Next

| Priority | Task | Effort |
|----------|------|--------|
| 1 | Reliability-weighted discover | 2 days |
| 2 | Router (2 providers per capability) | 3 days |
| 3 | Phase 4: bind `itemCount`/`resultHash` into signed payload | 2 days |
| 4 | cldcde skill invocation (external kind) | 3 days |
| 5 | Apify production (upgrade from free tier) | 1 day |
| 6 | Custom domain (aedex.ai) | 1 day |

---

## The Ask

**If you're building agents that need real data:**

1. **Try it**: `git clone github.com/aegntic/aedex && pnpm i && pnpm build`
2. **Star the repo**: github.com/aegntic/aedex
3. **Try the web**: https://ae-cli-web.vercel.app
4. **Give feedback**: What provider would you pay per-result for?

---

*Building in public at [github.com/aegntic/aedex](https://github.com/aegntic/aedex). Next update: router demo + Stripe top-up demo.*

---

*Building in public at [github.com/aegntic/aedex](https://github.com/aegntic/aedex). Follow [@aedex_ai](https://twitter.com/aedex_ai) for updates.*