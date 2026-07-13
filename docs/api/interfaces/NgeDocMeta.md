---
title: NgeDocMeta
description: Metadata informations about a documentation site.
---
# NgeDocMeta

`interface`

Metadata informations about a documentation site.

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `backIconUrl?` | `string` |  |
| `backUrl?` | `string` | Optional back url (use of Angular [routerLink]) |
| `backUrlHref?` | `string` | Optional back href |
| `links?` | `object[]` | social links to show insides the footer |
| `logo?` | `NgeDocIcon` | Icon of the documentation logo. |
| `name` | `string` | Name of the documentation site. |
| `nav?` | `"sidebar" | "tabs"` | Where the site's top-level sections live: inside the sidebar tree |
| `repo?` | `object` |  |
| `root` | `string` | Root url of the documentation site. (absolute url starting with `/`) |
