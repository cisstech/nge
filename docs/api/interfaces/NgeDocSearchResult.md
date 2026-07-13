---
title: NgeDocSearchResult
description: A page returned by a NgeDocSearchProvider for a query.
---
# NgeDocSearchResult

`interface`

A page returned by a [NgeDocSearchProvider](/docs/api/interfaces/NgeDocSearchProvider) for a query.

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `excerpt?` | `string` | A short content snippet around the match, when the provider indexes content. |
| `heading?` | `string` | Matched heading, when the provider indexes page content. |
| `path` | `string[]` | Ancestor titles, site name first, the match excluded. |
| `slug` | `string` | Absolute href to navigate to. |
| `title` | `string` | Page title to display. |
