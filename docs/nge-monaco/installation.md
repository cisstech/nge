---
title: Installation
description: Install nge/monaco and its monaco-editor peer dependency.
---

# Installation

nge/monaco ships in `@cisstech/nge`, with
[monaco-editor](https://www.npmjs.com/package/monaco-editor) as a peer dependency:

===npm

```bash
npm i @cisstech/nge monaco-editor
```

=== yarn

```bash
yarn add @cisstech/nge monaco-editor
```

===

## HttpClient

Themes are loaded over HTTP, so provide `HttpClient` at the app root:

```typescript
import { provideHttpClient } from '@angular/common/http'

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
})
```

## Where Monaco loads from

The editor sources load from a CDN by default, so the `monaco-editor` package is only required
when you [self-host](/docs/nge-monaco/usage) them. Keep it installed to pin the version you serve.

Next: [Usage](/docs/nge-monaco/usage).
