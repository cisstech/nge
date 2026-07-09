---
title: Installation
description: Install nge/markdown and its Marked peer dependency.
---

# Installation

nge/markdown ships in `@cisstech/nge`, with [Marked](https://github.com/markedjs/marked) as a
peer dependency:

===npm

```bash
npm i @cisstech/nge marked
```

=== yarn

```bash
yarn add @cisstech/nge marked
```

===

## HttpClient

Loading Markdown from a URL with `[file]` uses `HttpClient`, so provide it at the app root:

```typescript
import { provideHttpClient, withFetch } from '@angular/common/http'

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch())],
})
```

Rendering from a string or from transclusion does not need it.

Next: [Usage](/docs/nge-markdown/usage).
