---
title: NgeDocSeoConfig
description: Site-wide SEO settings used to build canonical, Open Graph and Twitter tags.
---
# NgeDocSeoConfig

`interface`

Site-wide SEO settings used to build canonical, Open Graph and Twitter tags.

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `image?` | `string` | Default social image; relative paths resolve against `url`. Overridable per page via frontmatter `image`. |
| `url?` | `string` | Absolute site url (no trailing slash), e.g. `https://example.com/docs`. Enables canonical and `og:url`. |
