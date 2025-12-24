---
title: 'Testing AI Applications: Strategies for Non-Deterministic Systems'
description: 'How to test systems where outputs vary. Property-based testing, fuzzy matching, and quality thresholds for AI-powered features.'
pubDate: 'May 10 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
tags: ['testing', 'AI', 'quality', 'development', 'patterns']
---

# Testing AI Applications

Traditional testing: given input X, expect output Y.

AI testing: given input X, expect output that satisfies properties P.

This is a fundamental shift.

## The Challenge

AI outputs are:

- **Non-deterministic**: Same input produces different outputs
- **Subjective**: "Good" is hard to define
- **Context-dependent**: Quality depends on use case
- **Evolving**: Model updates change behavior

Traditional assertion-based testing breaks immediately.

## Testing Strategies

### Strategy 1: Property-Based Testing

Instead of exact matches, test properties:

```typescript
describe('AI Summary', () => {
  it('produces summary shorter than input', async () => {
    const input = generateLongText(1000);
    const summary = await summarize(input);
    
    expect(summary.length).toBeLessThan(input.length);
  });
  
  it('preserves key entities', async () => {
    const input = "John Smith visited Paris in 2024.";
    const summary = await summarize(input);
    
    expect(summary.toLowerCase()).toContain('john');
    expect(summary.toLowerCase()).toMatch(/paris|france/);
  });
  
  it('produces valid JSON when requested', async () => {
    const result = await extractData(input, { format: 'json' });
    
    expect(() => JSON.parse(result)).not.toThrow();
  });
});
```

### Strategy 2: Fuzzy Matching

Allow approximate matches:

```typescript
import { similarity } from 'string-similarity';

function assertSimilar(actual: string, expected: string, threshold = 0.8) {
  const score = similarity.compareTwoStrings(actual, expected);
  
  if (score < threshold) {
    throw new Error(
      `Similarity ${score.toFixed(2)} below threshold ${threshold}\n` +
      `Expected: ${expected}\n` +
      `Actual: ${actual}`
    );
  }
}

it('generates expected content', async () => {
  const result = await generate('Write a haiku about coding');
  
  assertSimilar(result, expectedHaiku, 0.7);
});
```

### Strategy 3: Semantic Matching

Use embeddings to test meaning:

```typescript
async function assertSemanticallySimilar(
  actual: string, 
  expected: string,
  threshold = 0.85
) {
  const [actualEmbed, expectedEmbed] = await Promise.all([
    getEmbedding(actual),
    getEmbedding(expected)
  ]);
  
  const similarity = cosineSimilarity(actualEmbed, expectedEmbed);
  
  if (similarity < threshold) {
    throw new Error(
      `Semantic similarity ${similarity.toFixed(2)} below ${threshold}`
    );
  }
}

it('preserves meaning across reformulations', async () => {
  const original = "The cat sat on the mat";
  const reformulated = await rephrase(original);
  
  await assertSemanticallySimilar(reformulated, original);
});
```

### Strategy 4: Model-as-Judge

Use AI to evaluate AI:

```typescript
async function evaluateQuality(
  input: string,
  output: string,
  criteria: string[]
): Promise<number> {
  const prompt = `
    Evaluate this output on a scale of 1-10 for each criterion.
    
    Input: ${input}
    Output: ${output}
    
    Criteria:
    ${criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}
    
    Return JSON: { "scores": [1-10, ...], "explanation": "..." }
  `;
  
  const result = await evaluatorModel.complete(prompt);
  return average(JSON.parse(result).scores);
}

it('meets quality threshold', async () => {
  const result = await generateBlogPost('AI Testing');
  
  const score = await evaluateQuality(
    'Write about AI testing',
    result,
    ['Accuracy', 'Clarity', 'Completeness', 'Engagement']
  );
  
  expect(score).toBeGreaterThan(7.5);
});
```

### Strategy 5: Regression Testing

Detect when behavior changes:

