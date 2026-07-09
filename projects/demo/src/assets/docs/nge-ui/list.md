---
title: List
description: Render a virtual, filterable list of items with your own item template or a ready-made article layout.
---

# List

`ui-list` renders a list that stays smooth over large collections through virtual scrolling. You
supply the items and an item template; the component handles windowing, optional selection and text
filtering.

## Usage

`idField` is required and names the property that uniquely identifies an item. Project the item
template with `ui-list-template`.

```html
<ui-list [idField]="'id'" [items]="articles" [filter]="query" [filterBy]="['title', 'summary']">
  <ui-list-template>
    <ng-template let-item="item">
      <ui-list-item-article [articleTitle]="item.title" [articleDescription]="item.summary" />
    </ng-template>
  </ui-list-template>
</ui-list>
```

## Inputs

- `idField` (required): the property that identifies an item.
- `items`: the array to render.
- `filter` and `filterBy`: a search term and the fields to match it against.
- `selectable`: allow items to be selected.
- `trackBy`: property used to track items across changes.
- `containerClass`: extra class on the list container.

## Item templates

`ui-list-template` projects a template into a slot of the list; use `slot` to target the item,
selection or empty states, and `when` to pick a template conditionally. `ui-list-item-article` is a
ready-made row layout with a title, description, banner, icon and tags, so common lists need no
custom markup.
