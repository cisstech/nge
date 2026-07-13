---
title: PrebuiltNgeDocSearchProvider
description: Searches a build-time index (chunked by heading) fetched from
---
# PrebuiltNgeDocSearchProvider

`class`

Searches a build-time index (chunked by heading) fetched from
[NGE_DOC_SEARCH_INDEX_URL](/docs/api/variables/NGE_DOC_SEARCH_INDEX_URL). The index loads lazily on the first search,
so prerendered pages do not carry it. Same contract as the default provider.

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
