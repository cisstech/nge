---
title: HttpNgeDocAssets
description: Reads transfer state first, so a hydrated page reuses the content embedded
---
# HttpNgeDocAssets

`class`

Reads transfer state first, so a hydrated page reuses the content embedded
at prerender time instead of refetching it, then falls back to HttpClient.
Each transferred entry is consumed on first read: later navigations back to
the same url fetch fresh content.

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
