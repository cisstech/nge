---
title: Docs from code
description: Declare pages as data when the navigation is dynamic, generated or backed by an API.
---

# Docs from code

When pages cannot live as files, fetched from a CMS, generated at runtime, or computed
from your own data, declare them as an `NgeDocSettings` object and pass it through the
route `data`. Same engine, same theme, same features.

## Declare the pages

```typescript
// docs.ts
import { NgeDocSettings } from '@cisstech/nge/doc'

export const DOCS: NgeDocSettings = {
  meta: {
    name: 'My library',
    root: '/docs/',
    logo: 'assets/logo.svg',
  },
  pages: [
    { title: 'Getting started', href: 'getting-started', renderer: 'assets/docs/getting-started.md' },
    { title: 'Installation', href: 'installation', renderer: 'assets/docs/installation.md' },
  ],
}
```

```typescript
// app.routes.ts
{
  path: 'docs',
  loadChildren: () => import('@cisstech/nge/doc').then((m) => m.NGE_DOC_ROUTES),
  data: DOCS,
}
```

The route `data` also accepts an **array**, and file-based and code-first sites mix
freely: `data: [DOCS, docsFromManifest('guide/nge-doc.json')]`.

## Page renderers

A page's `renderer` can be any of:

- **A file url** (a single-line string): loaded and rendered as Markdown.
- **Inline Markdown** (a multi-line string): rendered as-is.
- **A component**: `() => import('./demo.component').then((m) => m.DemoComponent)`.
- **A module** exposing a `component` field, when the component needs its own imports.

Pass inputs to a component page with `inputs`:

```typescript
{
  title: 'Playground',
  href: 'playground',
  renderer: () => import('./playground.component').then((m) => m.PlaygroundComponent),
  inputs: { theme: 'dark' },
}
```

## Dynamic and nested pages

A page entry can be a function of the environment injector, sync or async, returning one
link or many. Return `children` to build a nested section:

```typescript
pages: [
  (injector) => {
    const api = injector.get(ApiService)
    return api.listGuides().then((guides) => ({
      title: 'Guides',
      href: 'guides',
      children: guides.map((g) => ({ title: g.title, href: g.slug, renderer: g.url })),
    }))
  },
]
```

## Section separators

Group the sidebar with headings. A separator is a flat entry, not a parent, so the pages
that follow keep their own urls. Add `color` for an accent dot:

```typescript
pages: [
  { separator: true, title: 'Guides', color: '#10b981' },
  { title: 'Getting started', href: 'getting-started', renderer: 'assets/docs/getting-started.md' },
  { separator: true, title: 'Reference' },
  { title: 'API', href: 'api', renderer: 'assets/docs/api.md' },
]
```

## Actions and icons

Each page can declare header `actions`. A string handler opens a url in a new tab; a
function handler receives the injector:

```typescript
{
  title: 'API',
  href: 'api',
  renderer: 'assets/docs/api.md',
  icon: 'assets/icons/api.svg',
  actions: [
    { title: 'Edit on GitHub', icon: editIcon, run: 'https://github.com/me/my-lib/edit/main/docs/api.md' },
    { title: 'Copy link', run: (injector) => injector.get(ClipboardService).copy(location.href) },
  ],
}
```

Any `icon` (on a link, an action, a nav item or the logo) is an `NgeDocIcon`: a single
url, or a `{ light, dark }` pair per color scheme. The default theme recolors monochrome
same-origin icons to the current text color automatically.

## What the file-based path adds

Code-first pages have no source file, so the features derived from sources do not light
up: content search, "Copy as Markdown", edit links, last-updated dates and the seo/llms
outputs. Title search, navigation, SEO tags and theming work identically.
