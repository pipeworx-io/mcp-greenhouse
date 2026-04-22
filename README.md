# mcp-greenhouse

Greenhouse MCP Pack — wraps the Greenhouse Harvest API v1

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `greenhouse_list_candidates` | Search candidates in your ATS. Returns names, IDs, email addresses, and application status. Use greenhouse_get_candidate for full profile details. |
| `greenhouse_get_candidate` | Get full candidate profile by ID. Returns resume, contact info, application history, interviews, and notes. |
| `greenhouse_list_jobs` | Browse open and closed job postings. Returns titles, IDs, departments, statuses, and posting dates. Use greenhouse_get_job for full details and candidate pipeline. |
| `greenhouse_get_job` | Get complete job details by ID. Returns description, requirements, hiring team, and linked applications. |
| `greenhouse_list_applications` | View job applications across your pipeline. Returns applicant names, job IDs, application status, and submission dates. Filter by job or stage (e.g., \'screening\', \'interview\'). |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "greenhouse": {
      "url": "https://gateway.pipeworx.io/greenhouse/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Greenhouse data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
