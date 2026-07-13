---
title: Usage
description: Render Markdown from a string, a file or transclusion, configure Marked, apply a theme, and compile Markdown yourself with NgeMarkdownService.
---

# Usage

## Set up

Call `provideNgeMarkdown` at the app root and compose the features you need: a theme, and any
[contributions](/docs/nge-markdown/contributions). Add `HttpClient` for `[file]`.

===app.config.ts

```typescript
import { ApplicationConfig } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import {
  provideNgeMarkdown,
  withThemes,
  withAdmonitions,
  withTabbedSet,
} from '@cisstech/nge/markdown'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideNgeMarkdown(
      withThemes({ name: 'github', styleUrl: 'assets/nge/markdown/themes/github.css' }),
      withAdmonitions(),
      withTabbedSet(),
    ),
  ],
}
```

===

The renderer is the standalone `NgeMarkdownComponent`. Import it where you use it:

```typescript
import { Component } from '@angular/core'
import { NgeMarkdownComponent } from '@cisstech/nge/markdown'

@Component({
  selector: 'app-doc',
  imports: [NgeMarkdownComponent],
  template: `<nge-markdown [file]="'assets/readme.md'" />`,
})
export class DocComponent {}
```

## Render Markdown

Three sources, one component. `(render)` emits the Marked token list after each pass.

=== component.ts

```typescript
import { Component } from '@angular/core'
import { NgeMarkdownComponent } from '@cisstech/nge/markdown'
import type { TokensList } from 'marked'

@Component({
  selector: 'app-demo',
  imports: [NgeMarkdownComponent],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  readonly markdown = `# Title\n\nRendered from a string.`

  onRender(tokens: TokensList) {
    console.log(tokens)
  }
}
```

=== component.html

```html
<!-- from a string -->
<nge-markdown [data]="markdown" (render)="onRender($event)" />

<!-- from a file -->
<nge-markdown [file]="'assets/readme.md'" (render)="onRender($event)" />

<!-- from transclusion -->
<nge-markdown ngPreserveWhitespaces>
# Title

Rendered from the template.
</nge-markdown>
```

===

:::+ note ngPreserveWhitespaces
The Angular compiler collapses whitespace by default. Add `ngPreserveWhitespaces` so newlines
survive and the transcluded Markdown renders as written.
:::

:::+ note Escaping in templates
Inside a template, characters such as `<`, `>`, `{` and `}` must be escaped so the compiler does
not read them as Angular syntax. Prefer `[data]` or `[file]` for anything non-trivial.
:::

## Configure Marked

Pass [Marked options](https://marked.js.org/using_advanced#options) through the `withConfig`
feature. A factory form is available when the renderer or tokenizer needs dependency injection.

```typescript
import {
  provideNgeMarkdown,
  withConfig,
  NgeMarkdownConfig,
} from '@cisstech/nge/markdown'
import { Renderer } from 'marked'

export function markdownConfig(): NgeMarkdownConfig {
  const renderer = new Renderer()
  renderer.blockquote = (quote) => `<blockquote class="callout">${quote}</blockquote>`
  return { renderer, breaks: false }
}

// providers
provideNgeMarkdown(withConfig(markdownConfig))
```

:::+ note Reserved options
`highlight` and `langPrefix` are managed by the library and cannot be overridden.
:::

## Theming

The default theme is inspired by
[github-markdown-css](https://github.com/sindresorhus/github-markdown-css). Register it with
the `withThemes` feature and copy the stylesheets to your assets.

### Copy the theme assets

```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "./node_modules/@cisstech/nge/assets/markdown/",
      "output": "./assets/nge/markdown/"
    }
  ]
}
```

### Register the theme

```typescript
provideNgeMarkdown(
  withThemes({
    name: 'github',
    styleUrl: 'assets/nge/markdown/themes/github.css',
  }),
)
```

The component applies the `github` theme unless you set `[theme]` to another registered name, or
to `'none'` to render unstyled.

### Dark mode

Point the config at the class your app toggles for dark mode; the theme switches its dark
variant when that class is present on `<html>` or `<body>`.

```typescript
provideNgeMarkdown(withConfig({ darkThemeClassName: 'dark-theme' }))
```

Inside an [nge/doc](/docs/nge-doc/getting-started) site, use its class:
`darkThemeClassName: 'nge-doc-dark'`. This is the same option as in
[nge/monaco](/docs/nge-monaco/usage), so one class drives both. It also accepts an array
(`['dark-theme', 'nge-doc-dark']`) for apps whose pages toggle different dark classes.

## Compile Markdown yourself

`NgeMarkdownComponent` wraps `NgeMarkdownService`. Inject the service to render into an element
you own and get the tokens back.

```typescript
import { inject } from '@angular/core'
import { NgeMarkdownService } from '@cisstech/nge/markdown'

const markdownService = inject(NgeMarkdownService)

const tokens = await markdownService.compile({
  markdown: '# Hello',
  target: document.getElementById('out')!,
})
```

## NgModule apps

Import `NgeMarkdownModule` to expose the component in a module, and keep the same setup:
`provideNgeMarkdown(...)` returns `EnvironmentProviders`, so the same composition of features
works in an NgModule's `providers` as well as in a standalone `ApplicationConfig`.
