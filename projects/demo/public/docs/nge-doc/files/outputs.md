---
title: Outputs
description: What the docs builder emits, where, and how to opt out of each output.
---

# Outputs

The builder writes everything into `public/`, so the outputs are served with the app like
any other asset. Two families:

## Next to the docs (`<publicDir>/<root>/`)

| File | Role |
| --- | --- |
| `nge-doc.json` | The compiled manifest: navigation tree, titles, source paths, last-updated dates. The route's `docsFromManifest()` consumes it. |
| `search.json` | The content search index, chunked by heading. Enable it in the palette with `withSearchIndex()` (see [Search and SEO](/docs/nge-doc/guides/search-seo)). |

## At the site root (`<publicDir>/`), when `siteUrl` is set

| File | Role |
| --- | --- |
| `sitemap.xml` | One entry per page, with last-modified dates from git. |
| `robots.txt` | Allows crawling and points at the sitemap. |
| `llms.txt` | The [llms.txt](https://llmstxt.org) index: your navigation as a Markdown outline with absolute links. |
| `llms-full.txt` | The whole documentation concatenated, for tools that ingest a single file. |

## Opting out

Every output beyond the manifest has a flag, all `true` by default:

```json
"options": {
  "publicDir": "public",
  "root": "/docs",
  "name": "My docs",
  "siteUrl": "https://example.com",
  "sitemap": false,
  "robots": false,
  "llms": false,
  "search": false
}
```

Without `siteUrl`, the seo outputs are simply not produced (they need absolute urls).

## Version control

The outputs are derived from your Markdown; commit the sources, ignore the outputs:

```gitignore
public/docs/nge-doc.json
public/docs/search.json
public/sitemap.xml
public/robots.txt
public/llms.txt
public/llms-full.txt
```

Run `ng run my-app:docs` in CI before `ng build` so deploys always carry fresh outputs.
