# mcp-greenhouse

Greenhouse MCP Pack — wraps the Greenhouse Harvest API v1

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `greenhouse_list_candidates` | List candidates from Greenhouse ATS. |
| `greenhouse_get_candidate` | Get a single candidate by ID from Greenhouse. |
| `greenhouse_list_jobs` | List jobs from Greenhouse ATS. |
| `greenhouse_get_job` | Get a single job by ID from Greenhouse. |
| `greenhouse_list_applications` | List job applications from Greenhouse ATS. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "greenhouse": {
      "url": "https://gateway.pipeworx.io/greenhouse/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use greenhouse
```

## License

MIT
