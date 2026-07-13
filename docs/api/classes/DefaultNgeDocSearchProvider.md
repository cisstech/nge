---
title: DefaultNgeDocSearchProvider
description: In-memory, title-based search over the manifests.
---
# DefaultNgeDocSearchProvider

`class`

In-memory, title-based search over the manifests.

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
