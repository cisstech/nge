---
title: NgeDocManifest
description: A resolved documentation site: its metadata and the navigation tree with every
---
# NgeDocManifest

`interface`

A resolved documentation site: its metadata and the navigation tree with every
href made absolute.

It is the single shape the runtime consumes, no matter where the docs come
from: code-first settings (via [settingsToManifest](/docs/api/functions/settingsToManifest)) or, later, a
manifest emitted by the build. `NgeDocLink` stays the authoring API; the
manifest is just its resolved form.

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `meta` | `NgeDocMeta` |  |
| `pages` | `NgeDocLink[]` | Navigation tree, hrefs resolved relative to `meta.root`. |
