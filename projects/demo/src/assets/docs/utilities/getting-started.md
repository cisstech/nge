---
title: Getting started with the utilities
description: The small building blocks the rest of nge is built on: services, standalone pipes, and framework-free helper functions.
---

# Utilities

Three small entry points that the rest of nge builds on, and that are useful on their own.

## What you get

- **[Services](/docs/utilities/services)** (`nge/services`): root-provided helpers for the
  clipboard, dynamic component rendering, on-demand resource loading and file picking.
- **[Pipes](/docs/utilities/pipes)** (`nge/pipes`): standalone template pipes for common checks
  and transforms.
- **[Utils](/docs/utilities/utils)** (`nge/utils`): pure functions for colors, dates, strings,
  comparison, copying and file types, with no Angular dependency.

## Installation

===npm

```bash
npm i @cisstech/nge
```

=== yarn

```bash
yarn add @cisstech/nge
```

===

The services are `providedIn: 'root'`, the pipes are standalone, and the utils are plain functions,
so there is nothing to register.
