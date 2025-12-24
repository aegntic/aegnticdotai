---
title: 'Multi-Modal AI: Images, Audio, and Video with LLMs'
description: 'Building applications that understand multiple content types. Vision models, audio processing, and unified multi-modal workflows.'
pubDate: 'Mar 20 2024'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['multi-modal', 'vision', 'audio', 'AI', 'LLMs']
---

# Multi-Modal AI Applications

Text-only AI is limiting. Real applications need to see images, hear audio, and process video.

Multi-modal AI bridges these gaps.

## Vision: Understanding Images

### Image Description

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Describe this image in detail.' },
      { 
        type: 'image_url', 
        image_url: { url: `data:image/jpeg;base64,${base64Image}` }
      }
    ]
  }]
});
```

### Document Analysis

```typescript
async function extractFromDocument(imagePath: string) {
  const image = await fs.readFile(imagePath);
  const base64 = image.toString('base64');
  
  return openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: 'Extract all text and data from this document as structured JSON.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${base64}` }}
      ]
    }]
  });
}
```

## Audio: Speech and Sound

### Transcription

```typescript
const transcription = await openai.audio.transcriptions.create({
  file: fs.createReadStream('audio.mp3'),
  model: 'whisper-1',
  response_format: 'verbose_json'
});
// Returns: { text, segments, words }
```

### Text-to-Speech

```typescript
const speech = await openai.audio.speech.create({
  model: 'tts-1-hd',
  voice: 'nova',
  input: 'Hello, this is generated speech.'
});

await fs.writeFile('output.mp3', Buffer.from(await speech.arrayBuffer()));
```

### Audio Analysis

```typescript
async function analyzeAudio(audioPath: string) {
  // Transcribe first
  const transcript = await transcribe(audioPath);
  
  // Analyze with LLM
  return llm.complete(`
    Analyze this audio transcript:
    ${transcript.text}
    
    Identify: speaker sentiment, key topics, action items
  `);
}
```

## Video: Frame-by-Frame Understanding

### Video Processing Pipeline

```typescript
async function analyzeVideo(videoPath: string) {
  // Extract key frames
  const frames = await extractKeyFrames(videoPath, { interval: 5 }); // every 5 seconds
  
  // Analyze each frame
  const frameAnalyses = await Promise.all(
    frames.map((frame, i) => 
      analyzeImage(frame, `Frame at ${i * 5} seconds`)
    )
  );
  
  // Synthesize understanding
  return llm.complete(`
    Video analysis from ${frames.length} frames:
    ${frameAnalyses.join('\n')}
    
    Provide: overall summary, key events, timeline
  `);
}

async function extractKeyFrames(videoPath: string, options: { interval: number }) {
  // Use ffmpeg
  await execAsync(`ffmpeg -i ${videoPath} -vf fps=1/${options.interval} frame_%d.jpg`);
  // Return frame paths
}
```

## Unified Multi-Modal Processing

### Content Type Detection

```typescript
async function processContent(input: Buffer | string) {
  const type = await detectContentType(input);
  
  switch (type) {
    case 'text':
      return processText(input as string);
    case 'image':
      return processImage(input as Buffer);
    case 'audio':
      return processAudio(input as Buffer);
    case 'video':
      return processVideo(input as Buffer);
    default:
      throw new Error(`Unsupported content type: ${type}`);
  }
}
```

### Multi-Modal RAG

```typescript
async function multiModalSearch(query: string, collection: MultiModalCollection) {
  // Search across modalities
  const textResults = await searchText(query, collection.texts);
  const imageResults = await searchImages(query, collection.images);
  const audioResults = await searchAudio(query, collection.audio);
  
  // Rank and merge
  return mergeResults(textResults, imageResults, audioResults);
}
```

## Model Capabilities

| Model | Text | Image | Audio | Video |
|-------|------|-------|-------|-------|
| GPT-4o | ✅ | ✅ | ✅ | Frames |
| Claude 3 | ✅ | ✅ | ❌ | Frames |
| Gemini Pro | ✅ | ✅ | ✅ | ✅ |
| Whisper | ❌ | ❌ | ✅ | ❌ |

## Best Practices

1. **Compress images** before sending (quality/cost trade-off)
2. **Extract audio** from video for transcription
3. **Sample frames** don't send every video frame
4. **Combine modalities** for richer understanding
5. **Cache processed results** multi-modal is expensive

---

*Multi-modal capabilities power our content processing. See [Protocol Flow](/blog/protocol-flow-video-processing) for video automation.*
