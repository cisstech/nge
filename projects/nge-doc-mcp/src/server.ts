import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { NgeDocClient } from './docs-client.js'

/**
 * Builds the MCP server exposing an nge-doc site through two tools: `search_docs`
 * (over the build-time index) and `read_page` (the raw markdown). The transport
 * is wired by the caller, so the server is easy to embed or test.
 */
export function createNgeDocServer(client: NgeDocClient, options: { name?: string; version?: string } = {}): McpServer {
  const server = new McpServer({ name: options.name ?? 'nge-doc', version: options.version ?? '0.0.0' })

  server.registerTool(
    'search_docs',
    {
      title: 'Search the documentation',
      description:
        'Search the documentation site by keyword. Returns the best matching pages with their slug, title, matched heading and an excerpt. Use read_page with a slug to get the full content.',
      inputSchema: {
        query: z.string().describe('Free-text query, matched against titles, headings and content.'),
        limit: z.number().int().min(1).max(50).optional().describe('Maximum results to return (default 10).'),
      },
    },
    async ({ query, limit }) => ({
      content: [{ type: 'text', text: JSON.stringify(await client.search(query, limit ?? 10), null, 2) }],
    })
  )

  server.registerTool(
    'read_page',
    {
      title: 'Read a documentation page',
      description: 'Fetch the full markdown of a documentation page by its slug (as returned by search_docs).',
      inputSchema: {
        slug: z.string().describe('Page slug, e.g. /docs/nge-doc/getting-started (a #anchor is ignored).'),
      },
    },
    async ({ slug }) => {
      const markdown = await client.readPage(slug)
      return { content: [{ type: 'text', text: markdown ?? `No page found for "${slug}".` }] }
    }
  )

  return server
}
