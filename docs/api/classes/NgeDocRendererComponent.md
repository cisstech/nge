---
title: NgeDocRendererComponent
---
# NgeDocRendererComponent

`class`

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `activeHeadingId (readonly)` | `WritableSignal<string | null>` | Id of the heading currently in view, driven by scroll position. |
| `componentRef?` | `ComponentRef<any>` |  |
| `componentRefByTypes` | `Map<Type<any>, ComponentRef<any>>` |  |
| `container (readonly)` | `Signal<ViewContainerRef>` |  |
| `headings (readonly)` | `WritableSignal<NgeDocHeading[]>` | Headings of the current page, in document order. |
| `loading (readonly)` | `WritableSignal<boolean>` |  |
| `notFound (readonly)` | `WritableSignal<boolean>` |  |

## `ngOnDestroy()`

## Signature

```typescript
ngOnDestroy(): void
```

### Returns

`void`

## `ngOnInit()`

## Signature

```typescript
ngOnInit(): void
```

### Returns

`void`

## `onHostClick()`

## Signature

```typescript
onHostClick(event: MouseEvent): void
```

### Parameters

- `event` (`MouseEvent`)

### Returns

`void`

## `scrollToHeading()`

## Signature

```typescript
scrollToHeading(id: string): void
```

### Parameters

- `id` (`string`)

### Returns

`void`
