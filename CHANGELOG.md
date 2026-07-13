# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [22.4.2](https://github.com/cisstech/nge/compare/v22.4.1...v22.4.2) (2026-07-13)


### Bug Fixes

* **markdown:** restore shiki/stackblitz runtime, isolate the StackBlitz SDK ([fc7a29e](https://github.com/cisstech/nge/commit/fc7a29ee650cdf7a632942a23e92ec3ddc7b171b))

### [22.4.1](https://github.com/cisstech/nge/compare/v22.4.0...v22.4.1) (2026-07-13)


### Bug Fixes

* **doc:** let ng-add survive Nx workspaces ([ccb5083](https://github.com/cisstech/nge/commit/ccb50839b88f257849d0923ac631cecbe22fe105))
* **markdown:** keep optional peers out of consumer builds ([f4cbff3](https://github.com/cisstech/nge/commit/f4cbff3a63002db5be86141a35168f259017f362))

## [22.4.0](https://github.com/cisstech/nge/compare/v22.3.0...v22.4.0) (2026-07-13)


### Features

* **doc:** add the docs compiler (scan docs/ into a manifest) ([fd24aa1](https://github.com/cisstech/nge/commit/fd24aa1b5945333651a2a85977107bbf13fb8e85))
* **doc:** add the manifest model and a pluggable search contract ([b696530](https://github.com/cisstech/nge/commit/b69653073820e7954ad9cc39bad10b4756e268d0))
* **doc:** emit manifest.json and copy markdown via buildDocs ([33117a0](https://github.com/cisstech/nge/commit/33117a0c8e5e3c816491379aaecd1bc777ad0ec4))
* **doc:** load a build-time manifest at runtime via docsFromManifest ([a237446](https://github.com/cisstech/nge/commit/a237446319a38c875c1ad493a2335773c4640161))
* **nge-doc-mcp:** MCP server exposing a docs site to AI agents ([78bb251](https://github.com/cisstech/nge/commit/78bb251ef72b9a0b577d8ad6af13e733b2782049))
* **nge-doc:** add @cisstech/nge:docs architect builder ([492317e](https://github.com/cisstech/nge/commit/492317e79f295bace9278c2748a87d0abfb08571))
* **nge-doc:** AI outputs served in place from public/ (M5 + turnkey output) ([7eb5348](https://github.com/cisstech/nge/commit/7eb5348ffe1105a189ca088f8426e4a92d1df2ba))
* **nge-doc:** build-time search index (M6) ([b67b9b3](https://github.com/cisstech/nge/commit/b67b9b3b556e77b8576f2f2fcc495019aa6badfb))
* **nge-doc:** emit per-page canonical, Open Graph and Twitter tags ([292fa57](https://github.com/cisstech/nge/commit/292fa57b54ceb7e4e0df4168d4e855c946e26012))
* **nge-doc:** emit sitemap.xml and robots.txt from the compiler ([e5a6657](https://github.com/cisstech/nge/commit/e5a66573a2baf90f968f82127e1c9f4f35eeb637))
* **nge-doc:** generate an API reference from TypeScript sources ([624e1e8](https://github.com/cisstech/nge/commit/624e1e85e371da5a2a51680f9184c35597775a4e))
* **nge-doc:** let a site place its sections in the navbar (nav: tabs) ([fd12cc8](https://github.com/cisstech/nge/commit/fd12cc82c107846fbcb2ba5d0448b7bacf0d06df))
* **nge-doc:** prerender the manifest docs route (SSG) with transfer state ([5847438](https://github.com/cisstech/nge/commit/5847438b2412a253e4ce196a8f0d806805354105))
* **nge-doc:** record sourcePath and last-updated, show edit/updated in the layout ([59a32d4](https://github.com/cisstech/nge/commit/59a32d4b351e6aba950e30fc10abbd115ff282a3))
* **nge-doc:** refine search UX with breadcrumbs and highlighted excerpts ([8ece587](https://github.com/cisstech/nge/commit/8ece58714354fe3ae12e68197d0f66f81cde31a9))
* **nge-doc:** ship the SSR wiring as a doc/ssr entry point (M7.1) ([1191d74](https://github.com/cisstech/nge/commit/1191d74e2fd518b8de8828617c66b583a68736bb))
* **nge-markdown,nge-monaco:** provide functions with composable features ([dda1de5](https://github.com/cisstech/nge/commit/dda1de5325535c31ee856136722dd8d1e8594314))
* **nge-markdown:** open code snippets in StackBlitz ([db879ac](https://github.com/cisstech/nge/commit/db879ac6a6b1b7961bf8132c1e2a99c270dbf39c))
* **nge-markdown:** shiki static highlighting and shared code-block chrome ([e9b831a](https://github.com/cisstech/nge/commit/e9b831aba9aebacfcc29ab13c5826e51a1d827b2))
* **nge:** ng add sets up nge-doc turnkey ([9b57fd2](https://github.com/cisstech/nge/commit/9b57fd25999b2bd8199c07194f44b3d54872c8b9))


### Bug Fixes

* **markdown:** access window lazily so the compiler imports on the server ([578cb89](https://github.com/cisstech/nge/commit/578cb89f789d72da6f79588f84ce2fa1cfd81b95))
* **nge-doc:** link {[@link](https://github.com/link)} references to their pages in the API reference ([971e03f](https://github.com/cisstech/nge/commit/971e03fd0df29e4842fe58bfbca0f41f2fcfa95c))
* **nge-markdown:** make tabbed-set, katex and the monaco highlighter SSR-safe ([cb8a72f](https://github.com/cisstech/nge/commit/cb8a72f9d998bd0ada1d83eb618e4b5d27c4092e))

## [22.3.0](https://github.com/cisstech/nge/compare/v22.2.1...v22.3.0) (2026-07-10)


### Features

* **doc,markdown:** lift the skeleton exactly when content paints ([eee6df9](https://github.com/cisstech/nge/commit/eee6df9efbcc8c9b2fd94dd63b65a059a500ef96))
* **doc:** show a skeleton while a page loads and renders ([e2cdde9](https://github.com/cisstech/nge/commit/e2cdde9abbfbee0edbc9e1646586848b2113fd49))
* **monaco,markdown:** accept an array of darkThemeClassName values ([f43dc97](https://github.com/cisstech/nge/commit/f43dc97a80860a9e5f5c7410ce1da503798c49fc))


### Bug Fixes

* **ci:** disable setup-node's package-manager cache ([998da57](https://github.com/cisstech/nge/commit/998da576d7d88501c30c3eb23d93a11f6224d17a))
* **doc:** type awaitMarkdownRender without explicit any ([1fa2706](https://github.com/cisstech/nge/commit/1fa27068aaad819833a91b66a42056ca39d2306a))
* **markdown:** stop parsing LaTeX display math as markdown ([6bbb0da](https://github.com/cisstech/nge/commit/6bbb0da3c062808768fed94b4f68ba9043dddafc)), closes [#335](https://github.com/cisstech/nge/issues/335)
* **monaco:** overlay the loading placeholder instead of stacking it ([12bf293](https://github.com/cisstech/nge/commit/12bf293414a1f06b7bdf1f4a23108d40ccaadae2))
* **monaco:** reserve the code file tab before colorizing ([a239049](https://github.com/cisstech/nge/commit/a2390494d0e6c1eae3456cf4596ffa6cea5a7b0d))

### [22.2.1](https://github.com/cisstech/nge/compare/v22.2.0...v22.2.1) (2026-07-10)


### Features

* **monaco:** add the github-dark editor theme ([357752a](https://github.com/cisstech/nge/commit/357752afa7bc3ad2bce648f8103b063e65037021)), closes [#0d1117](https://github.com/cisstech/nge/issues/0d1117)
* **monaco:** make the editor border themeable ([b8d8cec](https://github.com/cisstech/nge/commit/b8d8cecb64aefb63b4ac34a68d4638bde63bd862))

## [22.2.0](https://github.com/cisstech/nge/compare/v22.1.0...v22.2.0) (2026-07-10)

## [22.1.0](https://github.com/cisstech/nge/compare/v22.0.1...v22.1.0) (2026-07-10)


### ⚠ BREAKING CHANGES

* **ui:** 21.0.0 note in favour of levelAccessor/childrenAccessor). The
tree uses it only as a standalone expansion control (it renders its own flat
list, not via cdk-tree), so replace it with a tiny local FlatTreeControl backed
by a SelectionModel (identity-keyed, matching the previous trackBy). No
behaviour change; build:lib and the tests (21/21) pass.

### Bug Fixes

* **ci:** run CI on yarn 4 via corepack ([9413637](https://github.com/cisstech/nge/commit/9413637d4f6638cba673aea3ddea69dfa45d885f))
* **release:** build the GitHub release notes from the changelog ([c023429](https://github.com/cisstech/nge/commit/c023429f5fc9273663aea238f1442a53dc7cd65f))
* **release:** deepen the release checkout and run the post-build version sync ([dc01d26](https://github.com/cisstech/nge/commit/dc01d26e371e78acc67ad4796d283ce37233e3e2))
* **release:** push the release tag so the GitHub release can be created ([8d660cb](https://github.com/cisstech/nge/commit/8d660cb00adf317e634399111937ab57b4b3337b))
* **ui:** use a sober, theme-adaptive tree selection ([ead3c7e](https://github.com/cisstech/nge/commit/ead3c7e9c2c2822ce1edd3fd5c56ae498ee6302b))


* **ui:** replace the deprecated CDK FlatTreeControl with a local control ([708893b](https://github.com/cisstech/nge/commit/708893b4e8d70322dadf790d648a8af2b0501583))

### [22.0.1](https://github.com/cisstech/nge/compare/v22.0.0...v22.0.1) (2026-07-09)


### Bug Fixes

* **doc:** route internal Markdown links through the router ([85d57ff](https://github.com/cisstech/nge/commit/85d57ffdab6a1d329611d3bd760af90d8133fe23))

## [22.0.0](https://github.com/cisstech/nge/compare/v18.3.0...v22.0.0) (2026-07-09)

Angular 22 release: a rebuilt `nge/doc` engine (pluggable theming, light/dark default theme, command palette, keyboard navigation) and a signal-first rewrite across the libraries.

### Features

* **doc:** new minimal default theme with light and dark support ([ed3beef](https://github.com/cisstech/nge/commit/ed3beef045224c4d4da0caf2a7683706970f02cd))
* **doc:** add a command-palette search (Cmd/Ctrl+K) ([b535194](https://github.com/cisstech/nge/commit/b535194959e3c1b918eb25ffe6784008c9fb6c9e))
* **doc:** make consumer icons theme-aware in light and dark ([e6e3ea2](https://github.com/cisstech/nge/commit/e6e3ea2632f7333ea05dc69ef05d708dfe584025))
* **monaco:** auto-switch the theme from a light/dark color scheme ([be51305](https://github.com/cisstech/nge/commit/be51305062ea6ac174b9b4d79b462b73136da863))
* **doc:** navbar, markdown-renderer and dark-mode provide features ([771e8b2](https://github.com/cisstech/nge/commit/771e8b2a1079fc789796210793e11dbd043fbb58))
* **doc:** render header navbar, sidebar group icons and a TOC back-to-top ([a0b9c77](https://github.com/cisstech/nge/commit/a0b9c77e73b816476e4fd2567b1ba4ce264db2e6))
* **doc:** per-page SEO (title + meta description) with frontmatter support ([38160a2](https://github.com/cisstech/nge/commit/38160a24425171176f8fd92de698e90c7467874a))
* **doc:** fixed brand, in-sync navigation, aligned monaco dark class ([a0f0c51](https://github.com/cisstech/nge/commit/a0f0c5180a92b11ab207e9b7fb86e442ab78baa9))
* **doc:** keyboard page navigation with discoverable hints ([c7463c3](https://github.com/cisstech/nge/commit/c7463c33fd2458ac7114b2d9e4aa9a6dc4f93a02))
* **doc:** redesign the default theme sidebar ([64904fd](https://github.com/cisstech/nge/commit/64904fd88e46b77e19742e7e53f9099810da8378))
* **doc:** section separators in the sidebar ([a8dba41](https://github.com/cisstech/nge/commit/a8dba41e239889751473cb742c912827f4ac13e2))
* **doc:** translatable theme wording via withLabels ([56f2f7c](https://github.com/cisstech/nge/commit/56f2f7c94252d1d05e681d55813fbe266469727e))
* **markdown:** embed components in Markdown by keyword ([8615239](https://github.com/cisstech/nge/commit/86152391a74cd66e332e81be6e80cd73826992a6))

### Bug Fixes

* **monaco:** ship the global monaco types reference and widen the editor peer ([19b4306](https://github.com/cisstech/nge/commit/19b4306e2735380864f8c8770a68503a5b6515ba))
* **doc:** only manage the document color scheme while the docs are mounted ([9d2fca0](https://github.com/cisstech/nge/commit/9d2fca02e4ad6a2606f25cd9936c2fb3c6430ba1))
* **doc:** resolve links on a copy so consumer settings are not mutated ([1bcee72](https://github.com/cisstech/nge/commit/1bcee728a50dd4b56bec22fe4ec8f0378ebe5df0))
* **doc:** drive Monaco code colors through nge-monaco color-scheme sync ([3d034f6](https://github.com/cisstech/nge/commit/3d034f696af5d721d0c2f47c106663e02fe34c61))

## 18.3.0 (2025-11-07)

### 18.2.2 (2025-11-06)

### 18.2.1 (2025-03-04)

## 18.2.0 (2025-03-04)


### Bug Fixes

* **nge-monaco:** code viewer overflow ([8635c62](https://github.com/cisstech/nge/commit/8635c621f438044a52b4615d414b635dfb09461a))

## [18.1.0](https://github.com/cisstech/nge/compare/v18.0.4...v18.1.0) (2025-03-03)


### Features

* **nge-monaco:** display filename/copy/download in code viewer ([53683a2](https://github.com/cisstech/nge/commit/53683a288e0eefe5845e316cce618fd8c28b44a8))

### 18.0.4 (2024-08-27)

### 18.0.3 (2024-08-27)

### 18.0.2 (2024-08-27)


### Bug Fixes

* **monaco:** missing declaration file on build output ([d12a85a](https://github.com/cisstech/nge/commit/d12a85ad59a5391c5e8b90752de9a087ef952acd))

### 18.0.1 (2024-08-27)

## [18.0.0](https://github.com/cisstech/nge/compare/v17.7.1...v18.0.0) (2024-08-26)

### [17.7.1](https://github.com/cisstech/nge/compare/v17.7.0...v17.7.1) (2024-02-26)

### Features

- **ui:** allow to pass template ref as list item action title ([b542995](https://github.com/cisstech/nge/commit/b542995258003cbceb75849e1dd63b686b3ae2af))

## [17.7.0](https://github.com/cisstech/nge/compare/v17.6.3...v17.7.0) (2024-02-09)

### Bug Fixes

- **doc:** not found always visible initial render ([5f522e7](https://github.com/cisstech/nge/commit/5f522e73481afb6e90b9ab6e6d142a1bf2b1fc89))

### [17.6.3](https://github.com/cisstech/nge/compare/v17.6.1...v17.6.3) (2024-01-24)

### Bug Fixes

- **doc:** path detection ([ff607b0](https://github.com/cisstech/nge/commit/ff607b039e29b1d0a6c11da4f6bb80709ec8cf70))

### [17.6.1](https://github.com/cisstech/nge/compare/v17.6.0...v17.6.1) (2024-01-24)

### Bug Fixes

- **doc:** should not skip initial state change ([b104ee0](https://github.com/cisstech/nge/commit/b104ee0fa714555038dab7f2c93f699200023980))

## [17.6.0](https://github.com/cisstech/nge/compare/v17.5.1...v17.6.0) (2024-01-24)

### Bug Fixes

- **doc:** direct path access not work if custom baseHref is defined ([42b6a4c](https://github.com/cisstech/nge/commit/42b6a4c795c99457fa013df443b5e5424bd51039))
- **services:** ngOnChanges not called for dynamic compiled components ([f58c5ae](https://github.com/cisstech/nge/commit/f58c5ae04e8345dc67b4b8af23c61e1546071e22))

### [17.5.1](https://github.com/cisstech/nge/compare/v17.5.0...v17.5.1) (2024-01-21)

### Bug Fixes

- **elements:** use module injector ([b0ca2a3](https://github.com/cisstech/nge/commit/b0ca2a315beffcbb7bef158b9657d13a59d24ca1))

## [17.5.0](https://github.com/cisstech/nge/compare/v17.4.0...v17.5.0) (2024-01-21)

### Features

- **elements:** load from component ([d0ca83d](https://github.com/cisstech/nge/commit/d0ca83d2a501fab557d87076702978436897d942))
- **monaco:** dynamic theme loading ([2f4f184](https://github.com/cisstech/nge/commit/2f4f184c7f027e525dd02e87428a0fefa9249b50))

### Bug Fixes

- **doc:** initial render run twice ([eb1b9f9](https://github.com/cisstech/nge/commit/eb1b9f99f48f75d2702bd778856cbc979d435994))
- **markdown:** emoji contribution slow down rendering ([e60a0d2](https://github.com/cisstech/nge/commit/e60a0d2a19ac7a793251dd5af4c15f1ccfec63b8))

## [17.4.0](https://github.com/cisstech/nge/compare/v17.3.0...v17.4.0) (2024-01-06)

### ⚠ BREAKING CHANGES

- **ui:** dialog module no longer a part of this lib

### Features

- **directives:** add viewport intersection ([2e7022c](https://github.com/cisstech/nge/commit/2e7022ca7a577c23c7ca08809a6704da65389388))
- standalone pipes and directives ([3af14db](https://github.com/cisstech/nge/commit/3af14dbe8e5f015a79958686fa70b4e6d2381008))
- **ui:** allow to pass template-ref to ui-list-item-article ([ee922b7](https://github.com/cisstech/nge/commit/ee922b79667512f42b30fe19cd9e9ba900d579a9))

### Bug Fixes

- **markdown:** initial opacity ([427b56e](https://github.com/cisstech/nge/commit/427b56ed5a29f6080e58845c9107368d55083172))
- **services:** resource loader provider type ([4c3ba29](https://github.com/cisstech/nge/commit/4c3ba29145edd8fd9d22e7d810c2b0f7b8df40d3))

- **ui:** drop deprecated dialog module ([1ecddf0](https://github.com/cisstech/nge/commit/1ecddf04ec15a5920b4e058bc2811139daa8ac78))

## [17.3.0](https://github.com/cisstech/nge/compare/v17.2.0...v17.3.0) (2024-01-03)

### Features

- **services:** expose ResourceLoaderConfigProvider token ([7a77eb8](https://github.com/cisstech/nge/commit/7a77eb829adec1b6770694c8dc1492672bdada01))

## [17.2.0](https://github.com/cisstech/nge/compare/v17.1.0...v17.2.0) (2024-01-03)

### Features

- **doc:** add backIconUrl config ([26cdcd4](https://github.com/cisstech/nge/commit/26cdcd4489a9177000a51503b37d694811e11f07))
- **nge-doc:** add backUrlHref config ([4db2cb6](https://github.com/cisstech/nge/commit/4db2cb643509d42a9287981d97c89e8584b389e3))
- **services:** add useDocumentBaseURI config on resource loader ([f41f0c4](https://github.com/cisstech/nge/commit/f41f0c47a18fc346a7c27fc94a8681ddd5126e65))

## [17.1.0](https://github.com/cisstech/nge/compare/v17.0.0...v17.1.0) (2023-12-10)

### Features

- **doc:** inherit colors from ancestors ([62cbb2e](https://github.com/cisstech/nge/commit/62cbb2eb2ab32f694698b1e34be64f08b7992035))
- **markdown:** support dark theme ([abaa169](https://github.com/cisstech/nge/commit/abaa169711440ffad8507682a9930195f438086b))
- **monaco:** add theme input on viewer ([a658439](https://github.com/cisstech/nge/commit/a658439cade2db650f35a97b7dcb6b29fa46cd10))

## [17.0.0](https://github.com/cisstech/nge/compare/v16.0.1...v17.0.0) (2023-12-09)

### Features

- **ui:** add containerClass input on ui-list-component ([c37a1ef](https://github.com/cisstech/nge/commit/c37a1effbc5bee65e6b821d00ed6866d8e0bc382))

### [16.0.1](https://github.com/cisstech/nge/compare/v16.0.0...v16.0.1) (2023-09-11)

## [16.0.0](https://github.com/cisstech/nge/compare/v15.2.4...v16.0.0) (2023-09-11)

### [15.2.4](https://github.com/cisstech/nge/compare/v15.2.3...v15.2.4) (2023-08-22)

### Bug Fixes

- admonitions are now working inside admonitions ([4eeb4fe](https://github.com/cisstech/nge/commit/4eeb4fe082d17745788c572988f16f89612bfa85))

### [15.2.3](https://github.com/cisstech/nge/compare/v15.2.2...v15.2.3) (2023-06-07)

### [15.2.2](https://github.com/cisstech/nge/compare/v15.2.1...v15.2.2) (2023-06-06)

### Bug Fixes

- **markdown:** remove \* selector on github theme ([28573de](https://github.com/cisstech/nge/commit/28573deb210ad6092cda89484c9b2f30d4711950))

### [15.2.1](https://github.com/cisstech/nge/compare/v15.2.0...v15.2.1) (2023-04-25)

### Bug Fixes

- **ui:** tree component rendering ([e6740c7](https://github.com/cisstech/nge/commit/e6740c7f90ad532c7cf25ab13b0b8aea0754e4d6))

## [15.2.0](https://github.com/cisstech/nge/compare/v15.1.0...v15.2.0) (2023-02-24)

### Features

- **utils:** add deepEqual fn ([b07654a](https://github.com/cisstech/nge/commit/b07654a0fdf35185a3141cdc6b8def92300916ad))

## [15.1.0](https://github.com/cisstech/nge/compare/v15.0.3...v15.1.0) (2023-02-16)

### Features

- expose icon service ([0cf3643](https://github.com/cisstech/nge/commit/0cf36435820ab99b61c14cbe81a5f32988d83342))

### [15.0.3](https://github.com/cisstech/nge/compare/v15.0.2...v15.0.3) (2023-02-16)

### [15.0.2](https://github.com/cisstech/nge/compare/v15.0.1...v15.0.2) (2023-02-16)

### [15.0.1](https://github.com/cisstech/nge/compare/v15.0.0...v15.0.1) (2023-02-16)

### Bug Fixes

- angular material breaking changes ([d6c1a8c](https://github.com/cisstech/nge/commit/d6c1a8cedce58a72c3e81bdfbecd5adb6c86663e))

## [15.0.0](https://github.com/cisstech/nge/compare/v13.2.0...v15.0.0) (2023-01-23)

### Bug Fixes

- **utils:** fix deepCopy fn ([966693b](https://github.com/cisstech/nge/commit/966693b546670fba912fb33629c3ee2298fd403e))

## [13.2.0](https://github.com/cisstech/nge/compare/v13.1.5...v13.2.0) (2023-01-22)

### Features

- **libs:** add directives sub-entry ([d92dd9e](https://github.com/cisstech/nge/commit/d92dd9e216c7042fe2752a681a0b70afd1f6be89))
- **libs:** add utils sub-entry ([3e9e281](https://github.com/cisstech/nge/commit/3e9e281febdf3d4e3cf978d1d99dad9a3d2f0e89))

### Bug Fixes

- **ui:** tree component rendering [#4](https://github.com/cisstech/nge/issues/4) ([4347601](https://github.com/cisstech/nge/commit/4347601d8548eecc60f13c2c35dd78e2a19b5b2a))

### [13.1.5](https://github.com/cisstech/nge/compare/v13.1.4...v13.1.5) (2022-02-09)

### Bug Fixes

- **elements:** import from [@cisstech](https://github.com/cisstech) instead of dist ([08a7e19](https://github.com/cisstech/nge/commit/08a7e196cc86dc57dcc0823d6ed9d061fe0c1faa))
- **elements:** providers defined in root injector not found in custom elements ([f846a98](https://github.com/cisstech/nge/commit/f846a98b03bc65d2c0a752565b506fffa82016fc))

### [13.1.4](https://github.com/cisstech/nge/compare/v13.1.3...v13.1.4) (2022-02-08)

### [13.1.3](https://github.com/cisstech/nge/compare/v13.1.2...v13.1.3) (2022-02-08)

### [13.1.2](https://github.com/cisstech/nge/compare/v13.1.1...v13.1.2) (2022-02-08)

### [13.1.1](https://github.com/cisstech/nge/compare/v13.1.0...v13.1.1) (2022-01-17)

### Bug Fixes

- **ui:** tree leaf not editable ([b3cc4b2](https://github.com/cisstech/nge/commit/b3cc4b20d9b3c2d396e4bebd029ed18395c5aa07))

## 13.1.0 (2022-01-17)

### Features

- add file icons ([2d034b4](https://github.com/cisstech/nge/commit/2d034b4fdddac4b68a332754aaa24aa0acf77b5b))
- add nge-doc source ([73f29be](https://github.com/cisstech/nge/commit/73f29be05635b37cdee556a861a9b6ac7e040238))
- add nge-elements lib ([cc6cc80](https://github.com/cisstech/nge/commit/cc6cc803e50a2194f88c8ca571849e2464ba0b62))
- add nge-markdown source ([cb550f0](https://github.com/cisstech/nge/commit/cb550f0572563c9c1e3e86bd63df564efab28de7))
- add nge-monaco source ([4c642ea](https://github.com/cisstech/nge/commit/4c642eac2ad26f4d3601a01a50db9dec7c56ce18))
- add pipes lib ([745e3cb](https://github.com/cisstech/nge/commit/745e3cbb439f759f6fd6de1ebe906b0461134bbd))
- add services lib ([fc150aa](https://github.com/cisstech/nge/commit/fc150aa28b15a7d34d6d7ce6a93b7dff278063e5))
- add ui-dialog lib ([c07d7f2](https://github.com/cisstech/nge/commit/c07d7f2eb01d1e032326e80091d56e74d3252eb6))
- add ui-icon lib ([99e135e](https://github.com/cisstech/nge/commit/99e135e6cc9db54960b8942ea6e25d7f2621777b))
- add ui-list lib ([2695751](https://github.com/cisstech/nge/commit/2695751474693e702d0bf5abbc4b393dea6adf4a))
- add ui-tree lib ([64beceb](https://github.com/cisstech/nge/commit/64beceba0a53a4879af6e6e78d75e7df05d792be))
- **nge-doc:** support multiple pages ([a0aff22](https://github.com/cisstech/nge/commit/a0aff228afa8e47f76b2e9748086b9f415e8acc4))
- **ui-icon:** add icongr ([8446165](https://github.com/cisstech/nge/commit/8446165a326e2322ed798c4e333af29915edbb26))
- **ui-icons:** add api to add extra icons ([4191edd](https://github.com/cisstech/nge/commit/4191edd1302dd453142c8d44582643d35cde4452))

### Bug Fixes

- bugs with rendering algorithm ([b99bce0](https://github.com/cisstech/nge/commit/b99bce0d5093812733d90e65ce866ca98eff9767))
- Can only have one anonymous define call per script file while loading katex after monaco editor ([67c915e](https://github.com/cisstech/nge/commit/67c915e7d03fc3d49c440732caa7f54b487c7376))
- circular import ([441a374](https://github.com/cisstech/nge/commit/441a3747eca6941d3e2683d31f09267f804089c6))
- missing semicolon in scss file ([560e7d0](https://github.com/cisstech/nge/commit/560e7d09c92509724f98af11dd8851232d707d06))
- **nge-doc:** anchor navigation ([50603f5](https://github.com/cisstech/nge/commit/50603f5d667b72e62891c1f123562773f31ab2bf))
- **nge-doc:** handle root navigation ([8f797a0](https://github.com/cisstech/nge/commit/8f797a04c95fb04df514c98ea1a22ce3d5ab72c3))
- **nge-monaco:** loader not working when another script depend on window.require ([e7d5e7b](https://github.com/cisstech/nge/commit/e7d5e7b6a30f1914176e84ac5f04232cc36fa340))
- **ui:** strange behavior while navigating with keyboard on tree ([eb0e213](https://github.com/cisstech/nge/commit/eb0e21338a45bb3f388811c9fa32ef5fc8fdf74e))
- **ui:** tree editing mode behave strange ([fd54c58](https://github.com/cisstech/nge/commit/fd54c58f206017790ddfbfe5dede727e0a498262))
- **ui:** tree filtering not working ([ee246e7](https://github.com/cisstech/nge/commit/ee246e7a144fc9e491715be280e04b0ada10fd17))
- virtual scroll not working with tree component ([c6572dc](https://github.com/cisstech/nge/commit/c6572dcfc6c0c809f15b178bfba286f82113419a))

### [0.0.19](https://github.com/cisstech/nge/compare/v0.0.18...v0.0.19) (2021-12-04)

### [0.0.18](https://github.com/cisstech/nge/compare/v0.0.17...v0.0.18) (2021-12-04)

### Bug Fixes

- Can only have one anonymous define call per script file while loading katex after monaco editor ([67c915e](https://github.com/cisstech/nge/commit/67c915e7d03fc3d49c440732caa7f54b487c7376))
- virtual scroll not working with tree component ([c6572dc](https://github.com/cisstech/nge/commit/c6572dcfc6c0c809f15b178bfba286f82113419a))

### [0.0.17](https://github.com/cisstech/nge/compare/v0.0.16...v0.0.17) (2021-11-30)

### Bug Fixes

- bugs with rendering algorithm ([b99bce0](https://github.com/cisstech/nge/commit/b99bce0d5093812733d90e65ce866ca98eff9767))

### [0.0.16](https://github.com/cisstech/nge/compare/v0.0.15...v0.0.16) (2021-11-28)

### Bug Fixes

- **ui:** tree editing mode behave strange ([fd54c58](https://github.com/cisstech/nge/commit/fd54c58f206017790ddfbfe5dede727e0a498262))

### [0.0.15](https://github.com/cisstech/nge/compare/v0.0.14...v0.0.15) (2021-11-28)

### [0.0.14](https://github.com/cisstech/nge/compare/v0.0.13...v0.0.14) (2021-11-27)

### [0.0.13](https://github.com/cisstech/nge/compare/v0.0.12...v0.0.13) (2021-11-25)

### [0.0.12](https://github.com/cisstech/nge/compare/v0.0.11...v0.0.12) (2021-11-21)

### Bug Fixes

- **ui:** strange behavior while navigating with keyboard on tree ([eb0e213](https://github.com/cisstech/nge/commit/eb0e21338a45bb3f388811c9fa32ef5fc8fdf74e))

### [0.0.11](https://github.com/cisstech/nge/compare/v0.0.10...v0.0.11) (2021-11-21)

### [0.0.10](https://github.com/cisstech/nge/compare/v0.0.9...v0.0.10) (2021-11-21)

### Bug Fixes

- **ui:** tree filtering not working ([ee246e7](https://github.com/cisstech/nge/commit/ee246e7a144fc9e491715be280e04b0ada10fd17))
- missing semicolon in scss file ([560e7d0](https://github.com/cisstech/nge/commit/560e7d09c92509724f98af11dd8851232d707d06))

### 0.0.9 (2021-11-21)

### Features

- add file icons ([2d034b4](https://github.com/cisstech/nge/commit/2d034b4fdddac4b68a332754aaa24aa0acf77b5b))
- add nge-doc source ([73f29be](https://github.com/cisstech/nge/commit/73f29be05635b37cdee556a861a9b6ac7e040238))
- add nge-markdown source ([cb550f0](https://github.com/cisstech/nge/commit/cb550f0572563c9c1e3e86bd63df564efab28de7))
- add nge-monaco source ([4c642ea](https://github.com/cisstech/nge/commit/4c642eac2ad26f4d3601a01a50db9dec7c56ce18))
- add pipes lib ([745e3cb](https://github.com/cisstech/nge/commit/745e3cbb439f759f6fd6de1ebe906b0461134bbd))
- add services lib ([fc150aa](https://github.com/cisstech/nge/commit/fc150aa28b15a7d34d6d7ce6a93b7dff278063e5))
- add ui-dialog lib ([c07d7f2](https://github.com/cisstech/nge/commit/c07d7f2eb01d1e032326e80091d56e74d3252eb6))
- add ui-icon lib ([99e135e](https://github.com/cisstech/nge/commit/99e135e6cc9db54960b8942ea6e25d7f2621777b))
- add ui-list lib ([2695751](https://github.com/cisstech/nge/commit/2695751474693e702d0bf5abbc4b393dea6adf4a))
- add ui-tree lib ([64beceb](https://github.com/cisstech/nge/commit/64beceba0a53a4879af6e6e78d75e7df05d792be))
- **nge-doc:** support multiple pages ([a0aff22](https://github.com/cisstech/nge/commit/a0aff228afa8e47f76b2e9748086b9f415e8acc4))

### Bug Fixes

- **nge-doc:** anchor navigation ([50603f5](https://github.com/cisstech/nge/commit/50603f5d667b72e62891c1f123562773f31ab2bf))
- **nge-doc:** handle root navigation ([8f797a0](https://github.com/cisstech/nge/commit/8f797a04c95fb04df514c98ea1a22ce3d5ab72c3))
- **nge-monaco:** loader not working when another script depend on window.require ([e7d5e7b](https://github.com/cisstech/nge/commit/e7d5e7b6a30f1914176e84ac5f04232cc36fa340))
