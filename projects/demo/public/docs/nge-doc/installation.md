---
title: Installation
description: Install nge/doc and the pieces it needs to render Markdown pages.
---

# Installation

===npm

```bash
npm i @cisstech/nge
```

=== yarn

```bash
yarn add @cisstech/nge
```

===

nge/doc only needs `@angular/common` and `@angular/core`.

## Rendering Markdown

To render Markdown pages you provide a Markdown renderer component. These docs use
[nge/markdown](/docs/nge-markdown/getting-started), which is built on `marked`:

===npm

```bash
npm i marked
```

=== yarn

```bash
yarn add marked
```

===

## HttpClient

Markdown pages loaded from a URL are fetched with `HttpClient`, so provide it at the app
root:

```typescript
import { provideHttpClient, withFetch } from '@angular/common/http'

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch())],
})
```

Next: [Usage](/docs/nge-doc/usage).
