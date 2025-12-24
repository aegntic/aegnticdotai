---
title: 'MCP Server Collection: 7+ Connectors Ready for Integration'
description: 'Building a library of reusable MCP servers. From GitHub to Notion to n8n - connectors that work out of the box.'
pubDate: 'Sep 01 2024'
heroImage: '../../assets/blog-placeholder-1.jpg'
tags: ['MCP', 'connectors', 'integration', 'development', 'tools']
---

# MCP Server Collection: Ready-Made Connectors

Instead of building the same integrations over and over, we built them once—correctly.

The MCP Server Collection provides 7+ battle-tested connectors for common services.

## Why a Collection?

Every project needs:

- Data from external services
- Actions on external platforms
- Consistent error handling
- Proper authentication

Building this for every project is wasteful. One excellent implementation, used everywhere.

## Available Connectors

### 1. GitHub Server

Full GitHub API access:

```typescript
// Available tools
tools: [
  'create_repository',
  'list_repositories', 
  'get_file_contents',
  'create_or_update_file',
  'push_files',
  'create_issue',
  'list_issues',
  'create_pull_request',
  'merge_pull_request',
  'search_code',
  'search_repositories',
  'get_commits'
]
```

Usage:

```
"Create an issue in my-repo titled 'Bug in authentication'"
→ Uses github.create_issue tool
→ Returns issue URL
```

### 2. Notion Server

Notion workspace integration:

```typescript
tools: [
  'search_pages',
  'get_page',
  'create_page',
  'update_page',
  'get_database',
  'query_database',
  'create_database_item'
]
```

Usage:

```
"Add this task to my Projects database"
→ Uses notion.create_database_item
→ Returns new page link
```

### 3. n8n Server

Workflow automation control:

```typescript
tools: [
  'list_workflows',
  'get_workflow',
  'execute_workflow',
  'create_workflow',
  'activate_workflow',
  'deactivate_workflow',
  'get_executions'
]
```

Usage:

```
"Run the 'daily-report' workflow"
→ Uses n8n.execute_workflow
→ Returns execution status
```

### 4. Supabase Server

Database and auth operations:

```typescript
tools: [
  'query_table',
  'insert_row',
  'update_row',
  'delete_row',
  'call_function',
  'get_user',
  'list_users'
]
```

### 5. Docker Server

Container management:

```typescript
tools: [
  'list_containers',
  'start_container',
  'stop_container',
  'get_logs',
  'exec_command',
  'list_images',
  'pull_image'
]
```

### 6. Puppeteer/Playwright Server

Browser automation:

```typescript
tools: [
  'navigate',
  'screenshot',
  'click',
  'type',
  'evaluate',
  'wait_for_selector',
  'get_content'
]
```

### 7. Exa Search Server

Web search integration:

```typescript
tools: [
  'search_web',
  'find_similar',
  'get_contents'
]
```

## Architecture Pattern

Each server follows a consistent structure:

```
mcp-server-{name}/
├── src/
│   ├── index.ts       # Server entry point
│   ├── tools/         # Tool implementations
│   │   ├── create.ts
│   │   ├── read.ts
│   │   ├── update.ts
│   │   └── delete.ts
│   ├── types.ts       # TypeScript definitions
│   └── utils.ts       # Shared utilities
├── package.json
├── README.md
└── tests/
    └── tools.test.ts
```

### Standard Interface

```typescript
interface MCPServer {
  name: string;
  version: string;
  
  // Discovery
  listTools(): Tool[];
  listResources(): Resource[];
  
  // Execution
  executeTool(name: string, args: object): Promise<Result>;
  getResource(uri: string): Promise<Content>;
}
```

### Consistent Error Handling

```typescript
class MCPError extends Error {
  code: string;
  recoverable: boolean;
  suggestion: string;
  
  constructor(code: string, message: string, options?: {
    recoverable?: boolean;
    suggestion?: string;
  }) {
    super(message);
    this.code = code;
    this.recoverable = options?.recoverable ?? true;
    this.suggestion = options?.suggestion ?? '';
  }
}

// Standard error codes
const ErrorCodes = {
  AUTH_FAILED: 'auth_failed',
  NOT_FOUND: 'not_found',
  RATE_LIMITED: 'rate_limited',
  INVALID_INPUT: 'invalid_input',
  SERVICE_UNAVAILABLE: 'service_unavailable'
};
```

## Configuration

### Environment Variables

Each server uses standard env var patterns:

```bash
# GitHub
GITHUB_TOKEN=ghp_...

# Notion
NOTION_API_KEY=secret_...

# n8n
N8N_HOST=http://localhost:5678
N8N_API_KEY=...

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=...
```

### MCP Configuration

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@smithery/cli@latest", "run", "@smithery-ai/github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
      }
    }
  }
}
```

## Quality Standards

Every server in the collection meets:

### Testing

- Unit tests for all tools
- Integration tests with mock services
- End-to-end tests against real APIs

### Documentation

- README with setup instructions
- Tool descriptions with examples
- Error code reference
- Rate limit guidance

### Performance

- Connection pooling where applicable
- Request batching for bulk operations
- Caching for repeated queries

### Security

- No credential logging
- Secure storage recommendations
- Scope limitation guidance

## Fivetran Integration Potential

The collection was designed with data integration in mind:

```typescript
// Each server can act as a Fivetran connector
interface FivetranAdapter {
  // Schema discovery
  getSchema(): SchemaDefinition;
  
  // Incremental sync
  sync(since: Date): SyncResult;
  
  // Full sync
  fullSync(): SyncResult;
}
```

## Usage Examples

### Research Workflow

```
1. Exa search for topic
2. Puppeteer to extract full content
3. Notion to store research notes
4. GitHub to commit findings
```

### Automation Chain

```
1. GitHub webhook detects new issue
2. n8n workflow triggered
3. Notion task created
4. Docker container spun up for processing
```

## Lessons Learned

### 1. Consistent Patterns Win

Users can learn one server and transfer knowledge to all others.

### 2. Documentation Is Critical

Without clear examples, even excellent tools are unused.

### 3. Error Messages Matter

"Failed" is useless. "Rate limited, retry in 60 seconds" is helpful.

### 4. Version Pinning Is Essential

Breaking changes in dependencies cause cascading failures.

## Future Additions

**Planned connectors**:

- Slack
- Discord
- Linear
- Jira
- Google Workspace
- AWS services

---

*The MCP Server Collection is part of our integration infrastructure. For the orchestration layer, see [MCP Revolution](/blog/mcp-revolution-orchestrating-ai-services).*
