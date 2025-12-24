---
title: 'TypeScript for AI Development: Type Safety Meets LLMs'
description: 'Why TypeScript is our primary language for AI applications. Type safety, better tooling, and patterns that prevent common mistakes.'
pubDate: 'Apr 15 2024'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['typescript', 'development', 'AI', 'patterns', 'tooling']
---

# TypeScript for AI Development

AI applications handle complex, dynamic data. Type safety prevents entire categories of bugs.

This is why 60% of our codebase is TypeScript.

## The Case for Types

### Before TypeScript

```javascript
async function processMessage(message) {
  const result = await ai.complete(message.content);
  return result.text; // What if result has no text?
}
```

### After TypeScript

```typescript
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponse {
  text: string;
  tokens: number;
  finishReason: 'stop' | 'length' | 'error';
}

async function processMessage(message: Message): Promise<AIResponse> {
  const result = await ai.complete(message.content);
  return result; // Compiler ensures shape
}
```

## Essential Patterns

### Discriminated Unions for AI Responses

```typescript
type AIResult = 
  | { success: true; text: string; tokens: number }
  | { success: false; error: string; retryable: boolean };

function handleResult(result: AIResult) {
  if (result.success) {
    console.log(result.text); // TypeScript knows text exists
  } else {
    console.error(result.error); // TypeScript knows error exists
  }
}
```

### Branded Types for Safety

```typescript
type TokenCount = number & { readonly brand: unique symbol };
type UserId = string & { readonly brand: unique symbol };

function countTokens(text: string): TokenCount {
  return encode(text).length as TokenCount;
}

// Prevents mixing up different number/string types
function processUser(userId: UserId, tokens: TokenCount) { }
```

### Zod for Runtime Validation

```typescript
import { z } from 'zod';

const AIResponseSchema = z.object({
  text: z.string(),
  tokens: z.number().int().positive(),
  model: z.enum(['gpt-4', 'claude-3', 'llama-3'])
});

type AIResponse = z.infer<typeof AIResponseSchema>;

async function safeApiCall(): Promise<AIResponse> {
  const raw = await fetch('/api/ai').then(r => r.json());
  return AIResponseSchema.parse(raw); // Throws if invalid
}
```

## Productivity Gains

| Metric | JavaScript | TypeScript |
|--------|------------|------------|
| Bug discovery | Runtime | Compile time |
| Refactoring | Scary | Confident |
| Documentation | Manual | Automatic |
| IDE support | Basic | Excellent |
| API integration | Error-prone | Type-safe |

## Our Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "exactOptionalPropertyTypes": true,
    "moduleResolution": "bundler",
    "target": "ES2022"
  }
}
```

Strict mode catches the bugs that matter.

---

*TypeScript is foundational to our development. See [Bun vs Node](/blog/bun-vs-node-runtime-switch) for our runtime choice.*
