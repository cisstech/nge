# nge-doc revamp

> The Nextra of Angular: document a library with live Angular demos - embedded in an app as a `/docs` route, or shipped as a static site. No other doc framework runs Angular components; that gap is the product.

Scope: `projects/nge/doc` (+ `nge/markdown`, `nge/monaco`). Single source of truth for this work.

## State

Done, on `main`:

- `provideNgeDoc()` + features, standalone components, default layout (header, sidenav, TOC, breadcrumb, pager, ⌘K search UI, theme toggle, inlined icons).
- Frontmatter parsing, dark mode, CSS tokens, copy-code.

Missing (blocks the rest):

- `NgeDocManifest` model + `settingsToManifest()` - the service still runs directly on `NgeDocSettings`.
- Pluggable `NgeDocSearchProvider` contract - only an inline `search()` on the service exists.

## Settled decisions

- Manifest-first. The compiler produces `NgeDocManifest`; the runtime consumes it. `NgeDocSettings` / `NgeDocLink` stay public via an adapter (non-breaking).
- Two-layer compiler: framework-free Node core + thin Angular builder. The Node core is reused by the MCP CLI.
- `_meta.json` is the default ordering format; `_meta.ts` (typed, esbuild-evaluated) is opt-in.
- Shiki for static highlight, Monaco for interactive editors. Shiki themes must match Monaco `github` / `github-dark` (no restyle flash on hydration).
- Playground = registry + input knobs, no JIT (no arbitrary template editing).
- Ask AI = bring-your-own-endpoint, client-side RAG over the search index.
- core / theme split: headless core (state + renderer + search) + default theme. Tokens for recolor, custom layout for the rest.
- SPA and SSG stay symmetric: every build-time feature keeps a runtime fallback so embedded-in-app docs never regress.

## Plan

Ordered. `M1` is a gate - do not start `M3`+ before it passes.

### M0 - Manifest foundation (non-breaking) ✅

- [x] `NgeDocManifest` model + `flattenPages` (pages reuse `NgeDocLink`; the compiler emits that shape in M2, no separate serializable type needed yet).
- [x] `settingsToManifest()` adapter + unit tests.
- [x] Service resolves settings through the manifest; `stateChanges` and `NgeDocLink` unchanged.
- [x] `NgeDocSearchProvider` / `NgeDocSearchDocument` contract + in-memory default provider; search moved behind it (now async, slug-based).

### M1 - SSR feasibility ✅ (go)

- [x] Audit `nge/markdown` for SSR hazards (window / DOM / Monaco).
- [x] Fix the import-time `window` crash in the compiler service.
- [x] Decision: **go**. No architectural blocker - the core pipeline uses standard DOM APIs (domino-compatible) and every `window` use is guarded or in an opt-in contribution. The only real SSG work is Monaco→Shiki. The empirical prerender is validated in M3 (real `@angular/ssr` infra, not a throwaway harness), where the remaining SSR tasks live:
  - Shiki highlight in the render pipeline.
  - Guard the KaTeX / emoji contributions for the server.
  - Prerender a page; `curl` returns full content + meta, zero hydration errors.

### M2 - Compiler (`docs/` → manifest) ✅

- [x] Node lib `@cisstech/nge/doc/compiler`: scan `docs/`, parse frontmatter + `_meta.json` → `manifest.json` (+ in-memory fixtures, tests).
- [x] Angular builder (`@cisstech/nge:docs`) wrapping the compiler; watch via a native async generator over `fs.watch`. Packaged to `dist/nge/node` (CommonJS) during `postbuild:lib`; demo target verified through `./dist/nge:docs`.
- [x] `docsFromManifest('assets/docs/manifest.json')` runtime source.
- [x] Document the convention (`docs/nge-doc-authoring.md`).

### M3 - SSG (needs M1 = go, M2) ✅

- [x] Migrate the demo to the `application` builder; prerender routes from the manifest.
- [x] Read `.md` from the filesystem at prerender; hydrate via transfer state (no client re-fetch).
- [x] CI builds the static site → GitHub Pages (`yarn build` prerenders, `404.html` fallback for the client-rendered showcase, base href `/nge/`).

SSR hazards fixed along the way (nge is now SSR-safe): import-time `window` in the monaco loader; `MutationObserver` / `window` / `document` / `NodeList` in the doc renderer and markdown contributions; a resource loader that never resolved under SSR; KaTeX and emoji guarded for the server; a `PendingTasks` gate so prerender waits for the markdown to paint. Still open: Shiki static highlight (code blocks highlight on the client for now).

### M4 - SEO (needs M3) ✅

- [x] Per-page `<title>`, description, canonical, OG / Twitter (from frontmatter, at prerender) via `withSeo`.
- [x] `sitemap.xml` + `robots.txt` from the compiler (builder `siteUrl`, moved to the site root in the demo).
- [x] "Edit on GitHub" (`sourcePath`) + "Last updated" (`git log -1`) in the manifest; shown by the default layout via `withEditLink`.

### M5 - AI outputs (needs M2) ✅

- [x] `llms.txt` + `llms-full.txt` from the compiler.
- [x] Raw `.md` served next to each HTML page (`<page>.md`).
- [x] "Copy as Markdown" + "Open in ChatGPT / Claude" in the page header (via `nge-doc-page-actions`).

Output reworked for DX: the builder writes one tree into the app's `public/` dir (manifest under the site path, each page's markdown at its page-adjacent url which the renderer fetches, and sitemap/robots/llms at the root). `ng serve` and `ng build` serve it as-is, so `/llms.txt` and `/guide/getting-started.md` work in dev with no consumer postbuild (only the GitHub Pages CSR fallback remains, and that is deploy-host specific). `assetsBase` is gone.

### M6 - Build-time search (needs M2) ✅

- [x] Compiler emits `search.json` (chunked by `##`/`###` heading, with anchors) next to the manifest.
- [x] `PrebuiltNgeDocSearchProvider` (via `withSearchIndex`) loads it lazily on first search; contract unchanged from M0.

### M7 - ng add + schematics (needs M2)

- [ ] `ng add @cisstech/nge`: scaffold `docs/`, wire the builder + route + `provideNgeDoc()`.
- [ ] `ng g @cisstech/nge:doc-page <path>`.
- [ ] Rewrite README / site around the 5-minute path.

### M8 - Differentiation (independent, minor releases; needs M2)

- [ ] Playground: `:::playground` contribution + `withPlaygrounds()` + preview/source tabs; compiler extracts sources.
- [ ] API reference: ts-morph → `api-manifest.json`, generated pages, `{@link}` resolved at build (broken link fails the build).
- [ ] Ask AI: `withAiAssistant({ endpoint })`, chunk selection via the search provider, streaming; reference edge function in the docs.
- [ ] MCP server: `npx @cisstech/nge-doc mcp` - `search_docs` / `read_page` / `list_pages`.

## Done means

- Doc site from zero in under 5 min (`ng add` → first `.md` rendered).
- A prerendered page shows full content + meta with JS disabled; Lighthouse ≥ 95.
- `llms.txt` and per-page `.md` reachable.
- [x] nge's own doc site is rebuilt on this stack (dogfooding): `/docs` is manifest-driven from `public/docs`, prerendered, with the interactive editors as markdown-embedded components.
