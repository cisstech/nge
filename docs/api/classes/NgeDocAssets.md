---
title: NgeDocAssets
description: Fetch port for the docs assets: the manifest (`nge-doc.json`) and the
---
# NgeDocAssets

`class`

Fetch port for the docs assets: the manifest (`nge-doc.json`) and the
markdown pages. The default implementation fetches over HTTP with transfer
state support; `provideNgeDocSsr()` (from `@cisstech/nge/doc/ssr`) replaces
it with a filesystem adapter, since there is no HTTP server at prerender time.

## `json()`

## Signature

```typescript
json(url: string): Promise<T>
```

### Parameters

- `url` (`string`)

### Returns

`Promise<T>`

## `text()`

## Signature

```typescript
text(url: string): Promise<string>
```

### Parameters

- `url` (`string`)

### Returns

`Promise<string>`
