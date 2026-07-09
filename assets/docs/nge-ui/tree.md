---
title: Tree
description: Render a data tree from your own model with an adapter, with expand/collapse, selection, filtering and keyboard actions.
---

# Tree

`ui-tree` renders a tree from any data model. You describe how to read your nodes through an
adapter, and the component handles expansion, selection, filtering and interaction.

## Live example

<ui-tree-demo></ui-tree-demo>

## Usage

Pass the root `nodes` and an `adapter`, and project a node template with the `treeNode` directive.
The template receives an `ITreeNodeHolder`: `node.name` is the display name (from `nameProvider`)
and `node.data` is your original object. Import `TreeComponent` and `TreeNodeDirective`.

```html
<ui-tree [nodes]="nodes" [adapter]="adapter">
  <ng-template treeNode let-node>{{ node.name }}</ng-template>
</ui-tree>
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

`treeHeight` and `itemHeight` set the tree's overall height and its row height, and the `actions`
mapping binds keyboard and mouse handlers (`click`, `rightClick`, key bindings) to your own callbacks.
