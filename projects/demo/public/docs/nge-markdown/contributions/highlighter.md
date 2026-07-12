---
title: Highlighter
description: Syntax highlighting for code blocks, with line numbers, highlighted lines and a filename header.
---

# Highlighter

## Static highlighting with shiki (recommended)

`withShiki()` highlights fenced code blocks with [shiki](https://shiki.style), on the
server too: prerendered pages ship highlighted HTML, with both color palettes emitted as
CSS variables so switching schemes never re-highlights. This site uses it.

```bash
npm i -D shiki
```

```typescript
import { provideNgeMarkdown, withShiki } from '@cisstech/nge/markdown'

provideNgeMarkdown(withShiki())
// or with options:
provideNgeMarkdown(withShiki({ themes: { light: 'vitesse-light', dark: 'vitesse-dark' } }))
```

On the server, the configured `langs` (a sensible default list) are preloaded before the
first render; a language outside the list still highlights on the client. An unknown
language falls back to plain text.

The fence options below (`lines`, `highlights`, `filename`) work with both highlighters,
with the same syntax, and every block gets the same chrome: a toolbar with the filename
(or the language), a copy action and a download action.


Highlight fenced code blocks. The contribution is highlighter-agnostic: it delegates to a service
you provide. [nge/monaco](/docs/nge-monaco/getting-started) ships an adapter, so its editor engine
colors your code.

## Register

Register the contribution and a highlighter service. With nge/monaco, wire its colorizer:

```typescript
import { NgeMonacoColorizerService } from '@cisstech/nge/monaco'
import { provideNgeMarkdown, withHighlighter } from '@cisstech/nge/markdown'

providers: [
  provideNgeMarkdown(
    withHighlighter(NgeMonacoColorizerService),
  ),
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
