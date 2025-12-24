---
title: 'OpenRouter: One API for All LLMs'
description: 'How we use OpenRouter to access Claude, GPT-4, Gemini, and dozens of other models through a single API. Cost optimization and model selection strategies.'
pubDate: 'May 25 2024'
heroImage: '../../assets/blog-placeholder-5.jpg'
tags: ['openrouter', 'LLMs', 'API', 'AI', 'integration']
---

# OpenRouter: One API for All LLMs

Managing API keys for OpenAI, Anthropic, Google, Meta, Mistral...

It gets tedious.

OpenRouter provides a single API that routes to any model. We use it extensively.

## The Value Proposition

### Before OpenRouter

```javascript
// Different clients for each provider
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_KEY });
const google = new GoogleAI({ apiKey: process.env.GOOGLE_KEY });

// Different APIs for each
const gptResponse = await openai.chat.completions.create({...});
const claudeResponse = await anthropic.messages.create({...});
const geminiResponse = await google.generateContent({...});
```

### After OpenRouter

```javascript
// One client
const openrouter = new OpenRouter({ apiKey: process.env.OPENROUTER_KEY });

// Unified API for any model
const response = await openrouter.chat.completions.create({
  model: 'anthropic/claude-3-opus',  // or 'openai/gpt-4-turbo'
  messages: [...]
});
```

## Available Models

OpenRouter provides access to:

### Commercial Models

- anthropic/claude-3-opus
- anthropic/claude-3-sonnet
- anthropic/claude-3-haiku
- openai/gpt-4-turbo
- openai/gpt-4o
- openai/gpt-4o-mini
- google/gemini-pro-1.5
- google/gemini-flash-1.5

### Open Source Models

- meta-llama/llama-3-70b-instruct
- meta-llama/llama-3-8b-instruct
- mistralai/mixtral-8x7b
- mistralai/mistral-large
- deepseek/deepseek-chat
- qwen/qwen-72b-chat

### Specialized Models

- anthropic/claude-3-opus (best for code)
- google/gemini-pro-vision (multimodal)
- nousresearch/hermes-3-llama-3.1 (roleplay)

## Cost Comparison

OpenRouter often provides better pricing:

| Model | Direct Pricing | OpenRouter | Savings |
|-------|---------------|-----------|---------|
| GPT-4 | $30/1M tokens | $30/1M | Same |
| Claude 3 Opus | $75/1M | $45/1M | 40% |
| Gemini Pro | $0.50/1M | $0.125/1M | 75% |
| Llama 3 70B | N/A (host yourself) | $0.90/1M | Easy access |

## Implementation

### Basic Usage

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://aegntic.ai',
    'X-Title': 'Aegntic Platform'
  }
});

async function complete(prompt: string, model = 'anthropic/claude-3-sonnet') {
  const response = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }]
  });
  
  return response.choices[0].message.content;
}
```

### With Streaming

```typescript
async function* streamComplete(prompt: string, model: string) {
  const stream = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    stream: true
  });
  
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}

// Usage
for await (const text of streamComplete('Tell me a story', 'anthropic/claude-3-haiku')) {
  process.stdout.write(text);
}
```

### Model Selection Logic

```typescript
interface ModelConfig {
  name: string;
  costPer1k: number;
  maxContext: number;
  speed: 'fast' | 'medium' | 'slow';
  quality: 'high' | 'medium' | 'low';
}

const models: Record<string, ModelConfig> = {
  'anthropic/claude-3-opus': {
    name: 'Claude 3 Opus',
    costPer1k: 0.015,
    maxContext: 200000,
    speed: 'slow',
    quality: 'high'
  },
  'anthropic/claude-3-haiku': {
    name: 'Claude 3 Haiku',
    costPer1k: 0.00025,
    maxContext: 200000,
    speed: 'fast',
    quality: 'medium'
  },
  // ... more models
};

function selectModel(requirements: {
  budgetPer1k: number;
  minQuality: 'high' | 'medium' | 'low';
  contextNeeded: number;
}): string {
  const suitable = Object.entries(models)
    .filter(([_, config]) => {
      return config.costPer1k <= requirements.budgetPer1k &&
             qualityRank(config.quality) >= qualityRank(requirements.minQuality) &&
             config.maxContext >= requirements.contextNeeded;
    })
    .sort((a, b) => a[1].costPer1k - b[1].costPer1k);
    
  return suitable[0]?.[0] || 'anthropic/claude-3-haiku';
}
```

## Cost Optimization Strategies

### 1. Tiered Model Usage

```typescript
async function smartComplete(prompt: string, complexity: 'simple' | 'medium' | 'complex') {
  const model = {
    simple: 'anthropic/claude-3-haiku',      // $0.25/1M
    medium: 'anthropic/claude-3-sonnet',     // $3/1M
    complex: 'anthropic/claude-3-opus'       // $15/1M
  }[complexity];
  
  return complete(prompt, model);
}
```

### 2. Automatic Fallback

```typescript
async function completeWithFallback(prompt: string, models: string[]) {
  for (const model of models) {
    try {
      return await complete(prompt, model);
    } catch (error) {
      console.warn(`Model ${model} failed, trying next...`);
    }
  }
  throw new Error('All models failed');
}

// Usage
const result = await completeWithFallback(prompt, [
  'anthropic/claude-3-opus',
  'openai/gpt-4-turbo',
  'google/gemini-pro'
]);
```

### 3. Caching Responses

```typescript
import { createHash } from 'crypto';

const cache = new Map<string, string>();

async function cachedComplete(prompt: string, model: string) {
  const hash = createHash('sha256')
    .update(`${model}:${prompt}`)
    .digest('hex');
    
  if (cache.has(hash)) {
    return cache.get(hash);
  }
  
  const result = await complete(prompt, model);
  cache.set(hash, result);
  return result;
}
```

## Monitoring Usage

### Track Costs

```typescript
interface UsageLog {
  model: string;
  promptTokens: number;
  completionTokens: number;
  cost: number;
  timestamp: Date;
}

async function trackUsage(
  model: string, 
  usage: { prompt_tokens: number; completion_tokens: number }
) {
  const pricing = await getModelPricing(model);
  const cost = 
    (usage.prompt_tokens * pricing.promptCost) +
    (usage.completion_tokens * pricing.completionCost);
    
  await logUsage({
    model,
    promptTokens: usage.prompt_tokens,
    completionTokens: usage.completion_tokens,
    cost,
    timestamp: new Date()
  });
}
```

### Dashboard

Track:

- Total spend per day/week/month
- Cost per model
- Token usage patterns
- Success/failure rates

## Benefits We've Seen

### 1. Simplified Development

One SDK, one API key, one interface.

### 2. Cost Reduction

Smart model routing reduced our LLM costs by 40%.

### 3. Reliability

When one provider has issues, route to another.

### 4. Experimentation

Easy to try new models without new integrations.

---

*OpenRouter is central to our AI infrastructure. For how we orchestrate model selection, see [MCP Revolution](/blog/mcp-revolution-orchestrating-ai-services).*
