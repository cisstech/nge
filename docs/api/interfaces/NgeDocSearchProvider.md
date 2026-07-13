---
title: NgeDocSearchProvider
description: Pluggable search backend. The default builds its index in memory from the
---
# NgeDocSearchProvider

`interface`

Pluggable search backend. The default builds its index in memory from the
manifests; [PrebuiltNgeDocSearchProvider](/docs/api/classes/PrebuiltNgeDocSearchProvider) loads a build-time index
instead. The contract, and therefore the UI, stays the same.

## `index()`

## Signature

```typescript
index(manifests: NgeDocManifest[]): Promise<void>
```

### Parameters

- `manifests` (`NgeDocManifest[]`)

### Returns

`Promise<void>`

## `search()`

## Signature

```typescript
search(query: string): Promise<NgeDocSearchResult[]>
```

### Parameters

- `query` (`string`)

### Returns

`Promise<NgeDocSearchResult[]>`
