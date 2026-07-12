---
title: Deployment
description: Serve the docs under a base href and give the static host an SPA fallback.
---

# Deployment

The engine uses the Angular router and relative asset urls, so it works unchanged when
the site is served from a sub-path (GitHub Pages, a reverse proxy). Two things to set up:

## Base href

Build with the sub-path as the base href so `<base href>` is correct:

```bash
ng build --base-href=/my-repo/
```

Router links, the manifest fetch and the relative Markdown urls all resolve against it.
Keep the urls in your configuration relative (`docs/nge-doc.json`, not
`/docs/nge-doc.json`) so they follow the base href.

## SPA fallback

Give the static host a fallback so a refresh on a deep link serves the app shell:

- **Fully prerendered sites** (see [Static generation](/docs/nge-doc/guides/ssg)) only
  need the fallback for client-only pages: expose the CSR shell (`index.csr.html`) as
  `404.html` on GitHub Pages.
- **Client-rendered sites** need every unknown path to serve `index.html`
  (`angular-cli-ghpages` and most hosts have an option for this).

## Build order

The docs builder writes into `public/`, which `ng build` copies to the output. Always
compile the docs first:

```bash
ng run my-app:docs && ng build my-app
```
