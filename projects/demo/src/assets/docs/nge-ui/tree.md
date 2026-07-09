---
title: Tree
description: Render a data tree from your own model with an adapter, with expand/collapse, selection, filtering and keyboard actions.
---

# Tree

`ui-tree` renders a tree from any data model. You describe how to read your nodes through an
adapter, and the component handles expansion, selection, filtering and interaction.

## Usage

Pass the root `nodes` and an `adapter`.

```html
<ui-tree [nodes]="nodes" [adapter]="adapter" />
```

The adapter (`ITreeAdapter<T>`) tells the tree how to read a node. `id`, `idProvider`,
`isExpandable` and `nameProvider` are required; the rest are optional.

```typescript
import { ITreeAdapter } from '@cisstech/nge/ui/tree'

interface FileNode {
  path: string
  name: string
  children?: FileNode[]
}

readonly adapter: ITreeAdapter<FileNode> = {
  id: 'file-tree',
  idProvider: (node) => node.path,
  isExpandable: (node) => !!node.children?.length,
  nameProvider: (node) => node.name,
  childrenProvider: (node) => node.children ?? [],
  actions: {
    mouse: {
      click: (e) => console.log('open', e.node?.path),
    },
  },
}
```

## Controlling the tree

`id` names the tree so you can reach it from anywhere with `TreeService.get(id)`, for example to
expand everything or set the filter term without holding a reference to the component.

```typescript
import { inject } from '@angular/core'
import { TreeService } from '@cisstech/nge/ui/tree'

const trees = inject(TreeService)
const tree = trees.get('file-tree')
tree?.expandAll()
tree?.search({ term: 'readme' })
```

`treeHeight` and `itemHeight` tune the virtual scroll, and the `actions` mapping binds keyboard and
mouse handlers (`click`, `rightClick`, key bindings) to your own callbacks.
