---
title: Getting started with nge/doc
description: Build a documentation site for Angular from a route config, Markdown files or live components, with dark mode, search and navigation handled for you.
---

# nge/doc

**nge/doc** turns a route configuration into a documentation site, like the one you are
reading. Pages come from Markdown files, inline Markdown, or live Angular components. The
engine takes care of navigation, the table of contents, breadcrumbs, previous/next links,
dark mode and search, so you focus on writing.

## What you get

- **Markdown or components.** A page is a Markdown file, a Markdown string, or a lazy-loaded
  Angular component or module. Mix them freely.
- **Pluggable themes.** The default theme is a clean light/dark layout. Ship your own with
  `withTheme()`; each theme is a standalone component with its own layout.
- **Dark mode.** Light, dark or auto (follows the OS), remembered across visits, with a toggle
  in the header.
- **Command palette and keyboard.** Search pages with `Cmd/Ctrl+K`, and move to the previous or
  next page with `←` / `→`.
- **Header navigation.** Link related sites (packages, versions) in the top bar with `withNavbar()`,
  and set a fixed logo and title with `withBrand()`.
- **Sidebar.** Collapsible sections that open to the active page, optional section separators with
  accent dots, and a header toggle that collapses the sidebar to widen the content.
- **Reading aids.** Table of contents with scroll spy, breadcrumbs, and previous/next cards,
  all generated from your page tree.
- **SEO.** The page title and meta description are set on every navigation, from the link or
  from Markdown frontmatter.
- **Translatable.** Every theme string is overridable with `withLabels()`; English and French
  ship in the box.
- **Standalone and signal based.** Configured through `provideNgeDoc()` and tree-shakeable.

## Next steps

- [Installation](/docs/nge-doc/installation) to add it to a project.
- [Usage](/docs/nge-doc/usage) to render your first pages.
- [Advanced usage](/docs/nge-doc/advanced-usage) for components, actions, theming and search.