```typescript
describe('Regression Tests', () => {
  const goldenInputs = loadGoldenInputs();
  
  for (const input of goldenInputs) {
    it(`produces acceptable output for: ${input.id}`, async () => {
      const output = await generate(input.prompt);
      
      // Check it's not wildly different from baseline
      const similarity = await semanticSimilarity(
        output, 
        input.baseline
      );
      
      expect(similarity).toBeGreaterThan(0.7);
      
      // Store for human review if significantly different
      if (similarity < 0.9) {
        await logForReview(input, output, similarity);
      }
    });
  }
});
```

### Strategy 6: Boundary Testing

Test limits and edge cases:

```typescript
describe('Boundary Tests', () => {
  it('handles empty input', async () => {
    const result = await summarize('');
    expect(result).toBeDefined();
  });
  
  it('handles maximum length input', async () => {
    const input = 'x'.repeat(100000);
    const result = await summarize(input);
    expect(result.length).toBeLessThan(input.length);
  });
  
  it('handles special characters', async () => {
    const input = 'Test with émojis 🎉 and "quotes"';
    const result = await process(input);
    expect(result).toBeDefined();
  });
  
  it('handles multilingual input', async () => {
    const input = 'Hello 你好 مرحبا';
    const result = await translate(input, 'english');
    expect(result.toLowerCase()).toContain('hello');
  });
});
```

## Quality Thresholds

### Define Acceptable Quality

```typescript
interface QualityThresholds {
  accuracy: number;      // % of correct outputs
  latency: number;       // Max time in ms
  costPerRequest: number; // Max cost
  failureRate: number;   // Max % of failures
}

const productionThresholds: QualityThresholds = {
  accuracy: 0.92,
  latency: 3000,
  costPerRequest: 0.05,
  failureRate: 0.01
};

describe('Production Readiness', () => {
  it('meets accuracy threshold', async () => {
    const results = await runBenchmark(testSet);
    expect(results.accuracy).toBeGreaterThan(productionThresholds.accuracy);
  });
  
  it('meets latency threshold', async () => {
    const results = await runBenchmark(testSet);
    expect(results.p95Latency).toBeLessThan(productionThresholds.latency);
  });
});
```

### Track Quality Over Time

```typescript
async function runQualityBenchmark() {
  const results = await Promise.all(
    benchmarkInputs.map(async input => {
      const start = Date.now();
      const output = await generate(input.prompt);
      const latency = Date.now() - start;
      
      const quality = await evaluateQuality(output);
      
      return { input, output, latency, quality };
    })
  );
  
  // Store metrics
  await storeMetrics({
    date: new Date(),
    modelVersion: getCurrentModelVersion(),
    accuracy: average(results.map(r => r.quality)),
    latency: {
      p50: percentile(results.map(r => r.latency), 50),
      p95: percentile(results.map(r => r.latency), 95),
      p99: percentile(results.map(r => r.latency), 99)
    }
  });
}
```

## Continuous Testing

### On Every Deploy

```yaml
# CI pipeline
test-ai-quality:
  runs-on: ubuntu-latest
  steps:
    - name: Run quality benchmark
      run: npm run test:ai:quality
      
    - name: Check quality regression
      run: npm run test:ai:regression
      
    - name: Upload results
      uses: actions/upload-artifact@v3
      with:
        name: quality-report
        path: reports/quality.json
```

### On Model Updates

```typescript
async function validateModelUpdate(
  oldModel: string,
  newModel: string,
  testSet: TestCase[]
) {
  const oldResults = await runBenchmark(testSet, oldModel);
  const newResults = await runBenchmark(testSet, newModel);
  
  // New model should not be significantly worse
  const qualityDelta = newResults.quality - oldResults.quality;
  
  if (qualityDelta < -0.05) {
    throw new Error(
      `Model quality decreased by ${Math.abs(qualityDelta * 100).toFixed(1)}%`
    );
  }
  
  return {
    approved: qualityDelta >= -0.02,
    qualityChange: qualityDelta,
    latencyChange: newResults.latency - oldResults.latency
  };
}
```

---

*Testing is essential for reliable AI systems. For quality frameworks, see [Quality Criteria Framework](/blog/quality-criteria-framework).*
