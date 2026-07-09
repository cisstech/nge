---
title: Getting started with nge/ui
description: Standalone Angular UI building blocks — a data tree, a filterable virtual list, and a multi-source icon component.
---

# nge/ui

**nge/ui** is a small set of standalone UI building blocks for Angular apps. Each one is its own
entry point, so you only bundle what you import.

## What you get

- **[Tree](/docs/nge-ui/tree)** (`ui-tree`) renders a data tree from your own model through an
  adapter, with expand/collapse, selection, filtering and keyboard and mouse actions.
- **[List](/docs/nge-ui/list)** (`ui-list`) renders a virtual list that stays smooth over large
  collections, with optional selection and text filtering.
- **[Icon](/docs/nge-ui/icon)** (`ui-icon`) renders an icon from Font Awesome, icongram, VS Code
  codicons, a file or folder type, or a plain image, behind one component.

## Installation

===npm

```bash
npm i @cisstech/nge @angular/cdk
```

=== yarn

```bash
yarn add @cisstech/nge @angular/cdk
```

===

`ui-tree`, `ui-list` and `ui-icon` use `@angular/cdk`. `ui-tree` also needs `@angular/material`:

===npm

```bash
npm i @angular/material
```

=== yarn

```bash
yarn add @angular/material
```

===

Each component is standalone. Import the ones you use, or their `NgModule` (`NgeUiTreeModule`,
`NgeUiListModule`, `NgeUiIconModule`).
