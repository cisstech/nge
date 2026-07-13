---
title: NgeDocService
---
# NgeDocService

`class`

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `brand (readonly)` | `Signal<NgeDocBrand>` | Header brand: the one declared with `withBrand`, or the active site's name |
| `breadcrumb (readonly)` | `Signal<NgeDocLink[]>` | Ancestor chain from a root link down to the active one, inclusive. |
| `currLink (readonly)` | `Signal<NgeDocLink | undefined>` | Active link, or `undefined` before the first navigation resolves. |
| `editUrl (readonly)` | `Signal<string | undefined>` | "Edit this page" url for the active page, when `withEditLink` is set and the page has a source. |
| `labels (readonly)` | `NgeDocLabels` | Resolved theme wording: the English defaults merged with any `withLabels` overrides. |
| `lastUpdated (readonly)` | `Signal<string | undefined>` | ISO date the active page was last updated, when the compiler recorded it. |
| `markdownAbsoluteUrl (readonly)` | `Signal<string | undefined>` | Absolute url of the active page's raw markdown (`<page>.md`), when `withSeo` is set. |
| `markdownUrl (readonly)` | `Signal<string | undefined>` | Relative url of the active page's raw markdown, used by "copy as markdown". |
| `meta (readonly)` | `Signal<NgeDocMeta>` | Metadata of the active documentation site. |
| `navbar (readonly)` | `Signal<NgeDocNavLink[]>` | Header navigation links, in precedence order: the ones declared with |
| `nextLink (readonly)` | `Signal<NgeDocLink | undefined>` | Link after the active one in reading order. |
| `prevLink (readonly)` | `Signal<NgeDocLink | undefined>` | Link before the active one in reading order. |
| `rootLinks (readonly)` | `Signal<NgeDocLink[]>` | Root links of the active documentation site (the navigation tree). |
| `sidebarLinks (readonly)` | `Signal<NgeDocLink[]>` | What the sidebar shows: the whole tree, or only the active section's pages |
| `sites (readonly)` | `WritableSignal<NgeDocMeta[]>` | Metadata of every registered documentation site, in declaration order. |
| `stateChanges` | `unknown` |  |

## `isNavLinkActive()`

## Signature

```typescript
isNavLinkActive(link: NgeDocNavLink): boolean
```

### Parameters

- `link` (`NgeDocNavLink`)

### Returns

`boolean`

## `ngOnDestroy()`

## Signature

```typescript
ngOnDestroy(): void
```

### Returns

`void`

## `runAction()`

## Signature

```typescript
runAction(run: NgeDocLinkActionHandler): Promise<void>
```

### Parameters

- `run` (`NgeDocLinkActionHandler`) - The action handler declared on a link.

### Returns

`Promise<void>`

## `search()`

## Signature

```typescript
search(query: string): Promise<NgeDocSearchResult[]>
```

### Parameters

- `query` (`string`) - Free text to match (case-insensitive).

### Returns

`Promise<NgeDocSearchResult[]>`

## `setSeo()`

## Signature

```typescript
setSeo(title: string, description?: string, image?: string): void
```

### Parameters

- `title` (`string`)
- `description` (`string`)
- `image` (`string`)

### Returns

`void`

## `setup()`

## Signature

```typescript
setup(): Promise<void>
```

### Returns

`Promise<void>`
