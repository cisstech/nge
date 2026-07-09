---
title: KaTeX
description: Render mathematical and chemical expressions in Markdown with KaTeX.
---

# KaTeX

Write math and chemistry in your pages. Expressions render with [KaTeX](https://katex.org).

## Register

```typescript
import { NgeMarkdownKatexProvider } from '@cisstech/nge/markdown'

// add to your app providers (see Usage for the full setup)
providers: [NgeMarkdownKatexProvider]
```

## Syntax

A display block sits between `$$` fences on their own lines:

```plaintext
$$
f(x) = \int_{-\infty}^{\infty} \hat f(\xi)\, e^{2 \pi i \xi x} \,d\xi
$$
```

$$
f(x) = \int_{-\infty}^{\infty} \hat f(\xi)\, e^{2 \pi i \xi x} \,d\xi
$$

Inline math sits between single `$`:

```plaintext
$c = \pm\sqrt{a^2 + b^2}$
```

Result: $c = \pm\sqrt{a^2 + b^2}$

Chemistry uses [mhchem](https://mhchem.github.io/MathJax-mhchem/) notation:

```plaintext
$\ce{CO2 + C -> 2 CO}$
```

Result: $\ce{CO2 + C -> 2 CO}$

## Options

KaTeX loads from a CDN by default. Override the source, delimiters or extensions with
`NgeMarkdownKatexOptionsProvider`:

```typescript
import { NgeMarkdownKatexProvider, NgeMarkdownKatexOptionsProvider } from '@cisstech/nge/markdown'

providers: [
  NgeMarkdownKatexProvider,
  NgeMarkdownKatexOptionsProvider({
    options: {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
    },
    extensions: { mhchem: true, copyTex: true },
  }),
]
```

:::+ note Copy as source
With `extensions.copyTex` on (the default), copying a rendered expression puts its LaTeX source on
the clipboard. `extensions.mhchem` (also on by default) enables the chemistry notation above.
:::
