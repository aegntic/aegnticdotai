---
title: 'Prompt Engineering Fundamentals: From Basics to Production'
description: 'Essential prompt engineering patterns. Structure, context management, and techniques that consistently produce better outputs.'
pubDate: 'Apr 10 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
tags: ['prompts', 'AI', 'fundamentals', 'patterns', 'LLMs']
---

# Prompt Engineering Fundamentals

Good prompts aren't magic. They're engineering.

Consistent patterns produce consistent results.

## Core Principles

### 1. Be Specific

**Bad**: "Write about dogs"
**Good**: "Write a 200-word article about the health benefits of walking dogs, targeting first-time dog owners"

### 2. Provide Context

**Bad**: "Fix this code"
**Good**: "Fix this TypeScript function that should validate email addresses. It currently allows invalid formats like 'test@' through."

### 3. Define Format

**Bad**: "List some options"
**Good**: "List 5 options as a numbered list. Each item should have a title and one-sentence description."

### 4. Set Constraints

**Bad**: "Keep it short"
**Good**: "Maximum 3 paragraphs, each under 50 words"

## The RISEN Framework

**R**ole: Who should the AI be?
**I**nstructions: What should it do?
**S**teps: How should it proceed?
**E**nd goal: What's the desired output?
**N**arrowing: What constraints apply?

```
You are a senior software engineer (Role).

Review this code for security vulnerabilities (Instructions).

First, identify input validation issues. Then, check for injection risks. Finally, look for authentication bypasses (Steps).

Provide a prioritized list of issues with severity ratings and fixes (End goal).

Focus only on security, not style or performance (Narrowing).
```

## Template Patterns

### Few-Shot Learning

```
Convert measurements to metric:

Input: 5 feet
Output: 1.52 meters

Input: 10 pounds
Output: 4.54 kilograms

Input: 32 degrees Fahrenheit
Output: 0 degrees Celsius

Input: {{user_input}}
Output:
```

### Chain of Thought

```
Solve this step by step:

Problem: {{problem}}

Step 1: Identify what we know
Step 2: Identify what we need to find
Step 3: Apply relevant formulas
Step 4: Calculate the answer
Step 5: Verify by checking

Show your work for each step.
```

### Structured Output

```
Analyze this text and return JSON:

Text: {{input}}

Return exactly this structure:
{
  "sentiment": "positive" | "neutral" | "negative",
  "topics": ["string", ...],
  "summary": "One sentence summary",
  "confidence": 0.0-1.0
}
```

## Common Mistakes

1. **Vague instructions** → Ambiguous outputs
2. **No examples** → Inconsistent format
3. **Too many tasks** → Incomplete execution
4. **Missing constraints** → Verbose or wrong-length responses
5. **Assuming context** → AI doesn't know what you know

## Testing Prompts

```typescript
async function testPrompt(prompt: string, testCases: TestCase[]) {
  const results = await Promise.all(
    testCases.map(async (test) => {
      const output = await complete(prompt.replace('{{input}}', test.input));
      return {
        input: test.input,
        output,
        passed: test.validate(output)
      };
    })
  );
  
  const passRate = results.filter(r => r.passed).length / results.length;
  return { results, passRate };
}
```

Aim for 90%+ pass rate before production.

---

*Prompt engineering is foundational. See [PromptRequest](/blog/promptrequest-hackathon-to-platform) for our prompt management system.*
