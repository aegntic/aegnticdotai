---
title: 'Cost Optimization for LLM Applications: Spending Wisely on AI'
description: 'Strategies to reduce AI API costs. Model selection, caching, prompt optimization, and intelligent routing.'
pubDate: 'Mar 25 2024'
heroImage: '../../assets/blog-placeholder-1.jpg'
tags: ['cost', 'optimization', 'LLMs', 'architecture', 'business']
---

# Cost Optimization for LLM Applications

AI API costs can spiral quickly. A naive implementation might spend $10,000/month. An optimized one, $500.

Same functionality. Smart architecture.

## Understanding Costs

### Token Pricing (per 1M tokens)

| Model | Input | Output |
|-------|-------|--------|
| GPT-4 | $30 | $60 |
| GPT-4o | $5 | $15 |
| Claude 3 Opus | $15 | $75 |
| Claude 3 Haiku | $0.25 | $1.25 |
| Llama 3 70B (OpenRouter) | $0.90 | $0.90 |

Output tokens cost 2-5x more than input tokens.

## Strategy 1: Model Tiering

```typescript
type Complexity = 'simple' | 'medium' | 'complex';

function selectModel(task: Task): string {
  const complexity = assessComplexity(task);
  
  return {
    simple: 'claude-3-haiku',      // $0.25/M - 20x cheaper
    medium: 'gpt-4o-mini',         // $0.15/M 
    complex: 'claude-3-opus'       // $15/M - only when needed
  }[complexity];
}

// Automatic complexity detection
function assessComplexity(task: Task): Complexity {
  if (task.type === 'classification') return 'simple';
  if (task.type === 'generation' && task.length < 100) return 'simple';
  if (task.requiresReasoning) return 'complex';
  return 'medium';
}
```

**Impact**: 70-90% cost reduction for simple tasks.

## Strategy 2: Caching

```typescript
import { createHash } from 'crypto';

const cache = new Map<string, CachedResponse>();

async function cachedComplete(prompt: string, options: Options) {
  const key = createHash('sha256')
    .update(JSON.stringify({ prompt, ...options }))
    .digest('hex');
  
  // Check cache
  const cached = cache.get(key);
  if (cached && !isExpired(cached)) {
    return cached.response;
  }
  
  // Call API
  const response = await llm.complete(prompt, options);
  
  // Cache if deterministic
  if (options.temperature === 0) {
    cache.set(key, { response, timestamp: Date.now() });
  }
  
  return response;
}
```

**Impact**: 30-50% reduction for repeated queries.

## Strategy 3: Prompt Compression

```typescript
// Before: 500 tokens
const verbose = `
  Please analyze the following text carefully and thoroughly.
  Consider all aspects of the content including but not limited to
  the main themes, supporting arguments, and overall structure.
  
  Text: ${content}
`;

// After: 50 tokens
const compressed = `Analyze:\n${content}`;

// Same quality, 90% fewer tokens
```

**Impact**: 50-80% input cost reduction.

## Strategy 4: Batching

```typescript
// Expensive: 10 API calls
async function processItems(items: Item[]) {
  return Promise.all(items.map(item => 
    llm.complete(`Classify: ${item.text}`)
  ));
}

// Cheap: 1 API call
async function batchProcess(items: Item[]) {
  const prompt = items.map((item, i) => 
    `${i+1}. ${item.text}`
  ).join('\n');
  
  const result = await llm.complete(
    `Classify each item (positive/negative):\n${prompt}\n\nRespond with numbers and classifications only.`
  );
  
  return parseClassifications(result);
}
```

**Impact**: 5-10x fewer API calls = 5-10x lower overhead.

## Strategy 5: Output Length Control

```typescript
// Expensive: Unlimited output
const verbose = await llm.complete(prompt);
// Often produces 500+ tokens

// Cheap: Controlled output
const concise = await llm.complete(prompt, {
  max_tokens: 100,
  stop: ['\n\n']  // Stop at paragraph break
});
```

**Impact**: 60-80% output cost reduction.

## Strategy 6: Smart Fallbacks

```typescript
async function optimizedComplete(prompt: string) {
  // Try cheap model first
  const cheapResult = await cheapModel.complete(prompt);
  
  // Validate quality
  if (await isHighQuality(cheapResult)) {
    return cheapResult;
  }
  
  // Fallback to expensive only if needed
  return expensiveModel.complete(prompt);
}
```

**Impact**: 80%+ queries satisfied by cheap model.

## Cost Monitoring

```typescript
class CostTracker {
  private costs: CostEntry[] = [];
  
  track(model: string, inputTokens: number, outputTokens: number) {
    const cost = this.calculateCost(model, inputTokens, outputTokens);
    this.costs.push({ model, cost, timestamp: new Date() });
    
    // Alert on threshold
    if (this.dailyCost() > this.dailyBudget) {
      this.alert('Daily budget exceeded');
    }
  }
  
  report(): CostReport {
    return {
      today: this.dailyCost(),
      thisMonth: this.monthlyCost(),
      byModel: this.costByModel(),
      trend: this.costTrend()
    };
  }
}
```

## Real-World Results

Before optimization:

- **Monthly spend**: $8,500
- **Requests**: 500,000
- **Avg cost/request**: $0.017

After optimization:

- **Monthly spend**: $850
- **Requests**: 500,000
- **Avg cost/request**: $0.0017

**90% cost reduction** with same functionality.

---

*Cost optimization is essential at scale. See [OpenRouter](/blog/openrouter-unified-llm-api) for unified model access.*
