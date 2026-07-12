---
title: Theming
description: Brand, header navigation, dark mode, custom themes and labels.
---

# Theming

## Brand

The header shows the active site's `name` and logo by default. Set one brand for the whole
documentation with `withBrand()` to keep the header stable across sites; site names still
drive breadcrumbs and page titles.

```typescript
provideNgeDoc(withBrand({ title: 'NG Essentials', icon: 'assets/logo.svg', href: '/' }))
```

`icon` is an `NgeDocIcon` (a url, or a `{ light, dark }` pair) and `href` is where
clicking the brand navigates (defaults to `/`).

## Header navigation

The top bar resolves in precedence order:

1. **`withNavbar()`**, when you want full control (external links, custom order):

```typescript
provideNgeDoc(
  withNavbar([
    { title: 'Docs', href: '/docs/' },
    { title: 'Changelog', href: 'https://github.com/me/my-lib/releases', external: true },
  ])
)
```

2. **Section tabs**, when the site opts into `nav: "tabs"`: the top-level sections become
   the navbar (titles and icons from `_meta.json`), and the sidebar shows only the active
   section. This site works that way:

```json
"docs": {
  "builder": "@cisstech/nge:docs",
  "options": { "publicDir": "public", "root": "/docs", "name": "My docs", "nav": "tabs" }
}
```

Code-first sites opt in with `meta: { ..., nav: 'tabs' }`.

3. **The registered sites**, one entry per site, which is the multi-site default.

## Dark mode

The default theme ships a light/dark toggle. Set the initial scheme with
`withDarkMode('auto' | 'dark' | 'light')`; `auto` follows the OS and the choice is
remembered across visits.

`NgeDocThemeService` owns the scheme: read `isDark()`, call `toggle()` or `setScheme()`,
and it reflects the result as a `nge-doc-dark` class on the document root. Other libraries
can follow that class: point [nge/monaco](/docs/nge-monaco/usage) and
[nge/markdown](/docs/nge-markdown/usage) at `darkThemeClassName: 'nge-doc-dark'` and their
editors and rendered Markdown switch with the site.

## Custom theme

The default theme is a standalone component mounted by the engine. Ship your own layout
with `withTheme()`; it receives the engine services (`NgeDocService`,
`NgeDocThemeService`) through dependency injection and renders the content with
`<nge-doc-renderer>`.

```typescript
provideNgeDoc(withTheme(() => import('./my-theme.component').then((m) => m.MyThemeComponent)))
```

## Labels and i18n

Every string the default theme shows can be translated or reworded with `withLabels()`.
Pass a ready-made set, or only the keys you want to change; anything left out keeps its
English default.

```typescript
import { provideNgeDoc, withLabels, NGE_DOC_LABELS_FR } from '@cisstech/nge/doc'

provideNgeDoc(
  withLabels(NGE_DOC_LABELS_FR) // ready-made French
  // or reword a few keys:
  // withLabels({ search: 'Search the docs' }),
)
```

`NGE_DOC_LABELS_EN` and `NGE_DOC_LABELS_FR` ship with the library, and `NgeDocLabels` is
the full list of keys for supplying another language.

## Keyboard

The default theme is navigable from the keyboard: `Cmd/Ctrl+K` opens search, `←` / `→`
move to the previous and next page, and focus moves to the content on navigation so the
page scrolls right away. Shortcuts stay out of the way while you type in a field.
