---
title: NgeDocLink
description: Representation of a link in the documentation navigation.
---
# NgeDocLink

`interface`

Representation of a link in the documentation navigation.

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `actions?` | `NgeDocLinkAction[]` | Custom actions |
| `children?` | `NgeDocLink[]` | Sub links |
| `color?` | `string` | Accent color (any CSS color) shown as the separator's dot. |
| `description?` | `string` | Optional page description, used for the `<meta name="description">` tag. |
| `expanded?` | `boolean` | A value indicating whether the link is expanded or not. |
| `href?` | `string` | Url to display in the browser navigation bar. Omitted for separators. |
| `icon?` | `NgeDocIcon` | Optional icon |
| `inputs?` | `Record<string, unknown>` | Inputs to pass to the dynamic renderered component if `renderer` is a dynamic component. |
| `lastUpdated?` | `string` | ISO date of the last commit that touched the source. Set by the compiler. |
| `prerender?` | `boolean` | `false` marks a client-only page (an interactive editor, a playground...) |
| `renderer?` | `NgeDocRenderer` | Content to render once the link is displayed. |
| `separator?` | `boolean` | Renders this entry as a non-clickable section heading in the sidebar rather |
| `sourcePath?` | `string` | Source markdown file, relative to the docs folder. Set by the compiler. |
| `title` | `string` | Title of the link |
