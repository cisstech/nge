# nge/doc - architecture (for contributors)

This is the internal map of the package. For usage, see the
[documentation site](https://cisstech.github.io/nge/docs/nge-doc). This file
describes roles and boundaries, not individual files, so it stays true as the
code moves.

## The idea

A documentation site is a **manifest** (`NgeDocManifest`: site metadata plus a
tree of pages) rendered by an Angular engine. The manifest comes from either:

- **files** - markdown under an app's `public/`, compiled to `nge-doc.json` by
  the `@cisstech/nge:docs` builder (the common path), or
- **code** - an `NgeDocSettings` object resolved at runtime.

Both produce the same manifest, so the runtime treats them identically.

## Two worlds, one boundary

The package has runtime (Angular, ships to the browser) and build-time
(Node, runs during `ng build`) code. They must not mix: the build-time code is
framework-free and is compiled to CommonJS separately (`build-nge-builder.sh`).

- **`src/`** - the runtime library, in three zones:
  - `shared/` - pure, framework-free utilities (`frontmatter`, `slug`,
    `pages`). The **only** src folder the Node builder is allowed to import, so
    the runtime and the compiler agree on things like heading slugs. Keep it
    dependency-free.
  - `core/` - the engine: types (`nge-doc`, `manifest`), the `NgeDocService`
    facade (navigation state) and its collaborators (`seo.service`,
    `sites-loader`), the `NgeDocAssets` fetch port, search, the theme service
    and the `provide*` API under `core/providers/`.
  - `ui/` - what renders: the routed `NgeDocComponent`, the `renderer`
    (turns a page into DOM) and the default `layouts/`.
- **`compiler/`** - framework-free. Scans a docs folder into a manifest and
  emits the indexes (`search.json`, `sitemap`, `robots`, `llms`, the API
  reference). Pure given a filesystem, so it is unit-tested in memory.
- **`builders/`** - the Angular architect builder wrapping the compiler.
- **`ssr/`** - the `@cisstech/nge/doc/ssr` entry: filesystem asset serving and
  prerender routes for static generation. Imports `node:*` and `@angular/ssr`.
- **`schematics/`** - `ng add` setup.

## Runtime flow

`NGE_DOC_ROUTES` mounts `NgeDocComponent`, which sets up `NgeDocService`. The
service loads the manifests (`NgeDocSitesLoader`), resolves the active page on
each navigation, and exposes signals the theme reads. The `renderer` fetches a
page's content through `NgeDocAssets` and renders it (markdown via the
configured renderer, or a component).

## Extension points

- **`provideNgeDoc(...features)`** - `withTheme`, `withBrand`, `withNavbar`,
  `withSeo`, `withSearchIndex`, `withEditLink`, `withDarkMode`, `withLabels`,
  `withMarkdownRenderer`. Each feature is just a set of providers.
- **`NgeDocAssets`** - the fetch port; `provideNgeDocSsr()` swaps in a
  filesystem implementation for prerendering.
- **`NGE_DOC_SEARCH_PROVIDER`** - plug a custom search backend; the palette UI
  is unchanged.
- **A custom theme** - a standalone component passed to `withTheme()`, rendered
  with `<nge-doc-renderer>`.

## Working on it

```bash
yarn build:lib      # build the library (and stage the Node builder)
yarn docs           # run the builder on the demo docs
yarn test           # unit tests
```

Non-negotiables: `compiler/` never imports Angular-coupled `src/` code (only
`src/shared`); heading slug logic lives once in `src/shared/slug`; new
build-time outputs go through the compiler so they inherit the pipeline.
