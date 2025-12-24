---
title: 'Supabase for AI Applications: Real-Time, Vector Search, and Auth'
description: 'Using Supabase as the database backbone for AI applications. PostgreSQL power, pgvector for embeddings, real-time subscriptions, and built-in auth.'
pubDate: 'Jun 25 2024'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['supabase', 'database', 'postgres', 'vector-search', 'AI']
---

# Supabase for AI Applications

Every AI application needs:

- Data storage
- User authentication
- Real-time updates
- Vector search for embeddings

Supabase provides all of these out of the box.

## Why Supabase?

### PostgreSQL Foundation

Full PostgreSQL power:

- Joins, CTEs, window functions
- Robust transactions
- JSON support
- Extensions ecosystem

### Built-in AI Features

- **pgvector**: Vector similarity search
- **Vault**: Secrets management
- **Edge Functions**: Serverless compute

### Developer Experience

- Instant APIs from schema
- Real-time subscriptions
- Row-level security
- Dashboard for everything

## Vector Search with pgvector

### Setup

```sql
-- Enable the extension
create extension if not exists vector;

-- Create a table with embeddings
create table documents (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(1536),  -- OpenAI dimension
  metadata jsonb,
  created_at timestamptz default now()
);

-- Create index for similarity search
create index on documents 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
```

### Storing Embeddings

```typescript
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(url, key);
const openai = new OpenAI();

async function storeDocument(content: string, metadata: object) {
  // Generate embedding
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: content
  });
  
  // Store with embedding
  const { data, error } = await supabase
    .from('documents')
    .insert({
      content,
      embedding: embedding.data[0].embedding,
      metadata
    });
    
  return data;
}
```

### Similarity Search

```typescript
async function searchSimilar(query: string, limit: number = 5) {
  // Generate query embedding
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: query
  });
  
  // Search by similarity
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding.data[0].embedding,
    match_threshold: 0.78,
    match_count: limit
  });
  
  return data;
}
```

```sql
-- Similarity search function
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
```

## Real-Time Subscriptions

### Subscribe to Changes

```typescript
const channel = supabase
  .channel('db-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'tasks' },
    (payload) => {
      console.log('Change received:', payload);
      updateUI(payload);
    }
  )
  .subscribe();
```

### Presence for Collaboration

```typescript
const room = supabase.channel('room:123');

room.on('presence', { event: 'sync' }, () => {
  const state = room.presenceState();
  updateOnlineUsers(state);
});

room.on('presence', { event: 'join' }, ({ key, newPresences }) => {
  showUserJoined(newPresences);
});

room.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    await room.track({ user_id: userId, name: userName });
  }
});
```

## Authentication

### Multiple Providers

```typescript
// Email/password
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
});

// OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: 'https://app.aegntic.ai/auth/callback'
  }
});

// Magic link
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com'
});
```

### Row-Level Security

```sql
-- Enable RLS
alter table documents enable row level security;

-- Users can only access their own documents
create policy "Users access own documents"
  on documents for all
  using (auth.uid() = user_id);
  
-- Or documents shared with them
create policy "Users access shared documents"
  on documents for select
  using (
    id in (
      select document_id from document_shares
      where user_id = auth.uid()
    )
  );
```

## Edge Functions

Serverless compute with Deno:

```typescript
// supabase/functions/process-document/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const { document_id } = await req.json();
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  // Process document
  const { data: doc } = await supabase
    .from('documents')
    .select('content')
    .eq('id', document_id)
    .single();
    
  const processed = await processWithAI(doc.content);
  
  // Store result
  await supabase
    .from('processed_documents')
    .insert({ document_id, result: processed });
    
  return new Response(JSON.stringify({ success: true }));
});
```

## Schema Design for AI Apps

### Document RAG System

```sql
-- Core tables
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  created_at timestamptz default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects not null,
  filename text not null,
  content text,
  metadata jsonb,
  created_at timestamptz default now()
);

create table document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents not null,
  chunk_index int not null,
  content text not null,
  embedding vector(1536),
  tokens int,
  created_at timestamptz default now()
);

-- Indexes
create index on document_chunks (document_id);
create index on document_chunks 
  using ivfflat (embedding vector_cosine_ops);
```

### Conversation History

```sql
create table conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  tokens int,
  created_at timestamptz default now()
);

-- Trigger to update conversation timestamp
create function update_conversation_timestamp()
returns trigger as $$
begin
  update conversations set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$ language plpgsql;

create trigger message_insert
  after insert on messages
  for each row execute function update_conversation_timestamp();
```

## Performance Tips

### Connection Pooling

Use connection pooler for serverless:

```typescript
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    db: {
      schema: 'public'
    },
    auth: {
      persistSession: false
    }
  }
);
```

### Batch Inserts

```typescript
// Insert many embeddings efficiently
const { data, error } = await supabase
  .from('document_chunks')
  .insert(chunks.map(chunk => ({
    document_id: docId,
    chunk_index: chunk.index,
    content: chunk.text,
    embedding: chunk.embedding,
    tokens: chunk.tokens
  })));
```

### Query Optimization

```sql
-- Use partial indexes
create index documents_active on documents (project_id)
where deleted_at is null;

-- Composite indexes for common queries
create index document_chunks_lookup 
on document_chunks (document_id, chunk_index);
```

---

*Supabase powers our data layer. For vector search applications, see [ElastranAI](/blog/elastranai-elastic-ai-assistant).*
