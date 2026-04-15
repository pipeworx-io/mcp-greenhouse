interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * Greenhouse MCP Pack — wraps the Greenhouse Harvest API v1
 *
 * BYO key: _apiKey = Harvest API key.
 * Auth: Basic auth with apiKey as username, empty password.
 * Tools: list/get candidates, list/get jobs, list applications.
 */


const API = 'https://harvest.greenhouse.io/v1';

async function ghFetch(apiKey: string, path: string): Promise<unknown> {
  const credentials = btoa(`${apiKey}:`);
  const res = await fetch(`${API}${path}`, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Greenhouse API error (${res.status}): ${text}`);
  }
  return res.json();
}

const tools: McpToolExport['tools'] = [
  {
    name: 'greenhouse_list_candidates',
    description: 'List candidates from Greenhouse ATS.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Greenhouse Harvest API key' },
        per_page: { type: 'number', description: 'Results per page (max 500, default 50)' },
        page: { type: 'number', description: 'Page number (default 1)' },
      },
      required: ['_apiKey'],
    },
  },
  {
    name: 'greenhouse_get_candidate',
    description: 'Get a single candidate by ID from Greenhouse.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Greenhouse Harvest API key' },
        id: { type: 'number', description: 'Candidate ID' },
      },
      required: ['_apiKey', 'id'],
    },
  },
  {
    name: 'greenhouse_list_jobs',
    description: 'List jobs from Greenhouse ATS.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Greenhouse Harvest API key' },
        status: { type: 'string', description: 'Filter by status: open, closed, draft (optional)' },
        per_page: { type: 'number', description: 'Results per page (max 500, default 50)' },
        page: { type: 'number', description: 'Page number (default 1)' },
      },
      required: ['_apiKey'],
    },
  },
  {
    name: 'greenhouse_get_job',
    description: 'Get a single job by ID from Greenhouse.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Greenhouse Harvest API key' },
        id: { type: 'number', description: 'Job ID' },
      },
      required: ['_apiKey', 'id'],
    },
  },
  {
    name: 'greenhouse_list_applications',
    description: 'List job applications from Greenhouse ATS.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Greenhouse Harvest API key' },
        job_id: { type: 'number', description: 'Filter by job ID (optional)' },
        status: { type: 'string', description: 'Filter by status: active, converted, hired, rejected (optional)' },
        per_page: { type: 'number', description: 'Results per page (max 500, default 50)' },
        page: { type: 'number', description: 'Page number (default 1)' },
      },
      required: ['_apiKey'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const apiKey = args._apiKey as string;

  switch (name) {
    case 'greenhouse_list_candidates': {
      const perPage = (args.per_page as number) ?? 50;
      const page = (args.page as number) ?? 1;
      return ghFetch(apiKey, `/candidates?per_page=${perPage}&page=${page}`);
    }

    case 'greenhouse_get_candidate': {
      const id = args.id as number;
      return ghFetch(apiKey, `/candidates/${id}`);
    }

    case 'greenhouse_list_jobs': {
      const perPage = (args.per_page as number) ?? 50;
      const page = (args.page as number) ?? 1;
      let path = `/jobs?per_page=${perPage}&page=${page}`;
      if (args.status) path += `&status=${args.status as string}`;
      return ghFetch(apiKey, path);
    }

    case 'greenhouse_get_job': {
      const id = args.id as number;
      return ghFetch(apiKey, `/jobs/${id}`);
    }

    case 'greenhouse_list_applications': {
      const perPage = (args.per_page as number) ?? 50;
      const page = (args.page as number) ?? 1;
      let path = `/applications?per_page=${perPage}&page=${page}`;
      if (args.job_id) path += `&job_id=${args.job_id as number}`;
      if (args.status) path += `&status=${args.status as string}`;
      return ghFetch(apiKey, path);
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 10 } } satisfies McpToolExport;
