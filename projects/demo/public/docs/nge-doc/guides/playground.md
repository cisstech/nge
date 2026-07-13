---
order: 8
title: Playground
description: Turn a fenced code block into a runnable StackBlitz example, or embed a live component.
---

# Playground

Two ways to make examples interactive, both building on pieces you already have.

## Open a snippet in StackBlitz

Enable `withStackblitz` and mark a fenced block with the `stackblitz` flag: its
toolbar gains an "Open in StackBlitz" action. The snippet is injected into the
project scaffold you configure, so the example runs exactly as you set it up (no
fragile generation).

`@stackblitz/sdk` is an optional peer, install it only for this feature:

```bash
npm i @stackblitz/sdk
```

```typescript
import { provideNgeMarkdown, withShiki } from '@cisstech/nge/markdown'
import { withStackblitz } from '@cisstech/nge/markdown/stackblitz'

provideNgeMarkdown(
  withShiki(),
  withStackblitz({ template: 'typescript', file: 'index.ts', title: 'nge example' })
)
```

Then, in any markdown page, add the flag after the language:

````markdown
```typescript stackblitz
const greeting = 'Hello from nge-doc'
console.log(greeting)
```
````

Which renders as (try the StackBlitz button in the toolbar):

```typescript stackblitz
const greeting = 'Hello from nge-doc'
console.log(greeting)
```

For a full app, use `template: 'node'` and provide a `package.json` (and any
other files) through the `files` option; the snippet lands at `file`.

## Embed a live component

For an example that runs inline, register a component and use its tag in the
markdown, as covered in [Components in Markdown](/docs/nge-doc/guides/components).
Pair it with an editor: `nge/monaco` is an editor, so a component can show its
own source next to a live result, the way this site's
[Monaco showcase](/docs/nge-monaco/showcase) and
[Markdown cheatsheet](/docs/nge-markdown/cheatsheet) pages do.
