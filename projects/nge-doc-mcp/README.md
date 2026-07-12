# @cisstech/nge-doc-mcp

An [MCP](https://modelcontextprotocol.io) server that exposes a published
[nge-doc](https://cisstech.github.io/nge/docs/nge-doc) documentation site to AI
coding agents. Point it at a site's `nge-doc.json` and the agent can search the
docs and read pages while it works, instead of guessing at your API.

It reads the static outputs the docs builder already emits (`search.json` and
the raw markdown served in place), so there is no backend to host: the server
runs on the developer's machine and reads your public site.

## Tools

- `search_docs(query, limit?)` - best matching pages: slug, title, matched
  heading and an excerpt.
- `read_page(slug)` - the full markdown of a page.

## Use it

Add it to your agent's MCP configuration, passing the url of your site's
`nge-doc.json`:

```json
{
  "mcpServers": {
    "nge-doc": {
      "command": "npx",
      "args": ["-y", "@cisstech/nge-doc-mcp", "https://cisstech.github.io/nge/docs/nge-doc.json"]
    }
  }
}
```

The url is your site url followed by the docs root and `nge-doc.json` (the same
file your app passes to `docsFromManifest`).
