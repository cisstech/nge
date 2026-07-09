---
title: Embedding components
description: Render live Angular components inside Markdown by keyword, through a small component registry.
---

# Embedding components

Register a component under a keyword, then write that keyword as a tag anywhere in your Markdown.
The renderer mounts the live component in its place. Only registered keywords are mounted, so every
other tag stays plain HTML.

## Register

```typescript
import { NgeMarkdownComponentsProvider } from '@cisstech/nge/markdown'

// in your app (or NgModule) providers
NgeMarkdownComponentsProvider({
  'demo-counter': () => import('./demo-counter.component').then((m) => m.DemoCounterComponent),
})
```

## Use

Write the keyword as a tag. Attributes are passed to the component as inputs, so `label="Try me"`
sets the `label` input.

```markdown
Here is a live component:

<demo-counter label="Try me"></demo-counter>
```

Result:

<demo-counter label="Try me"></demo-counter>

Prefer hyphenated keywords such as `demo-counter`; they are valid custom-element names and never
clash with real HTML.

:::+ note A preview, not a playground
Components are pre-built and registered by keyword, so there is no runtime template compiler and no
bundle cost beyond the components you register. The reader cannot edit their code: this renders a
live component, it does not compile new ones.
:::
