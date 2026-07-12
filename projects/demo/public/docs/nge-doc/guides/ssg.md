---
order: 2
title: Static generation
description: Prerender every documentation page at build time with the doc/ssr entry.
---

# Static generation

Prerendering turns each page into static HTML: instant first paint, robots and link
previews see real content, and hosting stays a plain file server. The
`@cisstech/nge/doc/ssr` entry provides the whole setup; this site is built with it.

## Set up SSR

Add server rendering to the app if it does not have it (`ng add @angular/ssr`), with
`outputMode: "static"` for a fully static site. Then wire the two pieces:

```typescript
// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr'
import { ngeDocPrerenderRoutes } from '@cisstech/nge/doc/ssr'

export const serverRoutes: ServerRoute[] = [
  ...ngeDocPrerenderRoutes('public/docs/nge-doc.json'),
  { path: '**', renderMode: RenderMode.Client },
]
```

```typescript
// app.config.server.ts
import { provideNgeDocSsr } from '@cisstech/nge/doc/ssr'

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes)), provideNgeDocSsr()],
}
```

- `ngeDocPrerenderRoutes(manifestPath)` reads the compiled manifest at build time and
  returns one prerender route per site, listing every page. Pass several manifest paths
  for several sites.
- `provideNgeDocSsr()` serves the manifest and the Markdown from the filesystem during
  prerendering (there is no HTTP server then) and records them in transfer state, so the
  hydrated page does not refetch them. It reads from `public/` by default; monorepos pass
  their own path: `provideNgeDocSsr({ roots: ['projects/demo/public'] })`.

Build order matters: compile the docs first, then build the app.

```bash
ng run my-app:docs && ng build my-app
```

## Client-only pages

Pages that need a browser (editors, playgrounds) opt out with frontmatter:

```markdown
---
prerender: false
---
```

The page keeps its url and navigation entry; it simply renders on the client, through the
prerender fallback. A missing file at prerender time fails the build with a message that
points at this flag, rather than hanging.

## What you get

Every prerendered page ships its content in the initial HTML, hydrates without refetching
its Markdown, and stays a plain SPA afterwards. Pair it with
[withShiki](/docs/nge-markdown/contributions/highlighter) and code blocks arrive
highlighted in the static HTML too. Nothing else in your setup changes:
the same route, the same providers, the same theme.
