---
order: 7
title: MCP server
description: Let AI coding agents search and read your published docs through the Model Context Protocol.
---

# MCP server

Developers using your library increasingly code with an AI agent (Cursor, Claude
Code, ...). `@cisstech/nge-doc-mcp` lets that agent search and read your
published documentation through the
[Model Context Protocol](https://modelcontextprotocol.io), so it works from your
real, current docs instead of guessing at your API.

It reads the static outputs the builder already emits, the
[search index and the raw markdown](/docs/nge-doc/files/outputs) served in
place, so there is no backend to run: the server runs on the developer's machine
and reads your public site.

## Wire it into an agent

Point it at the url of your site's `nge-doc.json` (your site url followed by the
docs root, the same file your app passes to `docsFromManifest`):

```json
{
  "mcpServers": {
    "nge-doc": {
      "command": "npx",
      "args": ["-y", "@cisstech/nge-doc-mcp", "https://example.com/docs/nge-doc.json"]
    }
  }
}
```

## Tools

- `search_docs(query, limit?)` returns the best matching pages, each with its
  slug, title, matched heading and an excerpt.
- `read_page(slug)` returns the full markdown of a page.

A typical exchange: the agent calls `search_docs` to find the relevant pages,
then `read_page` on a slug to pull the full content into its context.

## How it fits

Nothing to add to your site: publishing it with `search.json` (the default)
already makes this work. It complements the
[AI-friendly outputs](/docs/nge-doc/guides/search-seo) (`llms.txt`, raw markdown,
the "Open in ChatGPT / Claude" page actions), which target humans and one-shot
prompts, whereas the MCP server gives an agent live, on-demand access while it
codes.
