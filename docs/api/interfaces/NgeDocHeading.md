---
title: NgeDocHeading
description: A heading extracted from the rendered page, used to build a table of contents.
---
# NgeDocHeading

`interface`

A heading extracted from the rendered page, used to build a table of contents.

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `id` | `string` | Slug assigned to the heading element, usable as a url fragment. |
| `label` | `string` | Text content of the heading. |
| `level` | `number` | Heading level (2 for `h2`, 3 for `h3`). |
