---
title: Installation
description: Install @cisstech/nge, its peer dependencies, and pick the Angular-compatible version line.
---

# Installation

===npm

```bash
npm i @cisstech/nge
```

=== yarn

```bash
yarn add @cisstech/nge
```

===

## Peer dependencies

- **Required:** `@angular/common`, `@angular/core`.
- **UI entry points** (`nge/ui/tree`, `nge/ui/list`, `nge/ui/icon`): `@angular/cdk`, plus `@angular/material` for `nge/ui/tree`.
- **Optional, per entry point:** `marked` for `nge/markdown`, `monaco-editor` for `nge/monaco`, `ngx-pipes` for `nge/pipes`.

Install the optional peers only when you use the matching entry point.

## Version compatibility

The major version of `@cisstech/nge` tracks the Angular major it targets. Pick the line
that matches your Angular version.

| @cisstech/nge | Angular | Node |
| --- | --- | --- |
| 22.x | 22 | ^22.22.3, ^24.15.0 or >=26 |
| 18.x | 18 | ^18.19, ^20.11 or >=22 |
| 17.x | 17 | ^18.13 or >=20 |
| 16.x | 16 | ^16.14 or >=18 |
| 15.x | 15 | ^14.20, ^16.13 or >=18 |

## Next

Each package has its own **Getting Started**: [nge/doc](/docs/nge-doc/getting-started),
[nge/markdown](/docs/nge-markdown/getting-started), [nge/monaco](/docs/nge-monaco/getting-started).
