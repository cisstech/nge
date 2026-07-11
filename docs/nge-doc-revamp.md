# nge-doc revamp

> The Nextra of Angular: document a library with live Angular demos — embedded in an app as a `/docs` route, or shipped as a static site. No other doc framework runs Angular components; that gap is the product.

Scope: `projects/nge/doc` (+ `nge/markdown`, `nge/monaco`). Single source of truth for this work.

## State

Done, on `main`:

- `provideNgeDoc()` + features, standalone components, default layout (header, sidenav, TOC, breadcrumb, pager, ⌘K search UI, theme toggle, inlined icons).
- Frontmatter parsing, dark mode, CSS tokens, copy-code.

Missing (blocks the rest):

- `NgeDocManifest` model + `settingsToManifest()` — the service still runs directly on `NgeDocSettings`.
- Pluggable `NgeDocSearchProvider` contract — only an inline `search()` on the service exists.

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

Ordered. `M1` is a gate — do not start `M3`+ before it passes.

### M0 — Manifest foundation (non-breaking)

- [ ] `NgeDocManifest` / `NgeDocPage` model in core.
- [ ] `settingsToManifest()` adapter + unit tests.
- [ ] Service refactored onto the manifest; `stateChanges` and `NgeDocLink` unchanged.
- [ ] `NgeDocSearchProvider` + `NgeDocSearchDocument` contract; move the current search behind it.

### M1 — SSR spike (decision gate)

- [ ] Prerender one page with the `application` builder + `@angular/ssr`.
- [ ] Shiki highlight in the render pipeline for that page.
- [ ] Guard `nge/markdown` contributions (KaTeX, emoji, anchors) for the server (`isPlatformBrowser` / `afterNextRender`).
- [ ] Pass condition: `curl` returns full content + correct `<title>` / meta, zero hydration errors.
- [ ] Decision: go → M2; no-go → ship compiler + AI outputs SPA-only, defer SSG.

### M2 — Compiler (`docs/` → manifest)

- [ ] Node lib `@cisstech/nge/doc/compiler`: scan `docs/`, parse frontmatter + `_meta.json` (`.ts` opt-in) → `manifest.json` (+ fixtures, tests).
- [ ] Angular builder wrapping the compiler; watch mode under 500 ms on ~100 pages.
- [ ] `docsFromManifest('assets/docs/manifest.json')` runtime source.
- [ ] Document the convention.

### M3 — SSG (needs M1 = go, M2)

- [ ] Migrate the demo to the `application` builder; prerender routes from the manifest.
- [ ] Read `.md` from the filesystem at prerender; hydrate via transfer state (no client re-fetch).
- [ ] CI builds the static site → GitHub Pages.

### M4 — SEO (needs M3)

- [ ] Per-page `<title>`, description, canonical, OG / Twitter (from frontmatter, at prerender).
- [ ] `sitemap.xml` + `robots.txt` from the compiler.
- [ ] "Edit on GitHub" (`sourcePath`) + "Last updated" (`git log -1`), carried in the manifest.

### M5 — AI outputs (needs M2)

- [ ] `llms.txt` + `llms-full.txt` from the manifest.
- [ ] Raw `.md` served next to each HTML page.
- [ ] "Copy as Markdown" + "Open in ChatGPT / Claude" in the page header.

### M6 — Build-time search (needs M2)

- [ ] Compiler emits the search index (chunked by heading) as JSON.
- [ ] `NgeDocSearchProvider` loads the prebuilt index; contract unchanged from M0.

### M7 — ng add + schematics (needs M2)

- [ ] `ng add @cisstech/nge`: scaffold `docs/`, wire the builder + route + `provideNgeDoc()`.
- [ ] `ng g @cisstech/nge:doc-page <path>`.
- [ ] Rewrite README / site around the 5-minute path.

### M8 — Differentiation (independent, minor releases; needs M2)

- [ ] Playground: `:::playground` contribution + `withPlaygrounds()` + preview/source tabs; compiler extracts sources.
- [ ] API reference: ts-morph → `api-manifest.json`, generated pages, `{@link}` resolved at build (broken link fails the build).
- [ ] Ask AI: `withAiAssistant({ endpoint })`, chunk selection via the search provider, streaming; reference edge function in the docs.
- [ ] MCP server: `npx @cisstech/nge-doc mcp` — `search_docs` / `read_page` / `list_pages`.

## Done means

- Doc site from zero in under 5 min (`ng add` → first `.md` rendered).
- A prerendered page shows full content + meta with JS disabled; Lighthouse ≥ 95.
- `llms.txt` and per-page `.md` reachable.
- nge's own doc site is rebuilt on this stack (dogfooding).
