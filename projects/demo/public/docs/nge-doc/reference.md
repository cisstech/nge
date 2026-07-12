---
title: Reference
description: Builder options, frontmatter keys, _meta.json entries, provideNgeDoc features and the SSR api, in one place.
---

# Reference

## The `docs` builder (`@cisstech/nge:docs`)

| Option | Default | Role |
| --- | --- | --- |
| `publicDir` | `public` | Served public dir; Markdown is authored under `<publicDir>/<root>`. |
| `root` | required | Site root url (`/docs`). |
| `name` | required | Site name (breadcrumbs, titles, navbar). |
| `nav` | `sidebar` | Top-level sections placement: `sidebar` tree or navbar `tabs`. |
| `siteUrl` | unset | Absolute site url; enables the seo outputs. |
| `sitemap` | `true` | Emit `sitemap.xml` (needs `siteUrl`). |
| `robots` | `true` | Emit `robots.txt` (needs `siteUrl`). |
| `llms` | `true` | Emit `llms.txt` and `llms-full.txt` (needs `siteUrl`). |
| `search` | `true` | Emit `search.json`. |
| `api` | unset | Generate an API reference from TypeScript sources (needs the optional `typedoc` dependency). |
| `watch` | `false` | Rebuild on change. |

## Frontmatter

| Key | Role |
| --- | --- |
| `title` | Page title. |
| `description` | Meta description and social tags. |
| `order` | Position among siblings. |
| `icon` | Sidebar icon url. |
| `image` | Social preview image. |
| `draft: true` | Excluded from the build. |
| `prerender: false` | Client-only page; static generation skips it. |

## `_meta.json`

Key order drives the navigation order. Each entry:

| Key | Role |
| --- | --- |
| `title` | Renames the entry (wins over frontmatter). |
| `icon` | Sidebar or tab icon. |
| `display: "hidden"` | Keeps the page out of the navigation. |
| `href` | Makes the entry an external link (no backing file). |

## `provideNgeDoc()` features

| Feature | Role |
| --- | --- |
| `withBrand({ title, icon, href })` | Fixed header brand. |
| `withNavbar([...])` | Explicit header links (wins over everything). |
| `withTheme(loader)` | Custom layout component. |
| `withDarkMode('auto' \| 'dark' \| 'light')` | Initial color scheme. |
| `withLabels(labels)` | Reword or translate the theme strings. |
| `withSeo({ url, image })` | Canonical url and absolute social images. |
| `withEditLink(baseUrl)` | "Edit this page" links from source paths. |
| `withSearchIndex(url)` | Content search from the build-time index. |
| `withMarkdownRenderer({ component })` | Override the default Markdown renderer. |

## `@cisstech/nge/doc/ssr`

| Api | Role |
| --- | --- |
| `ngeDocPrerenderRoutes(...manifestPaths)` | One prerender server route per site, honoring `prerender: false`. |
| `provideNgeDocSsr({ roots? })` | Serves the docs from the filesystem during prerendering, with transfer state. `roots` defaults to `['public']`. |

## Route data

| Value | Role |
| --- | --- |
| `docsFromManifest(url)` | A file-based site, from its compiled manifest. |
| `NgeDocSettings` | A code-first site. |
| An array of the above | Several sites side by side. |
