---
title: 'Cloudflare Workers as AI Backend: Why We Chose Edge Computing'
description: 'The architecture decision behind using Cloudflare Workers for AI workloads. Edge computing advantages, deployment patterns, and performance insights.'
pubDate: 'Jun 20 2024'
heroImage: '../../assets/blog-placeholder-1.jpg'
tags: ['cloudflare', 'edge-computing', 'architecture', 'deployment', 'AI']
---

# Cloudflare Workers as AI Backend

When you need AI inference at the edge, milliseconds matter.

We chose Cloudflare Workers as our primary backend infrastructure. Here's why.

## The Case for Edge

Traditional cloud architecture:

```
User (Sydney) → CDN → API (Virginia) → AI (Virginia) → Response
                        ↑ 200ms latency
```

Edge architecture:

```
User (Sydney) → Worker (Sydney) → AI API → Response
                  ↑ 20ms latency
```

For interactive applications, this difference is everything.

## Cloudflare Workers Architecture

### What Workers Provides

- **Global distribution**: 300+ data centers
- **V8 isolates**: Sub-millisecond cold starts
- **0ms cold start**: After first request
- **50ms CPU limit**: Per request (prevents runaway)
- **KV storage**: Global key-value store
- **D1**: SQLite at the edge
- **R2**: Object storage without egress fees
- **Durable Objects**: Stateful edge computing

### Our Stack

```typescript
// Worker stack
export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    
    // Fast path: Static assets
    if (url.pathname.startsWith('/assets')) {
      return env.ASSETS.fetch(request);
    }
    
    // Auth check
    const user = await authenticate(request, env);
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    // Route to handlers
    return router.handle(request, env, user);
  }
};
```

### Database Patterns

**D1 for lightweight data**:

```typescript
const result = await env.DB.prepare(
  'SELECT * FROM prompts WHERE user_id = ? ORDER BY created_at DESC'
).bind(userId).all();
```

**KV for fast lookups**:

```typescript
// Cache API responses
const cached = await env.CACHE.get(`response:${hash}`);
if (cached) return JSON.parse(cached);

// Store with TTL
await env.CACHE.put(`response:${hash}`, result, { expirationTtl: 3600 });
```

**Durable Objects for state**:

```typescript
export class UserSession extends DurableObject {
  async fetch(request: Request) {
    // Guaranteed single execution per session
    const state = await this.state.storage.get('session');
    // ... handle request
  }
}
```

## AI Integration Patterns

### External AI API Calls

```typescript
async function callAI(prompt: string, env: Env) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_KEY,
      'anthropic-version': '2024-01-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  
  return response.json();
}
```

### Workers AI (Serverless AI)

```typescript
// Built-in AI models
const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
  messages: [
    { role: 'user', content: 'Explain quantum computing' }
  ]
});
```

Available models:

- Llama 2 (various sizes)
- Mistral
- Embedding models
- Image generation

### Streaming Responses

```typescript
export default {
  async fetch(request: Request, env: Env) {
    const stream = await callStreamingAI(prompt, env);
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  }
};
```

## Performance Results

### Latency Comparison

| Region | Traditional Cloud | Cloudflare Workers |
|--------|------------------|-------------------|
| US East | 50ms | 15ms |
| US West | 120ms | 20ms |
| Europe | 150ms | 25ms |
| Asia Pacific | 250ms | 30ms |
| Australia | 280ms | 25ms |

### Cold Start Comparison

| Platform | Cold Start |
|----------|-----------|
| AWS Lambda | 100-500ms |
| Google Cloud Functions | 100-400ms |
| Azure Functions | 100-500ms |
| Cloudflare Workers | <5ms |

### Cost Comparison

| Metric | AWS Lambda | Cloudflare Workers |
|--------|-----------|-------------------|
| Requests/month | 10M | 10M |
| Compute (128MB) | $20/month | Included |
| Total | ~$25/month | $5/month |

## Deployment Pipeline

### Wrangler Configuration

```toml
# wrangler.toml
name = "aegntic-api"
main = "src/worker.ts"
compatibility_date = "2024-01-01"

[env.production]
workers_dev = false
route = { pattern = "api.aegntic.ai/*", zone_name = "aegntic.ai" }

[env.staging]
workers_dev = false
route = { pattern = "api-staging.aegntic.ai/*", zone_name = "aegntic.ai" }

[[d1_databases]]
binding = "DB"
database_name = "aegntic-prod"
database_id = "xxx"

[[kv_namespaces]]
binding = "CACHE"
id = "xxx"
```

### GitHub Actions Deployment

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          command: deploy --env production
```

## Lessons Learned

### 1. Embrace the Constraints

50ms CPU limit forces efficient code. This is a feature, not a limitation.

### 2. Cache Aggressively

KV and Cache API are fast. Use them for everything cacheable.

### 3. Streaming Changes Everything

Streaming responses feel instant even when processing takes time.

### 4. Durable Objects Are Powerful

When you need state, Durable Objects provide consistency without traditional databases.

### 5. Cost Scales Linearly

Unlike traditional cloud, there are no surprise bills from cold starts or idle compute.

---

*Cloudflare Workers powers our edge infrastructure. For the services built on this platform, see [MCP Server Collection](/blog/mcp-server-collection).*
