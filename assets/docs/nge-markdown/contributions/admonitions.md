---
title: Admonitions
description: Styled call-out blocks (note, tip, warning, danger and more) with an optional title and arbitrary nested content.
---

# Admonitions

Admonitions, also called call-outs, add side content without breaking the flow of the page. They
come in several types, take an optional title, and can hold nested content.

> Examples on this page follow the [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/reference/admonitions/) reference.

## Register

```typescript
import { NgeMarkdownAdmonitionsProvider } from '@cisstech/nge/markdown'

// add to your app providers (see Usage for the full setup)
providers: [NgeMarkdownAdmonitionsProvider]
```

## Syntax

A block starts with `:::` followed by a type keyword, then the content, then a closing `:::`.

```plaintext
::: note
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
:::
```

::: note
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
:::

## Title

Add a title after the type. Use `:::+` to make the block open by default. The title accepts inline
Markdown.

```plaintext
:::+ note Phasellus **posuere** in sem ut cursus
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
:::
```

:::+ note Phasellus **posuere** in sem ut cursus
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
:::

## Nested content

A block can hold headings, lists, code and other blocks.

````plaintext
:::+ note With a code block
Lorem ipsum dolor sit amet.

```python
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
:::
````

:::+ note With a code block
Lorem ipsum dolor sit amet.

```python
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
:::

## Types

`note`, `abstract`, `info`, `tip`, `success`, `question`, `warning`, `failure`, `danger`, `bug`,
`example` and `quote`.

:::+ tip tip
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

:::+ warning warning
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

:::+ danger danger
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::
