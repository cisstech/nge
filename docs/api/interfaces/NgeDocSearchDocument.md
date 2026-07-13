---
title: NgeDocSearchDocument
description: A unit of the search index: one document per page, or per heading when content is indexed.
---
# NgeDocSearchDocument

`interface`

A unit of the search index: one document per page, or per heading when content is indexed.

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `content` | `string` | Text searched against: the title (default provider) or the section content (prebuilt index). |
| `heading?` | `string` | Heading the chunk was extracted from, when indexing page content. |
| `slug` | `string` | Absolute href of the page (with a `#heading` anchor for a section chunk). |
| `title` | `string` | Page title. |
