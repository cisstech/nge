---
title: Advanced usage
description: Page renderers, dynamic and nested pages, actions and icons, the header navbar, dark mode, search, frontmatter and custom themes.
---

# Advanced usage

## Page renderers

A page's `renderer` can be any of:

- **A file URL** (a single-line string): loaded and rendered as Markdown.
- **Inline Markdown** (a multi-line string): rendered as-is.
- **A component**: `() => import('./demo.component').then((m) => m.DemoComponent)`.
- **A module**: `() => import('./demo.module').then((m) => m.DemoModule)`, where the module
  exposes a `component` field. Use a module when the rendered component needs its own imports.

Pass inputs to a component page with `inputs`.

```typescript
{ title: 'Playground', href: 'playground', renderer: () => import('./playground.component').then((m) => m.PlaygroundComponent), inputs: { theme: 'dark' } }
```

## Dynamic and nested pages

A page entry can be a function of the environment injector, sync or async, returning one link
or many. Return `children` to build a nested section (rendered as a group in the sidebar).

```typescript
pages: [
  (injector) => {
    const api = injector.get(ApiService)
    return api.listGuides().then((guides) => ({
      title: 'Guides',
      href: 'guides',
      children: guides.map((g) => ({ title: g.title, href: g.slug, renderer: g.url })),
    }))
  },
]
```

## Actions and icons

Each page can declare header `actions`. A string handler opens a URL in a new tab; a function
handler receives the injector.

```typescript
{
  title: 'API',
  href: 'api',
  renderer: 'assets/docs/api.md',
  icon: 'assets/icons/api.svg',
  actions: [
    { title: 'Edit on GitHub', icon: editIcon, run: 'https://github.com/me/my-lib/edit/main/docs/api.md' },
    { title: 'Copy link', run: (injector) => injector.get(ClipboardService).copy(location.href) },
  ],
}
```

Any `icon` (on a link, an action, a nav item or the logo) is an `NgeDocIcon`: a single URL,
or a `{ light, dark }` pair for a different asset per color scheme. The default theme recolors
monochrome same-origin icons to the current text color automatically.

## Brand

The header shows the active site's `name` and `logo`, so the brand width follows the current
site. Set one brand for the whole documentation with `withBrand()` to keep the header stable;
site names still drive breadcrumbs and page titles.

```typescript
provideNgeDoc(
  withBrand({ title: 'NG Essentials', icon: 'assets/logo.svg', href: '/' })
)
```

`icon` is an `NgeDocIcon` (a URL, or a `{ light, dark }` pair) and `href` is where clicking the
brand navigates (defaults to `/`).

## Header navigation

Link related sites (packages, versions, external pages) in the top bar. Without it, the theme
lists the registered sites automatically.

```typescript
provideNgeDoc(
  withNavbar([
    { title: 'Docs', href: '/docs/' },
    { title: 'Changelog', href: 'https://github.com/me/my-lib/releases', external: true },
  ])
)
```

## Dark mode

The default theme ships a light/dark toggle. Set the initial scheme with `withDarkMode('auto' | 'dark' | 'light')`
(defaults to `auto`, which follows the OS and is remembered across visits).

`NgeDocThemeService` owns the scheme: read `isDark()`, call `toggle()` or `setScheme()`, and it
reflects the result as a `nge-doc-dark` class on the document root while the docs are on screen.
Other libraries can follow that class; for example `nge/monaco` can switch its editor theme
through its `theming.darkThemeClassName` option.

## Search

The default theme includes a command palette. Press `Cmd/Ctrl+K` (or the header search box) to
search page titles and jump with the keyboard. Nothing to configure.

## Frontmatter and SEO

On every navigation the engine sets the document title (`Page · Site`) and the meta description,
from the link's `title`/`description`. A Markdown page can also carry a small frontmatter block,
which overrides them and is stripped before rendering:

```markdown
---
title: Configuring the router
description: How the docs engine plugs into the Angular router.
---

# Configuring the router
```

## Custom theme

The default theme is a standalone component mounted by the engine. Ship your own layout with
`withTheme()`; it receives the engine services (`NgeDocService`, `NgeDocThemeService`) through
dependency injection and renders the content with `<nge-doc-renderer>`.

```typescript
provideNgeDoc(withTheme(() => import('./my-theme.component').then((m) => m.MyThemeComponent)))
```
