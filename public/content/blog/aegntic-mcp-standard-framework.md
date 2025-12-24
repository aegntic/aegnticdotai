---
title: 'The Aegntic MCP Standard Framework: Building Production-Ready MCP Servers'
description: 'A comprehensive framework for building MCP servers with modern auth, cloud-first design, auto-documentation, and integrated analytics.'
pubDate: 'Jul 30 2024'
heroImage: '../../assets/blog-placeholder-5.jpg'
tags: ['MCP', 'framework', 'standards', 'development', 'architecture']
---

# The Aegntic MCP Standard Framework

Every time we built an MCP server, we solved the same problems:

- Authentication
- Documentation
- Error handling
- Deployment
- Monitoring

So we built a framework that solves them once.

## Framework Overview

The Aegntic MCP Standard provides:

```
Aegntic MCP Standard
├── Authentication Layer
│   ├── GitHub OAuth
│   ├── RBAC (Role-Based Access Control)
│   └── API key management
├── Core Framework
│   ├── Declarative tool definitions
│   ├── Type-safe interfaces
│   └── Auto-generated documentation
├── Cloud-Native Deployment
│   ├── Cloudflare Workers
│   ├── PostgreSQL/Supabase
│   └── Docker images
├── Developer Experience
│   ├── Hot-reload development
│   ├── Local testing
│   └── Debug tooling
└── Operations
    ├── Analytics
    ├── Health monitoring
    └── CI/CD support
```

## Core Features

### 1. Unified Authentication

One auth configuration for all authentication methods:

```typescript
import { createAuth } from '@aegntic/mcp-framework';

const auth = createAuth({
  // OAuth for web flows
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  
  // API keys for programmatic access
  apiKeys: {
    headerName: 'X-API-Key',
    validator: async (key) => lookupKey(key),
  },
  
  // RBAC for authorization
  rbac: {
    roles: ['admin', 'user', 'viewer'],
    permissions: {
      admin: ['*'],
      user: ['read', 'write'],
      viewer: ['read']
    }
  }
});
```

### 2. Declarative Tool Definitions

Define tools without boilerplate:

```typescript
import { defineTool } from '@aegntic/mcp-framework';

export const createIssue = defineTool({
  name: 'create_issue',
  description: 'Create a GitHub issue',
  
  // Input schema with validation
  input: z.object({
    repo: z.string().describe('Repository name'),
    title: z.string().describe('Issue title'),
    body: z.string().optional().describe('Issue body'),
    labels: z.array(z.string()).optional()
  }),
  
  // Output schema for type safety
  output: z.object({
    id: z.number(),
    url: z.string(),
    created_at: z.string()
  }),
  
  // Authorization requirement
  requires: ['write'],
  
  // Implementation
  async handler(input, ctx) {
    const result = await ctx.github.issues.create({
      owner: ctx.user.org,
      repo: input.repo,
      title: input.title,
      body: input.body,
      labels: input.labels
    });
    
    return {
      id: result.data.id,
      url: result.data.html_url,
      created_at: result.data.created_at
    };
  }
});
```

### 3. Auto-Generated Documentation

Documentation is generated from tool definitions:

```markdown
## create_issue

Create a GitHub issue

### Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| repo | string | Yes | Repository name |
| title | string | Yes | Issue title |
| body | string | No | Issue body |
| labels | string[] | No | Labels to apply |

### Output

| Field | Type | Description |
|-------|------|-------------|
| id | number | Issue ID |
| url | string | Issue URL |
| created_at | string | Creation timestamp |

### Authorization

Requires: `write` permission

### Example

```json
{
  "repo": "my-repo",
  "title": "Bug in authentication",
  "body": "Details here..."
}
```

```

### 4. Cloud-Native Deployment

Deploy to Cloudflare Workers with zero configuration:

```typescript
// worker.ts
import { createWorkerHandler } from '@aegntic/mcp-framework/cloudflare';
import { server } from './server';

export default createWorkerHandler(server);
```

```toml
# wrangler.toml
name = "my-mcp-server"
main = "worker.ts"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "mcp-data"
```

### 5. Developer Experience

Hot-reload development server:

```bash
# Start development
npx @aegntic/mcp-framework dev

# Watch mode with type checking
npx @aegntic/mcp-framework dev --typecheck

# Debug mode with detailed logging
DEBUG=mcp:* npx @aegntic/mcp-framework dev
```

## Directory Structure

```
my-mcp-server/
├── src/
│   ├── index.ts           # Server entry
│   ├── tools/             # Tool definitions
│   │   ├── create.ts
│   │   ├── read.ts
│   │   └── index.ts
│   ├── resources/         # Resource handlers
│   │   └── index.ts
│   ├── auth/              # Auth configuration
│   │   └── index.ts
│   └── types.ts           # Type definitions
├── docs/                  # Auto-generated docs
├── tests/
│   ├── tools.test.ts
│   └── integration.test.ts
├── package.json
├── tsconfig.json
└── wrangler.toml          # Cloudflare config
```

## Built-In Analytics

Track usage without additional setup:

```typescript
import { analytics } from '@aegntic/mcp-framework';

// Automatic tracking
// - Tool invocations
// - Latency percentiles
// - Error rates
// - User activity

// Access analytics data
const stats = await analytics.getSummary({
  period: 'last_7_days',
  groupBy: 'tool'
});
```

Dashboard shows:

- Requests/minute
- Error rate
- P50/P95/P99 latency
- Top users
- Most-used tools

## Error Handling

Consistent error responses:

```typescript
import { MCPError, ErrorCode } from '@aegntic/mcp-framework';

throw new MCPError(
  ErrorCode.VALIDATION_ERROR,
  'Repository name cannot be empty',
  {
    field: 'repo',
    suggestion: 'Use format: owner/repo'
  }
);

// Response format
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Repository name cannot be empty",
    "details": {
      "field": "repo",
      "suggestion": "Use format: owner/repo"
    }
  }
}
```

## Testing

Built-in test utilities:

```typescript
import { createTestClient } from '@aegntic/mcp-framework/testing';
import { server } from '../src';

describe('create_issue', () => {
  const client = createTestClient(server, {
    mockAuth: { role: 'user' }
  });
  
  it('creates issue successfully', async () => {
    const result = await client.execute('create_issue', {
      repo: 'test-repo',
      title: 'Test issue'
    });
    
    expect(result.id).toBeDefined();
    expect(result.url).toContain('github.com');
  });
  
  it('requires write permission', async () => {
    const viewerClient = createTestClient(server, {
      mockAuth: { role: 'viewer' }
    });
    
    await expect(
      viewerClient.execute('create_issue', { ... })
    ).rejects.toThrow('Insufficient permissions');
  });
});
```

## Migration Guide

Migrate existing MCP servers:

### Before (Raw Implementation)

```typescript
// 100+ lines of boilerplate
const server = new MCPServer();

server.setRequestHandler(ListToolsRequestSchema, () => ({
  tools: [
    {
      name: 'create_issue',
      description: 'Create issue',
      inputSchema: { ... }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'create_issue') {
    // Validation...
    // Auth check...
    // Implementation...
    // Error handling...
  }
});
```

### After (Framework)

```typescript
// 20 lines, all focused on business logic
import { createServer, defineTool } from '@aegntic/mcp-framework';

const createIssue = defineTool({
  name: 'create_issue',
  input: z.object({ ... }),
  handler: async (input, ctx) => { ... }
});

export const server = createServer({
  tools: [createIssue],
  auth: authConfig
});
```

---

*The Aegntic MCP Standard powers our server collection. For examples, see [MCP Server Collection](/blog/mcp-server-collection).*
