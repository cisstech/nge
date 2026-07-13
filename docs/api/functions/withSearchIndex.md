---
title: withSearchIndex
description: Search a build-time index emitted by the `@cisstech/nge:docs` builder instead
---
# withSearchIndex

`function`

Search a build-time index emitted by the `@cisstech/nge:docs` builder instead
of the default in-memory title index. `url` points at the generated
`search.json` (e.g. `docs/search.json`); it loads on the first search.

## Signature

```typescript
function withSearchIndex(url: string): NgeDocFeature
```

### Parameters

- `url` (`string`)

### Returns

`NgeDocFeature`
