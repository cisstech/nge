---
title: Authoring
description: Pages, sections, _meta.json and frontmatter, and how titles and order are resolved.
---

# Authoring

## Pages and sections

- A Markdown file is a page; its url is its path without the extension.
- A folder is a section. Its pages are its children in the sidebar, and its `index.md`,
  when present, is the section's own landing page.
- An `index.md` at the site root is the landing page of the whole site.

## _meta.json

`_meta.json` is **optional**: frontmatter alone can drive titles, order, icons and drafts,
and a folder is configured by its `index.md`. Reach for `_meta.json` for what a file
cannot express: external links, hiding an entire folder, or configuring a folder that has
no `index.md`.

This site does both: the root keeps a `_meta.json` for the tab icons and short section
labels, while simple sections (the guides you are reading) are driven by frontmatter
alone.

When present, its **key order drives the navigation order**, and each entry can override
presentation:

```json
{
  "getting-started": { "title": "Getting started" },
  "guides": { "icon": "assets/icons/guides.svg" },
  "internal-notes": { "display": "hidden" },
  "github": { "title": "GitHub", "href": "https://github.com/me/my-lib" }
}
```

- `title` renames the entry (wins over frontmatter).
- `icon` shows an icon in the sidebar.
- `display: "hidden"` keeps a page out of the navigation.
- an entry with `href` and no backing file is an external link.

## Frontmatter

Each page can open with a frontmatter block, stripped before rendering:

```markdown
---
title: Configuring the router
description: How the docs engine plugs into the Angular router.
order: 2
---
```

| Key | Effect |
| --- | --- |
| `title` | Page title (navigation, document title, search). |
| `description` | Meta description and social tags. |
| `order` | Position among siblings not ordered by `_meta.json`. |
| `icon` | Sidebar icon. |
| `image` | Social preview image for this page. |
| `draft: true` | Excluded from the build entirely. |
| `prerender: false` | Rendered on the client only; static generation skips it (see [Static generation](/docs/nge-doc/guides/ssg)). |

## Resolution order

For titles: `_meta.json` wins over frontmatter, which wins over the humanized filename
(`getting-started.md` becomes "Getting started"). For order: `_meta.json` key order first,
then frontmatter `order`, then alphabetical.

## Linking between pages

Write site-absolute Markdown links (`[Theming](/docs/guides/theming)`). The engine routes
them through the Angular router, so navigation stays in the SPA and works under any base
href. Heading anchors work too: `[Options](/docs/reference#options)`.

Next: [Outputs](/docs/nge-doc/files/outputs).
