---
title: 'Streaming LLM Responses: Real-Time AI Output'
description: 'Implementing streaming for AI responses. Server-sent events, WebSockets, and client-side handling for responsive UX.'
pubDate: 'Apr 01 2024'
heroImage: '../../assets/blog-placeholder-5.jpg'
tags: ['streaming', 'LLMs', 'real-time', 'development', 'UX']
---

# Streaming LLM Responses

Waiting 10 seconds for a response feels broken. Seeing words appear in real-time feels instant.

Same latency. Different perception.

## Why Streaming Matters

### Without Streaming

```
User sends query
        ↓
[10 second wait, showing spinner]
        ↓
Full response appears at once
```

### With Streaming

```
User sends query
        ↓
[Immediate: First tokens appear]
        ↓
[Content streams in word by word]
        ↓
Complete in same 10 seconds, but felt instant
```

## Server Implementation

### Using OpenAI SDK

```typescript
import OpenAI from 'openai';

const openai = new OpenAI();

async function* streamCompletion(prompt: string) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
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
```

### Express + SSE Endpoint

```typescript
app.post('/api/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const { prompt } = req.body;
  
  try {
    for await (const chunk of streamCompletion(prompt)) {
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
  }
  
  res.end();
});
```

### Cloudflare Workers

```typescript
export default {
  async fetch(request: Request): Promise<Response> {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    
    // Start streaming in background
    (async () => {
      for await (const chunk of streamCompletion(prompt)) {
        await writer.write(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
      }
      await writer.write(encoder.encode('data: [DONE]\n\n'));
      await writer.close();
    })();
    
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
      }
    });
  }
};
```

## Client Implementation

### Vanilla JavaScript

```javascript
async function streamResponse(prompt) {
  const response = await fetch('/api/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const text = decoder.decode(value);
    const lines = text.split('\n');
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') return;
        
        const { text } = JSON.parse(data);
        document.getElementById('output').textContent += text;
      }
    }
  }
}
```

### React Hook

```typescript
function useStreamedResponse() {
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  
  const stream = useCallback(async (prompt: string) => {
    setIsStreaming(true);
    setText('');
    
    const response = await fetch('/api/stream', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });
    
    const reader = response.body.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // Parse and update state
      const chunk = new TextDecoder().decode(value);
      // Parse SSE format...
      setText(prev => prev + parsedText);
    }
    
    setIsStreaming(false);
  }, []);
  
  return { text, isStreaming, stream };
}
```

## Error Handling

```typescript
async function* robustStream(prompt: string) {
  try {
    for await (const chunk of streamCompletion(prompt)) {
      yield { type: 'text', content: chunk };
    }
    yield { type: 'done' };
  } catch (error) {
    yield { type: 'error', error: error.message };
  }
}
```

## Performance Tips

1. **Buffer small chunks** - Don't update DOM per token
2. **Use requestAnimationFrame** - Smooth rendering
3. **Implement backpressure** - Don't overwhelm the client
4. **Add reconnection** - Handle dropped connections

---

*Streaming improves AI UX significantly. See [D3MO](/blog/d3mo-conversational-ai) for our conversational interface.*
