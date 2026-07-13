---
title: contentPages
description: Content pages (an `href` plus a renderer) of a navigation tree, depth-first.
---
# contentPages

`function`

Content pages (an `href` plus a renderer) of a navigation tree, depth-first.
Separators, pure grouping links and external links (no renderer) are
excluded. Shared by the runtime, the compiler and the SSR entry; `src/shared`
holds the pure, framework-free utils and is the only src folder the Node
builder ships (the link type import is type-only, erased at compile time).

## Signature

```typescript
function contentPages(pages: NgeDocLink[]): NgeDocLink[]
```

### Parameters

- `pages` (`NgeDocLink[]`)

### Returns

`NgeDocLink[]`
