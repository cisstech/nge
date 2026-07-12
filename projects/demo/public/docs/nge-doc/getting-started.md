---
title: Getting started with nge/doc
description: Build a documentation site for Angular from Markdown files or code, with navigation, search, dark mode, SEO and static generation handled for you.
---

# nge/doc

**nge/doc** turns a folder of Markdown files, or a route configuration, into a documentation
site like the one you are reading. The engine takes care of navigation, the table of
contents, breadcrumbs, previous/next links, dark mode, search, SEO and static generation,
so you focus on writing.

## Quickstart

```bash
ng add @cisstech/nge
```

The schematic scaffolds `public/docs/` with a first page, registers the `docs` builder
target and adds `provideNgeDoc()` to your configuration. Route the docs where you want
them:

```typescript
// app.routes.ts
import { docsFromManifest } from '@cisstech/nge/doc'

export const routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('@cisstech/nge/doc').then((m) => m.NGE_DOC_ROUTES),
    data: docsFromManifest('docs/nge-doc.json'),
  },
]
```

Compile the manifest and serve:

```bash
ng run my-app:docs
ng serve
```

`/docs` now renders your Markdown. Markdown rendering works out of the box; there is no
renderer to wire.

## Choose your path

- **[Docs from files](/docs/nge-doc/files)**, the default. Author Markdown under
  `public/docs/`, order sections with `_meta.json`, and let the builder compile the
  navigation, the search index and the SEO outputs. This is what `ng add` sets up and what
  this site uses.
- **[Docs from code](/docs/nge-doc/code-first)**. Declare pages as an `NgeDocSettings`
  object when the navigation is dynamic: pages fetched from an API, generated at runtime,
  or mixed with live components.

Both paths render through the same engine and can live side by side in one application.

## What you get

- **Markdown or components.** A page is a Markdown file, an inline Markdown string, or a
  lazy-loaded Angular component. Mix them freely, even inside a Markdown page.
- **Navigation for free.** Sidebar, table of contents with scroll spy, breadcrumbs and
  previous/next cards, all generated from your page tree.
- **Command palette.** `Cmd/Ctrl+K` searches titles by default, and full page content when
  the build-time index is enabled.
- **Dark mode.** Light, dark or auto, remembered across visits.
- **SEO and AI outputs.** Canonical, Open Graph and Twitter tags per page; `sitemap.xml`,
  `robots.txt`, `llms.txt` and per-page raw Markdown when a site url is configured.
- **Static generation.** Prerender every page with the `@cisstech/nge/doc/ssr` entry;
  interactive pages opt out with one line of frontmatter.
- **Pluggable themes and i18n.** Ship your own layout with `withTheme()`, reword or
  translate every label with `withLabels()`.

## Next steps

- [Installation](/docs/nge-doc/installation) for manual setup details.
- [Docs from files](/docs/nge-doc/files) to author your content.
- [Guides](/docs/nge-doc/guides/components) for components, static generation, theming,
  search and SEO.
- [Reference](/docs/nge-doc/reference) for every option in one place.
