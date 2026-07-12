---
order: 6
title: API reference
description: Generate reference pages from TypeScript sources, rendered through the same pipeline as the rest of the docs.
---

# API reference

Point the builder at your entry points and it generates one Markdown page per
exported declaration, straight into `public/docs/api/`. Since these are ordinary
pages, they get everything the rest of the docs get: the sidebar, `Cmd/Ctrl+K`
search, prerendering, SEO and the `llms.txt` outputs. This site's
[API](/docs/api) section is generated this way, from `@cisstech/nge/doc`.

## Enable it

```bash
npm i -D typedoc
```

```json
"docs": {
  "builder": "@cisstech/nge:docs",
  "options": {
    "publicDir": "public",
    "root": "/docs",
    "name": "My docs",
    "api": {
      "entryPoints": ["projects/my-lib/src/index.ts"],
      "tsconfig": "projects/my-lib/tsconfig.lib.json"
    }
  }
}
```

`ng run my-app:docs` then writes `public/docs/api/` with an `index.md` overview,
one page per export grouped by kind (functions, classes, interfaces, type
aliases, variables), and a `_meta.json` that orders them. Add the folder to
`.gitignore`, like the other generated outputs, and rebuild it in CI.

## Notes

- `tsconfig` should exclude test files (point it at your `tsconfig.lib.json`);
  typedoc reports type errors and stops otherwise.
- Give the section a title and place it with a `_meta.json` entry at the docs
  root, for example `"api": { "title": "API" }`.
- Signatures, parameters, property tables and descriptions come from your code
  and its doc comments, so the reference never drifts from the source.
