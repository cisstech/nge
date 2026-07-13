#!/usr/bin/env node
import { createRequire } from 'node:module'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { NgeDocClient } from './docs-client.js'
import { createNgeDocServer } from './server.js'

const USAGE = `Usage: nge-doc-mcp <url-to-nge-doc.json>

Serves an nge-doc documentation site to an MCP client over stdio.

Example:
  nge-doc-mcp https://cisstech.github.io/nge/docs/nge-doc.json`

async function main(): Promise<void> {
  const manifestUrl = process.argv[2]
  if (!manifestUrl || manifestUrl === '--help' || manifestUrl === '-h') {
    console.error(USAGE)
    process.exit(manifestUrl ? 0 : 1)
  }

  let version = '0.0.0'
  try {
    version = createRequire(import.meta.url)('./package.json').version
  } catch {
    // Running from source or an unusual layout: the version stays a placeholder.
  }

  const server = createNgeDocServer(new NgeDocClient(manifestUrl), { version })
  await server.connect(new StdioServerTransport())
  // stdout is the MCP channel; logs go to stderr.
  console.error(`[nge-doc-mcp] serving ${manifestUrl}`)
}

main().catch((error) => {
  console.error(`[nge-doc-mcp] ${error instanceof Error ? error.message : error}`)
  process.exit(1)
})
