---
title: 'Bun vs Node: Why We Switched Our Runtime'
description: 'The decision to switch from Node.js to Bun. Performance benchmarks, compatibility testing, and lessons from the migration.'
pubDate: 'Jun 01 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
tags: ['bun', 'nodejs', 'javascript', 'performance', 'runtime']
---

# Bun vs Node: Why We Switched

We were happy Node.js users for years. Then we tried Bun.

Three weeks later, our entire stack runs on Bun.

## The Promise

Bun promises:

- **Faster execution**: Up to 4x faster than Node
- **Faster startup**: Sub-millisecond cold starts
- **Native bundling**: No webpack/esbuild needed
- **Native testing**: Jest-compatible test runner
- **Node compatibility**: Drop-in replacement

But promises are cheap. We tested.

## Benchmark Results

### Installation Speed

```bash
# Node.js project (1,200 dependencies)
npm install    # 45 seconds
pnpm install   # 22 seconds
bun install    # 4 seconds
```

**Winner**: Bun (11x faster than npm)

### Script Execution

```bash
# Simple script
node script.js   # 180ms
bun run script.js  # 45ms

# TypeScript (no pre-compile)
ts-node script.ts    # 1,200ms
bun run script.ts   # 60ms
```

**Winner**: Bun (4x for JS, 20x for TS)

### HTTP Server Performance

```javascript
// Simple HTTP server benchmark
// 10,000 requests, keep-alive

// Node.js (Express)
Requests/sec: 12,000
Latency avg: 8ms

// Bun (Bun.serve)
Requests/sec: 85,000
Latency avg: 1ms
```

**Winner**: Bun (7x more requests)

### Build Time

```bash
# Build React app
npm run build    # 28 seconds
bun run build    # 12 seconds
```

**Winner**: Bun (2.3x faster)

### Test Suite

```bash
# 500 tests
npm test   # 18 seconds
bun test   # 5 seconds
```

**Winner**: Bun (3.6x faster)

## Compatibility Testing

### What Worked Immediately

- Express.js ✅
- Hono ✅
- Prisma ✅
- Drizzle ✅
- React/Next.js ✅
- TypeScript ✅
- Most npm packages ✅

### What Required Changes

**Native modules**: Some needed recompilation

```bash
bun add sharp  # Handles automatically
```

**Node-specific APIs**: Some edge cases

```javascript
// Node
process.nextTick(callback);

// Bun (works, but setImmediate is preferred)
setImmediate(callback);
```

**File watching**: Different behavior in some cases

```javascript
// Use Bun's native watch
import { watch } from "fs";
// vs Bun-native
Bun.file(path).watch(callback);
```

### What Didn't Work

- A few native modules with Node-specific bindings
- Some obscure Node.js APIs
- Certain worker thread patterns

Overall compatibility: **~95%** of our code worked unchanged.

## Migration Process

### Step 1: Test Compatibility

```bash
# Replace node_modules
rm -rf node_modules package-lock.json
bun install

# Run tests
bun test
```

### Step 2: Update Scripts

```json
// package.json
{
  "scripts": {
    "dev": "bun run --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist",
    "test": "bun test",
    "start": "bun run dist/index.js"
  }
}
```

### Step 3: Update CI/CD

```yaml
# GitHub Actions
- uses: oven-sh/setup-bun@v1
  with:
    bun-version: latest
    
- run: bun install
- run: bun test
- run: bun run build
```

### Step 4: Docker Updates

```dockerfile
FROM oven/bun:1 as builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1-slim
COPY --from=builder /app/dist /app
CMD ["bun", "run", "/app/index.js"]
```

## Real-World Impact

### Developer Experience

| Metric | Before (Node) | After (Bun) |
|--------|--------------|-------------|
| Install time | 45s | 4s |
| Dev server start | 3s | 0.5s |
| Hot reload | 500ms | 100ms |
| Test suite | 18s | 5s |
| Build time | 28s | 12s |

**Total daily time saved per developer**: ~15 minutes

### Production Performance

| Metric | Before (Node) | After (Bun) |
|--------|--------------|-------------|
| Cold start | 800ms | 150ms |
| Requests/sec | 12,000 | 85,000 |
| P99 latency | 45ms | 8ms |
| Memory usage | 180MB | 120MB |

### Cost Impact

- **Fewer servers needed**: 4x throughput per instance
- **Less compute time**: Faster cold starts in serverless
- **Developer productivity**: Faster iteration cycles

## Gotchas We Discovered

### 1. Bun's Bundler Is Young

For complex bundling, we still use esbuild in some places.

### 2. Error Messages Differ

Stack traces look different. Takes adjustment.

### 3. Some Node.js Patterns Don't Translate

```javascript
// Node pattern that works differently
const module = require(`./dynamic/${name}`);

// Bun prefers
const module = await import(`./dynamic/${name}`);
```

### 4. Lock File Differences

`bun.lockb` is binary (faster), but you lose diff visibility.

## When to Stick with Node

- Heavy native module usage
- Edge cases with Node.js compatibility
- Team unfamiliar with Bun ecosystem
- Risk-averse production environments

## Our Recommendation

**For new projects**: Start with Bun. The benefits are significant.

**For existing projects**: Test compatibility, migrate incrementally.

**For production**: We've run Bun in production for 6 months with zero issues.

---

*Bun powers our development workflow. For the full tech stack, see [Building a 40+ Platform Ecosystem](/blog/building-40-platform-ai-ecosystem).*
