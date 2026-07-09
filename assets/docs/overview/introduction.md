---
title: NG Essentials
description: Focused Angular building blocks. A documentation engine, a Markdown renderer, a Monaco editor integration, and a few UI and utility packages.
---

# NG Essentials

**`@cisstech/nge`** is a small set of focused building blocks for Angular apps. It ships as
one package split into secondary entry points, so you only bundle what you actually import.

## Packages

| Package | What it gives you |
| --- | --- |
| [nge/doc](/docs/nge-doc/) | Turn a route config, Markdown files or live Angular components into a documentation site (the site you are reading). |
| [nge/markdown](/docs/nge-markdown/) | Markdown rendering built on [Marked](https://github.com/markedjs/marked), with admonitions, tabs, KaTeX and syntax highlighting. |
| [nge/monaco](/docs/nge-monaco/) | [Monaco editor](https://microsoft.github.io/monaco-editor/) integration: editor, diff editor and read-only viewer. |
| [nge/ui](/docs/nge-ui/getting-started) | Standalone UI building blocks: a data tree, a filterable virtual list and a multi-source icon. |
| [Utilities](/docs/utilities/getting-started) | Root-provided services, standalone pipes and framework-free helper functions (`nge/services`, `nge/pipes`, `nge/utils`). |

## Why it exists

Every entry point solves one problem well and stays out of your way: standalone-first,
signal-based, tree-shakeable, and configured through `provide*` functions. Use one package
or all of them; you never pay for the parts you leave out.

## Where to go next

- New here? Start with [nge/doc](/docs/nge-doc/getting-started) to build a docs site like this one.
- Just need Markdown? Jump to [nge/markdown](/docs/nge-markdown/getting-started).
- Embedding an editor? See [nge/monaco](/docs/nge-monaco/getting-started).
- Source, issues and releases live on [GitHub](https://github.com/cisstech/nge).
