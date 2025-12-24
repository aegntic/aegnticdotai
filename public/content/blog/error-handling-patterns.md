---
title: 'Error Handling That Helps: Designing Recoverable Failures'
description: 'Error messages should guide recovery, not just announce failure. Patterns for helpful error handling in AI applications.'
pubDate: 'May 15 2024'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['error-handling', 'UX', 'development', 'patterns', 'AI']
---

# Error Handling That Helps

"Error: Something went wrong."

This error message is useless. It tells you nothing about:

- What happened
- Why it happened
- How to fix it
- Whether it will happen again

Good error handling is a feature, not an afterthought.

## The Error Hierarchy

### Level 1: Detection

Know something is wrong:

```typescript
try {
  await processDocument(doc);
} catch (error) {
  // We know there's a problem
}
```

### Level 2: Classification

Know what kind of problem:

```typescript
catch (error) {
  if (error instanceof RateLimitError) { ... }
  if (error instanceof AuthError) { ... }
  if (error instanceof ValidationError) { ... }
}
```

### Level 3: Recovery

Know how to fix it:

```typescript
catch (error) {
  if (error instanceof RateLimitError) {
    await waitForReset(error.retryAfter);
    return processDocument(doc);  // Automatic retry
  }
}
```

### Level 4: Prevention

Know how to prevent it:

```typescript
// Don't even try if we're rate limited
if (await isRateLimited()) {
  await waitForReset();
}
await processDocument(doc);
```

## Error Message Anatomy

### Bad Error Message

```
Error: Request failed
```

### Good Error Message

```
RateLimitError: Too many requests (limit: 100/minute)

What happened: You've exceeded the API rate limit.
Why: Your current usage is 150 requests in the last minute.
How to fix: Wait 30 seconds before retrying.
Prevention: Use batch endpoints or implement request queuing.

Request ID: abc123 (include this if contacting support)
```

### Template

```typescript
interface HelpfulError {
  // Classification
  code: string;         // Machine-readable error code
  type: string;         // Human-readable type
  
  // Context
  message: string;      // What happened
  detail: string;       // Why it happened
  
  // Recovery
  suggestion: string;   // How to fix it
  retryable: boolean;   // Can this be retried?
  retryAfter?: number;  // When to retry
  
  // Debugging
  requestId?: string;   // For support
  timestamp: string;    // When it happened
  context?: object;     // Additional context
}
```

## Common Patterns

### Pattern 1: Graceful Degradation

```typescript
async function getAIResponse(prompt: string): Promise<string> {
  try {
    return await primaryModel.complete(prompt);
  } catch (error) {
    console.warn('Primary model failed, trying fallback');
    try {
      return await fallbackModel.complete(prompt);
    } catch (fallbackError) {
      return cachedFallbackResponse(prompt);
    }
  }
}
```

### Pattern 2: Progressive Retry

```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  options: { maxAttempts: number; backoff: 'linear' | 'exponential' }
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (!isRetryable(error)) {
        throw error;  // Don't retry non-transient errors
      }
      
      const delay = options.backoff === 'exponential' 
        ? Math.pow(2, attempt) * 1000
        : attempt * 1000;
        
      await sleep(delay);
    }
  }
  
  throw new MaxRetriesError(lastError, options.maxAttempts);
}
```

### Pattern 3: Error Boundaries

```typescript
class ErrorBoundary {
  async execute<T>(operation: () => Promise<T>): Promise<Result<T>> {
    try {
      const value = await operation();
      return { success: true, value };
    } catch (error) {
      return { 
        success: false, 
        error: this.normalize(error) 
      };
    }
  }
  
  private normalize(error: unknown): HelpfulError {
    if (error instanceof HelpfulError) {
      return error;
    }
    
    // Convert unknown errors to helpful format
    return new HelpfulError({
      code: 'UNKNOWN_ERROR',
      message: String(error),
      suggestion: 'Please contact support with the error details',
      retryable: false
    });
  }
}
```

### Pattern 4: Circuit Breaker

```typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailure?: Date;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (this.shouldTryAgain()) {
        this.state = 'half-open';
      } else {
        throw new CircuitOpenError('Service temporarily unavailable');
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }
  
  private onFailure() {
    this.failures++;
    this.lastFailure = new Date();
    
    if (this.failures >= 5) {
      this.state = 'open';
    }
  }
  
  private shouldTryAgain(): boolean {
    const elapsed = Date.now() - this.lastFailure.getTime();
    return elapsed > 30000;  // Try again after 30 seconds
  }
}
```

## AI-Specific Error Handling

### Token Limit Errors

```typescript
class TokenLimitError extends HelpfulError {
  constructor(requested: number, limit: number) {
    super({
      code: 'TOKEN_LIMIT_EXCEEDED',
      message: `Request would use ${requested} tokens, limit is ${limit}`,
      suggestion: 'Reduce input length or use a model with higher limits',
      retryable: false,
      context: { requested, limit }
    });
  }
}

// Prevention
function validateTokens(content: string, model: string): void {
  const tokens = countTokens(content);
  const limit = getModelLimit(model);
  
  if (tokens > limit) {
    throw new TokenLimitError(tokens, limit);
  }
}
```

### Rate Limit Errors

```typescript
class AIRateLimitError extends HelpfulError {
  constructor(limit: string, retryAfter: number) {
    super({
      code: 'RATE_LIMITED',
      message: `Rate limit exceeded: ${limit}`,
      suggestion: `Wait ${retryAfter}ms before retrying`,
      retryable: true,
      retryAfter
    });
  }
}
```

### Content Filter Errors

```typescript
class ContentFilterError extends HelpfulError {
  constructor(reason: string) {
    super({
      code: 'CONTENT_FILTERED',
      message: 'Content was blocked by safety filters',
      detail: reason,
      suggestion: 'Revise content to avoid triggering safety filters',
      retryable: false
    });
  }
}
```

## Logging Best Practices

### What to Log

```typescript
logger.error({
  // Identification
  errorCode: error.code,
  requestId: context.requestId,
  
  // Context
  userId: context.userId,
  operation: 'processDocument',
  input: sanitize(input),  // Never log sensitive data
  
  // Error details
  message: error.message,
  stack: error.stack,
  
  // Recovery
  retryable: error.retryable,
  attemptNumber: context.attempt,
  
  // Timing
  timestamp: new Date().toISOString(),
  duration: Date.now() - startTime
});
```

### What NOT to Log

- API keys or secrets
- Personal data (emails, names)
- Full request/response bodies
- Passwords or tokens

## Testing Error Paths

```typescript
describe('Error Handling', () => {
  it('retries on rate limit', async () => {
    const api = mockApi()
      .failOnce(new RateLimitError(60000))
      .succeedAfter();
      
    const result = await withRetry(() => api.call());
    
    expect(result).toBeDefined();
    expect(api.callCount).toBe(2);
  });
  
  it('gives up after max retries', async () => {
    const api = mockApi().alwaysFail(new TransientError());
    
    await expect(
      withRetry(() => api.call(), { maxAttempts: 3 })
    ).rejects.toThrow(MaxRetriesError);
    
    expect(api.callCount).toBe(3);
  });
  
  it('does not retry non-retryable errors', async () => {
    const api = mockApi().failOnce(new AuthError());
    
    await expect(
      withRetry(() => api.call())
    ).rejects.toThrow(AuthError);
    
    expect(api.callCount).toBe(1);
  });
});
```

---

*Good error handling is essential for reliable AI systems. For the methodologies we use to debug issues, see [FPEF Debugging Framework](/blog/fpef-debugging-framework).*
