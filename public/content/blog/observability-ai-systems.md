---
title: 'Observability for AI Systems: Logging, Metrics, and Traces'
description: 'Monitoring AI applications in production. What to log, which metrics matter, and how to debug when things go wrong.'
pubDate: 'Mar 15 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
tags: ['observability', 'monitoring', 'logging', 'production', 'AI']
---

# Observability for AI Systems

You can't improve what you can't measure. AI systems need observability from day one.

## The Three Pillars

### 1. Logs

What happened, step by step.

### 2. Metrics

Aggregated measurements over time.

### 3. Traces

Request flow through the system.

## Logging for AI

### What to Log

```typescript
interface AILog {
  // Identification
  requestId: string;
  timestamp: Date;
  userId?: string;
  
  // Input (sanitized)
  inputTokens: number;
  inputHash: string;  // Not actual content
  
  // Output
  outputTokens: number;
  model: string;
  
  // Performance
  latency: number;
  
  // Quality
  finishReason: 'stop' | 'length' | 'error';
  
  // Cost
  cost: number;
}
```

### What NOT to Log

- Full prompts (privacy)
- Full responses (storage)
- API keys (security)
- PII (compliance)

### Structured Logging

```typescript
import pino from 'pino';

const logger = pino({
  level: 'info',
  formatters: {
    level: (label) => ({ level: label })
  }
});

logger.info({
  event: 'ai_completion',
  requestId: ctx.requestId,
  model: 'claude-3-sonnet',
  inputTokens: 150,
  outputTokens: 342,
  latency: 1234,
  cost: 0.002
});
```

## Key Metrics

### Latency

```typescript
const latencyHistogram = new Histogram({
  name: 'ai_latency_seconds',
  help: 'AI completion latency',
  labelNames: ['model', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5, 10, 30]
});

// Record
const end = latencyHistogram.startTimer({ model, status });
await complete();
end();
```

### Token Usage

```typescript
const tokenCounter = new Counter({
  name: 'ai_tokens_total',
  help: 'Total tokens used',
  labelNames: ['model', 'type']  // input/output
});

tokenCounter.inc({ model: 'claude-3', type: 'input' }, 150);
tokenCounter.inc({ model: 'claude-3', type: 'output' }, 342);
```

### Error Rate

```typescript
const errorCounter = new Counter({
  name: 'ai_errors_total',
  help: 'Total AI errors',
  labelNames: ['model', 'error_type']
});

// On error
errorCounter.inc({ model: 'gpt-4', error_type: 'rate_limit' });
```

### Cost

```typescript
const costGauge = new Gauge({
  name: 'ai_cost_dollars',
  help: 'AI cost in dollars',
  labelNames: ['model']
});

costGauge.inc({ model: 'claude-3' }, 0.002);
```

## Distributed Tracing

### With OpenTelemetry

```typescript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('ai-service');

async function processRequest(req: Request) {
  return tracer.startActiveSpan('ai.process', async (span) => {
    span.setAttribute('user.id', req.userId);
    
    // Child span for retrieval
    const docs = await tracer.startActiveSpan('ai.retrieve', async (s) => {
      const result = await vectorSearch(req.query);
      s.setAttribute('docs.count', result.length);
      s.end();
      return result;
    });
    
    // Child span for completion
    const response = await tracer.startActiveSpan('ai.complete', async (s) => {
      const result = await llm.complete(req.query, docs);
      s.setAttribute('tokens.output', result.tokens);
      s.end();
      return result;
    });
    
    span.end();
    return response;
  });
}
```

## Dashboards

### Essential Panels

1. **Request Volume** - Requests/minute by model
2. **Latency Percentiles** - P50, P95, P99
3. **Error Rate** - Errors/total requests
4. **Token Usage** - Input vs output over time
5. **Cost Tracker** - Hourly/daily/monthly spend
6. **Quality Score** - User feedback ratings

### Example Grafana Query

```promql
# Request latency P95
histogram_quantile(0.95, 
  sum(rate(ai_latency_seconds_bucket[5m])) by (le, model)
)

# Error rate
sum(rate(ai_errors_total[5m])) 
/ sum(rate(ai_requests_total[5m]))
```

## Alerting

```yaml
groups:
  - name: ai-alerts
    rules:
      - alert: HighErrorRate
        expr: sum(rate(ai_errors_total[5m])) / sum(rate(ai_requests_total[5m])) > 0.05
        for: 5m
        annotations:
          summary: "AI error rate above 5%"
          
      - alert: HighLatency
        expr: histogram_quantile(0.95, sum(rate(ai_latency_seconds_bucket[5m])) by (le)) > 10
        for: 5m
        annotations:
          summary: "AI P95 latency above 10s"
          
      - alert: BudgetExceeded
        expr: sum(ai_cost_dollars) > 100
        annotations:
          summary: "Daily AI budget exceeded"
```

## Debugging Production Issues

1. **Start with metrics** - What changed?
2. **Find affected requests** - Filter by time/error
3. **Trace the request** - Follow the full path
4. **Check logs** - Details at each step
5. **Reproduce locally** - Confirm fix

---

*Observability is non-negotiable in production. See [Claude-Flow](/blog/claude-flow-enterprise-orchestration) for enterprise monitoring.*
