---
title: Usage
description: Declare your pages, register the route and configure the engine with provideNgeDoc.
---

# Usage

A documentation site is a set of links. Each link points to a Markdown file, an inline
Markdown string, or an Angular component. You declare them once, lazy-load the engine on a
route, and configure it with `provideNgeDoc()`.

## Declare the pages

A site is described by an `NgeDocSettings` object: some `meta` and a list of `pages`. Page
`renderer` values are relative to `meta.root`.

```typescript
// docs.ts
import { NgeDocSettings } from '@cisstech/nge/doc'

export const DOCS: NgeDocSettings = {
  meta: {
    name: 'My library',
    root: '/docs/',
    logo: 'assets/logo.svg',
    repo: { name: 'my-lib', url: 'https://github.com/me/my-lib' },
  },
  pages: [
    { title: 'Getting started', href: 'getting-started', renderer: 'assets/docs/getting-started.md' },
    { title: 'Installation', href: 'installation', renderer: 'assets/docs/installation.md' },
    { title: 'Usage', href: 'usage', renderer: 'assets/docs/usage.md' },
  ],
}
```

## Register the route and configure the engine

Lazy-load `NGE_DOC_ROUTES` on a path and pass your settings through the route `data`. Then
register a Markdown renderer with `withMarkdownRenderer()`.

===app.routes.ts

```typescript
import { Routes } from '@angular/router'
import { DOCS } from './docs'

export const routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('@cisstech/nge/doc').then((m) => m.NGE_DOC_ROUTES),
    data: DOCS,
  },
  { path: '**', redirectTo: 'docs' },
]
```

=== app.config.ts

```typescript
import { ApplicationConfig } from '@angular/core'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideRouter, withInMemoryScrolling } from '@angular/router'
import { provideNgeDoc, withMarkdownRenderer } from '@cisstech/nge/doc'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
    provideHttpClient(withFetch()),
    provideNgeDoc(
      withMarkdownRenderer({
        component: () => import('@cisstech/nge/markdown').then((m) => m.NgeMarkdownComponent),
      })
    ),
  ],
}
```

===

That is the whole setup. Navigating to `/docs` redirects to the first page, and the sidebar,
table of contents, breadcrumbs and previous/next links are generated from your page tree.

## Multiple sites

The route `data` also accepts an **array** of `NgeDocSettings`. Each entry is a separate site
reachable from its own `meta.root`, which is how this documentation hosts `nge/doc`,
`nge/markdown` and `nge/monaco` side by side. Link them in the header with
[withNavbar](/docs/nge-doc/advanced-usage).

## Using another Markdown renderer

`withMarkdownRenderer()` accepts any component that exposes a `data` input (a Markdown string)
and a `file` input (a URL). Point it at your own component to swap `nge/markdown` for something
else.

## NgModule apps

`provideNgeDoc()` returns `EnvironmentProviders`, so it also works in an `NgModule`'s
`providers`. Load the routes with `NGE_DOC_ROUTES` exactly as in a standalone app.
