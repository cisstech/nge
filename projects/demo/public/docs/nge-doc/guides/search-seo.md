---
order: 4
title: Search and SEO
description: The command palette, the build-time content index, meta tags, edit links and the AI-friendly outputs.
---

# Search and SEO

## Search

The command palette (`Cmd/Ctrl+K`) works with **zero configuration**: it searches page
titles from the navigation tree, in memory.

To search full page content, enable the build-time index the
[docs builder](/docs/nge-doc/files/outputs) emits:

```typescript
provideNgeDoc(withSearchIndex('docs/search.json'))
```

Results become one row per page with the matched section, a highlighted excerpt, and a
deep link to the heading. The index is fetched lazily on the first search, so prerendered
pages do not carry it.

Something else entirely (a hosted search, another index)? Provide your own backend
through the `NGE_DOC_SEARCH_PROVIDER` token; the palette UI stays.

## SEO tags

On every navigation the engine sets the document title (`Page · Site`), the meta
description, and the Open Graph and Twitter tags, from the link or the page's
[frontmatter](/docs/nge-doc/files/authoring). Add your site url to emit the canonical url
and absolute social images:

```typescript
provideNgeDoc(withSeo({ url: 'https://example.com', image: 'assets/social.png' }))
```

A page can override the social image with `image:` in its frontmatter.

## Edit links and dates

Point `withEditLink()` at your repository's edit url and every file-based page grows an
"Edit this page" link, built from its source path. The compiler also records each page's
last commit date, shown next to it.

```typescript
provideNgeDoc(withEditLink('https://github.com/me/my-lib/edit/main/public/docs'))
```

## AI-friendly by default

Documentation is read by people and ingested by tools. File-based sites get both
audiences for free:

- **Raw Markdown served in place**: every page at `<url>.md`, wired to the
  "Copy as Markdown", "Open in ChatGPT" and "Open in Claude" page actions.
- **`llms.txt` and `llms-full.txt`** at the site root when `siteUrl` is set (see
  [Outputs](/docs/nge-doc/files/outputs)).
- **`sitemap.xml` and `robots.txt`** for classic crawlers.

For agents that code against your library, the [MCP server](/docs/nge-doc/guides/mcp)
serves this same content on demand through the Model Context Protocol.
