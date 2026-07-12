---
title: Docs from files
description: Author Markdown under public/, compile it with the docs builder, and serve everything in place.
---

# Docs from files

The default workflow: your Markdown lives in the application's `public/` folder, is served
as-is, and a builder compiles the navigation and the indexes next to it. No copy step, no
post-build script.

## The layout

```
public/
  docs/                  <- your site, authored here, served here
    _meta.json           <- section order and titles
    index.md             <- landing page of the site root
    getting-started.md   <- a page: /docs/getting-started
    guides/              <- a folder: a section with children
      index.md           <- section landing: /docs/guides
      theming.md         <- /docs/guides/theming
    nge-doc.json         <- generated: the compiled manifest
    search.json          <- generated: the content search index
```

Every `.md` file becomes a page, folders become sections, and urls mirror the file tree.
The generated files are outputs; add them to `.gitignore` and rebuild them in CI.

## Compile

The `docs` target scans the folder and writes `nge-doc.json`:

```bash
ng run my-app:docs          # one shot
ng run my-app:docs --watch  # rebuild while writing
```

```json
"docs": {
  "builder": "@cisstech/nge:docs",
  "options": {
    "publicDir": "public",
    "root": "/docs",
    "name": "My docs",
    "siteUrl": "https://example.com"
  }
}
```

`siteUrl` is optional; setting it also emits `sitemap.xml`, `robots.txt` and the
`llms.txt` files (see [Outputs](/docs/nge-doc/files/outputs)).

## Serve

The route points the engine at the compiled manifest:

```typescript
data: docsFromManifest('docs/nge-doc.json')
```

At runtime the engine fetches the manifest, builds the navigation, and loads each page's
Markdown from its served url. Since sources are served in place, the raw Markdown of every
page is also directly reachable (`/docs/getting-started.md`), which powers the
"Copy as Markdown" and "Open in ChatGPT / Claude" page actions.

## Several sites

Repeat the recipe for each site (`public/guide`, `public/docs`...): one builder target per
site, and one `docsFromManifest()` entry per manifest in the route data array. Each site
keeps its own root url and sidebar; the header links them (see
[Theming](/docs/nge-doc/guides/theming)).

Next: [Authoring](/docs/nge-doc/files/authoring) for ordering, titles and frontmatter.
