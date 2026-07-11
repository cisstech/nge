# Authoring docs with `@cisstech/nge:docs`

The builder scans a `docs/` folder into a `manifest.json` and copies every `.md`
next to it. At runtime, `docsFromManifest('assets/docs/manifest.json')` turns that
manifest into navigation.

## Folder convention

- One page per `.md` file. A folder becomes a nested page.
- A folder's `index.md` is that folder's own content (its landing page).
- The root `index.md` is the site landing page, served at the site `root`.
- File and folder names map to routes: `guide/getting-started.md` becomes
  `<root>/guide/getting-started`.

## Titles, order, and icons

Each entry resolves in this order: `_meta.json` wins, then frontmatter, then the
humanized file name (`getting-started` becomes `Getting started`).

Frontmatter (YAML at the top of a `.md`):

```md
---
title: Getting started
description: Install and configure the library.
icon: rocket
order: 1
draft: false
---
```

- `draft: true` drops the page from the output.
- `order` sorts entries that share the same `_meta.json` rank.

`_meta.json` (one per folder) drives navigation order through its key order, and
overrides labels, icons, or visibility:

```json
{
  "getting-started": { "title": "Getting started", "icon": "rocket" },
  "advanced": { "title": "Advanced" },
  "changelog": { "display": "hidden" },
  "github": { "title": "GitHub", "href": "https://github.com/cisstech/nge" }
}
```

- Keys are matched against file/folder names (without the `.md` extension).
- `display: "hidden"` keeps an entry out of the navigation.
- An entry with `href` and no backing file becomes an external link.

Sorting: `_meta.json` key order first, then frontmatter `order`, then alphabetical.

## Wiring the builder

Declare a target in `angular.json`:

```json
"docs": {
  "builder": "@cisstech/nge:docs",
  "options": {
    "docsDir": "docs",
    "outputPath": "src/assets/docs",
    "name": "My library",
    "root": "/docs",
    "assetsBase": "assets/docs"
  }
}
```

Run it with `ng run <project>:docs` (add `--watch` to rebuild on change), then
point the route at the emitted manifest:

```ts
{ path: 'docs', loadChildren: () => NgeDocModule, data: docsFromManifest('assets/docs/manifest.json') }
```

`outputPath` is where the manifest and copied markdown land (usually an assets
folder). `assetsBase` is the url those files are served from at runtime, so it
must match how `outputPath` is exposed by the app.
