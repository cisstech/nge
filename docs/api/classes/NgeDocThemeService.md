---
title: NgeDocThemeService
description: Owns the documentation color scheme.
---
# NgeDocThemeService

`class`

Owns the documentation color scheme.

The resolved scheme is reflected as a `nge-doc-dark` class on the document
root and as a native `color-scheme`, so themes and the markdown renderer can
style themselves through plain CSS without re-rendering. Provided in root so a
single instance is shared by every theme.

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `isDark (readonly)` | `Signal<boolean>` | Whether dark mode is currently active once `auto` is resolved. |
| `scheme (readonly)` | `WritableSignal<NgeDocColorScheme>` | The user preference. Defaults to `auto` (follows the OS). |

## `setActive()`

## Signature

```typescript
setActive(active: boolean): void
```

### Parameters

- `active` (`boolean`)

### Returns

`void`

## `setScheme()`

## Signature

```typescript
setScheme(scheme: NgeDocColorScheme): void
```

### Parameters

- `scheme` (`NgeDocColorScheme`)

### Returns

`void`

## `toggle()`

## Signature

```typescript
toggle(): void
```

### Returns

`void`
