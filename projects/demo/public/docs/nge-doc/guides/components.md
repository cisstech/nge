---
order: 1
title: Components in Markdown
description: Embed live Angular components inside Markdown pages, or make a whole page interactive.
---

# Components in Markdown

File-based pages are Markdown, but they can host live Angular components: a demo next to
its explanation, or a whole interactive page. This site's
[Monaco showcase](/docs/nge-monaco/showcase) and
[Markdown cheatsheet](/docs/nge-markdown/cheatsheet) are Markdown pages doing exactly
that.

## Register components

Map a tag name to a lazy component with the `withComponents` feature of
[nge/markdown](/docs/nge-markdown/getting-started):

```typescript
// app.config.ts
import { provideNgeMarkdown, withComponents } from '@cisstech/nge/markdown'

provideNgeMarkdown(
  withComponents({
    'demo-counter': () => import('./demos/counter.component').then((m) => m.CounterComponent),
    'monaco-showcase': () => import('./monaco/showcase.component').then((m) => m.ShowcaseComponent),
  })
)
```

## Use them in a page

```markdown
# Counters

A live demo, rendered by Angular between two paragraphs:

<demo-counter></demo-counter>

The component loads lazily, only when the page renders.
```

Attributes on the tag are passed to the component's inputs.

## A whole interactive page

A page can be little more than its component. If the component needs a browser (an
editor, a canvas, a playground), exclude it from static generation with frontmatter:

```markdown
---
prerender: false
---

# Showcase

<monaco-showcase></monaco-showcase>
```

See [Static generation](/docs/nge-doc/guides/ssg) for what `prerender: false` does.

## Code-first equivalent

In [code-first](/docs/nge-doc/code-first) sites, a page's `renderer` can be the component
itself; no tag registration needed.
