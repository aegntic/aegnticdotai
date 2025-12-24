---
title: 'RAG Implementation Guide: Retrieval-Augmented Generation Done Right'
description: 'Building effective RAG systems. Chunking strategies, embedding selection, retrieval optimization, and quality measurement.'
pubDate: 'Apr 05 2024'
heroImage: '../../assets/blog-placeholder-4.jpg'
tags: ['RAG', 'embeddings', 'AI', 'architecture', 'search']
---

# RAG Implementation Guide

RAG connects AI to your knowledge. Done poorly, it retrieves irrelevant content. Done well, it's transformative.

## The RAG Pipeline

```
Query → Embed → Search → Retrieve → Augment → Generate
```

Each step has optimization opportunities.

## Step 1: Chunking

### Bad Chunking

```python
# Fixed-size chunks ignore structure
chunks = [text[i:i+500] for i in range(0, len(text), 500)]
# Might split mid-sentence, mid-paragraph
```

### Good Chunking

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", ". ", " "]  # Respect structure
)
chunks = splitter.split_text(text)
```

### Chunk Size Trade-offs

| Size | Retrieval | Context | Recommendation |
|------|-----------|---------|----------------|
| 100 | Precise | Fragmented | Specific Q&A |
| 500 | Balanced | Coherent | General use |
| 1000 | Broader | Full context | Complex topics |

## Step 2: Embedding

### Model Selection

```python
# OpenAI (best quality, API cost)
from openai import OpenAI
embed = OpenAI().embeddings.create(model="text-embedding-3-small")

# Local (free, self-hosted)
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
```

### Embedding Comparison

| Model | Dimensions | Quality | Speed |
|-------|-----------|---------|-------|
| text-embedding-3-large | 3072 | Excellent | API |
| text-embedding-3-small | 1536 | Very good | API |
| nomic-embed-text | 768 | Good | Fast |
| all-MiniLM-L6-v2 | 384 | Adequate | Very fast |

## Step 3: Vector Store

```python
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.create_collection(
    name="documents",
    metadata={"hnsw:space": "cosine"}
)

# Store chunks with metadata
collection.add(
    ids=[f"chunk_{i}" for i in range(len(chunks))],
    documents=chunks,
    embeddings=embeddings,
    metadatas=[{"source": doc.source, "page": i} for i, _ in enumerate(chunks)]
)
```

## Step 4: Retrieval

### Basic Retrieval

```python
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5
)
```

### Advanced Retrieval

```python
# Hybrid search: semantic + keyword
def hybrid_search(query: str, k: int = 5):
    semantic = vector_search(query, k=k*2)
    keyword = bm25_search(query, k=k*2)
    
    # Reciprocal Rank Fusion
    fused = reciprocal_rank_fusion(semantic, keyword)
    return fused[:k]
```

## Step 5: Augmentation

```python
def build_prompt(query: str, retrieved: list[str]) -> str:
    context = "\n\n".join([
        f"[Document {i+1}]: {doc}" 
        for i, doc in enumerate(retrieved)
    ])
    
    return f"""Answer based on the provided documents only.
    
Documents:
{context}

Question: {query}

Instructions:
- Use only information from the documents
- Cite document numbers [1], [2], etc.
- Say "not found in documents" if unsure
"""
```

## Quality Measurement

```python
def evaluate_rag(test_set: list[dict]) -> dict:
    metrics = {
        'retrieval_precision': [],
        'answer_accuracy': [],
        'faithfulness': []
    }
    
    for case in test_set:
        retrieved = retrieve(case['query'])
        answer = generate(case['query'], retrieved)
        
        # Does retrieved content contain the answer?
        metrics['retrieval_precision'].append(
            any(case['answer_source'] in r for r in retrieved)
        )
        
        # Is the answer correct?
        metrics['answer_accuracy'].append(
            case['expected'] in answer
        )
        
    return {k: sum(v)/len(v) for k, v in metrics.items()}
```

## Common Pitfalls

1. **Too small chunks** → Lost context
2. **Too large chunks** → Irrelevant content retrieved
3. **No overlap** → Information at boundaries lost
4. **Wrong embedding model** → Poor semantic matching
5. **No reranking** → Good documents ranked low

---

*RAG is central to knowledge-augmented AI. See [ElastranAI](/blog/elastranai-elastic-ai-assistant) for our implementation.*
