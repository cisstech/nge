---
title: Installation
description: Add nge/doc to a project with ng add, or set it up manually.
---

# Installation

## With ng add (recommended)

```bash
ng add @cisstech/nge
```

The schematic:

- scaffolds `public/docs/` with a first page and a `_meta.json`,
- registers the `docs` builder target in `angular.json`,
- adds `provideNgeDoc()` to your application providers,
- prints the route snippet to paste (the one edit it never makes for you).

In workspaces without `angular.json` (some Nx setups), it scaffolds the files and prints
instructions for the rest. You can also run it explicitly with
`ng g @cisstech/nge:nge-doc`.

## Manual setup

===npm

```bash
npm i @cisstech/nge
```

=== yarn

```bash
yarn add @cisstech/nge
```

===

Markdown rendering ships with the package (the `marked` parser comes as a regular
dependency), so there is nothing else to install. Then:

1. Provide the engine and `HttpClient` (used to fetch pages):

```typescript
// app.config.ts
import { provideHttpClient } from '@angular/common/http'
import { provideNgeDoc } from '@cisstech/nge/doc'

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideNgeDoc()],
}
```

2. Register the `docs` target in `angular.json` (compiles your Markdown into a manifest):

```json
"docs": {
  "builder": "@cisstech/nge:docs",
  "options": { "publicDir": "public", "root": "/docs", "name": "My docs" }
}
```

3. Route the docs, as shown in [Getting started](/docs/nge-doc/getting-started).

Next: [Docs from files](/docs/nge-doc/files).
