---
title: Highlighter
description: Syntax highlighting for code blocks, with line numbers, highlighted lines and a filename header.
---

# Highlighter

Highlight fenced code blocks. The contribution is highlighter-agnostic: it delegates to a service
you provide. [nge/monaco](/docs/nge-monaco/getting-started) ships an adapter, so its editor engine
colors your code.

## Register

Register the contribution and a highlighter service. With nge/monaco, wire its colorizer:

```typescript
import { NgeMonacoColorizerService } from '@cisstech/nge/monaco'
import {
  NgeMarkdownHighlighterProvider,
  NgeMarkdownHighlighterMonacoProvider,
} from '@cisstech/nge/markdown'

providers: [
  NgeMarkdownHighlighterProvider,
  NgeMarkdownHighlighterMonacoProvider(NgeMonacoColorizerService),
]
```

To use another highlighter, implement `NgeMarkdownHighlighterService` and provide it for the
`NGE_MARKDOWN_HIGHLIGHTER_SERVICE` token.

## Syntax

A plain fenced block is highlighted from its language:

````plaintext
```javascript
const s = 'JavaScript syntax highlighting'
alert(s)
```
````

```javascript
const s = 'JavaScript syntax highlighting'
alert(s)
```

Add options after the language: `lines` shows line numbers, `highlights` emphasizes lines (single
or ranges), and `filename` adds a header with copy and download actions.

````plaintext
```python lines="1" highlights="1-2" filename="demo.py"
s = "Highlighted lines with a filename header"
print(s)
```
````

```python lines="1" highlights="1-2" filename="demo.py"
s = "Highlighted lines with a filename header"
print(s)
```
