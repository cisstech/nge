---
title: flattenPages
description: Routable links of a manifest in reading order (depth-first, a parent before
---
# flattenPages

`function`

Routable links of a manifest in reading order (depth-first, a parent before
its children). Separators, being visual headings, are skipped along with their
subtree. Used to compute prev/next and to feed search.

## Signature

```typescript
function flattenPages(pages: NgeDocLink[]): NgeDocLink[]
```

### Parameters

- `pages` (`NgeDocLink[]`)

### Returns

`NgeDocLink[]`
