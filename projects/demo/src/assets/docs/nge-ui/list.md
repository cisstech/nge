---
title: List
description: Render a filterable list of items with your own item template or a ready-made article layout.
---

# List

`ui-list` renders a list from your items and an item template, with optional selection and text
filtering built in.

## Live example

<ui-list-demo></ui-list-demo>

## Usage

`idField` is required and names the property that uniquely identifies an item. Project the item
template with `ui-list-template`.

```html
<ui-list [idField]="'id'" [items]="articles" [filter]="query" [filterBy]="['title', 'summary']">
  <ui-list-template slot="row">
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

`ui-list-template` projects a template into a slot of the list. `slot` targets where it renders:
`row` for each item, plus `selection`, `header`, `empty` and `noresult`. Use `when` to pick a
template conditionally. `ui-list-item-article` is a ready-made row layout with a title, description,
banner, icon and tags, so common lists need no custom markup.
