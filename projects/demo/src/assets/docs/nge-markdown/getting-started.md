---
title: Getting started with nge/markdown
description: Render Markdown in Angular with a GitHub-style theme, dark mode and a contribution API for admonitions, tabs, KaTeX, emoji and syntax highlighting.
---

# nge/markdown

**nge/markdown** renders Markdown in an Angular app. It is built on
[Marked](https://github.com/markedjs/marked) and adds a themeable component, dark mode, and a
contribution API to extend both the syntax and the generated HTML.

## What you get

- **Three ways to render.** Bind a string with `[data]`, load a file with `[file]`, or write
  Markdown directly inside the component tag (transclusion).
- **A GitHub-style theme.** Applied by default, with a dark variant that follows a CSS class
  you control. Set `[theme]="'none'"` to opt out.
- **Contributions.** Admonitions, tabbed sets, KaTeX math, emoji, inline icons, router-aware
  links, and syntax highlighting through [nge/monaco](/docs/nge-monaco/getting-started). Add
  only the ones you use.
- **Embed components.** Drop live Angular components into Markdown by keyword with a small
  registry. See [Embedding components](/docs/nge-markdown/embedding).
- **Full access to Marked.** Bring your own `renderer` and `tokenizer`, and read the token list
  after each render with `(render)`.
- **Your own extensions.** A contribution can transform the raw Markdown, the tokens, the Marked
  renderer or tokenizer, and the final HTML.

## Next steps

- [Installation](/docs/nge-markdown/installation) to add it to a project.
- [Usage](/docs/nge-markdown/usage) to render your first Markdown.
- [Contributions](/docs/nge-markdown/contributions) for the syntax extensions and how to write
  your own.
