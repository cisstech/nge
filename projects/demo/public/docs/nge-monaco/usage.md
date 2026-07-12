---
title: Usage
description: Set up nge/monaco, use the editor, diff editor and viewer components, switch themes at runtime, follow light and dark mode, and extend Monaco with contributions.
---

# Usage

## Set up

Register the module providers once at the app root, alongside `HttpClient` for loading themes.

===app.config.ts

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { NgeMonacoModule } from '@cisstech/nge/monaco'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(
      NgeMonacoModule.forRoot({
        // options passed to every editor instance
        options: { scrollBeyondLastLine: false },
      })
    ),
  ],
}
```

===

The components are standalone. Import the ones you use:

```typescript
import {
  NgeMonacoEditorComponent,
  NgeMonacoDiffEditorComponent,
  NgeMonacoViewerComponent,
} from '@cisstech/nge/monaco'
```

## Editor

nge/monaco does not bind a value for you: you create the `ITextModel` and attach it in the
`(ready)` handler. This keeps languages, multiple models and disposal under your control. Set the
height with the `--editor-height` custom property.

=== component.ts

```typescript
import { Component } from '@angular/core'
import { NgeMonacoEditorComponent } from '@cisstech/nge/monaco'

@Component({
  selector: 'app-editor',
  imports: [NgeMonacoEditorComponent],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  private model?: monaco.editor.ITextModel

  onReady(editor: monaco.editor.IStandaloneCodeEditor) {
    this.model ??= monaco.editor.createModel('print("Hello world")', 'python')
    editor.setModel(this.model)

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      console.log(this.model?.getValue())
    })
  }
}
```

=== component.html

```html
<nge-monaco-editor style="--editor-height: 240px" (ready)="onReady($event)" />
```

===

:::+ note Disposing models
You own the models you create, so dispose them when the component is destroyed. The editor itself
is disposed for you.
:::

## Diff editor

Same idea, with an original and a modified model.

=== component.ts

```typescript
import { Component } from '@angular/core'
import { NgeMonacoDiffEditorComponent } from '@cisstech/nge/monaco'

@Component({
  selector: 'app-diff',
  imports: [NgeMonacoDiffEditorComponent],
  templateUrl: './diff.component.html',
})
export class DiffComponent {
  onReady(editor: monaco.editor.IStandaloneDiffEditor) {
    editor.updateOptions({ renderSideBySide: true })
    editor.setModel({
      original: monaco.editor.createModel('print("Hello world !!!")', 'python'),
      modified: monaco.editor.createModel('print("hello world")', 'python'),
    })
  }
}
```

=== component.html

```html
<nge-monaco-diff-editor style="--editor-height: 240px" (ready)="onReady($event)" />
```

===

## Viewer

For read-only code, the viewer highlights a block without a full editor. Pass the code with
`[code]` or through transclusion, and pick a language.

```html
<!-- from an input -->
<nge-monaco-viewer [language]="'python'" [code]="'print(\'Hello world\')'" />

<!-- from transclusion, with visible lines, highlights and a filename tab -->
<nge-monaco-viewer
  [language]="'typescript'"
  [lines]="'1 4-7'"
  [highlights]="'2-3'"
  [filename]="'example.ts'"
  ngPreserveWhitespaces
>
  const answer = 42
</nge-monaco-viewer>
```

The viewer accepts `code`, `language`, `lines`, `highlights`, `filename` and `theme` inputs. Add
`ngPreserveWhitespaces` when using transclusion so line breaks survive template compilation.

## Theming

### Register themes

Add the theme files to your assets and list the ones you want in `forRoot`. `NGE_MONACO_THEMES`
holds every bundled theme name.

```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "./node_modules/@cisstech/nge/assets/monaco/",
      "output": "./assets/nge/monaco/"
    }
  ]
}
```

```typescript
import { NgeMonacoModule, NGE_MONACO_THEMES } from '@cisstech/nge/monaco'

NgeMonacoModule.forRoot({
  theming: {
    themes: NGE_MONACO_THEMES.map((theme) => `assets/nge/monaco/themes/${theme}`),
    default: 'github',
  },
})
```

### Switch at runtime

`NgeMonacoThemeService` changes the theme for every editor on the page. `themesChanges` emits the
list of available themes.

```typescript
import { Component, inject } from '@angular/core'
import { NgeMonacoThemeService } from '@cisstech/nge/monaco'

@Component({ /* ... */ })
export class ThemePickerComponent {
  private readonly theming = inject(NgeMonacoThemeService)
  readonly themes = this.theming.themesChanges

  setTheme(name: string) {
    this.theming.setTheme(name)
  }
}
```

### Follow light and dark mode

Set a `light` and a `dark` theme and Monaco switches between them on its own. Detection is either
a CSS class on the document root or, when no class is given, the `(prefers-color-scheme: dark)`
media query.

```typescript
NgeMonacoModule.forRoot({
  theming: {
    themes: NGE_MONACO_THEMES.map((theme) => `assets/nge/monaco/themes/${theme}`),
    light: 'github',
    dark: 'tomorrow-night',
    // observed live on <html> and <body>; omit to follow the OS preference
    darkThemeClassName: 'dark-theme',
  },
})
```

This is how these docs keep the editors in step with the site: nge/doc toggles a class for dark
mode, and Monaco reads the same class. `darkThemeClassName` matches the option of the same name in
[nge/markdown](/docs/nge-markdown/usage), so a single class drives both.

Inside an [nge/doc](/docs/nge-doc/getting-started) site, set `darkThemeClassName: 'nge-doc-dark'`,
the class nge/doc toggles on `<html>`. `darkThemeClassName` also accepts an array, so an app whose
pages use different dark classes can pass `['dark-theme', 'nge-doc-dark']` and Monaco follows
whichever one is present.

## Extensions

Register a contribution to run code once Monaco is available, for example to add a language. Bind
it to the `NGE_MONACO_CONTRIBUTION` token.

```typescript
import { Injectable } from '@angular/core'
import { NgeMonacoContribution, NGE_MONACO_CONTRIBUTION } from '@cisstech/nge/monaco'

@Injectable()
class CustomLanguageContribution implements NgeMonacoContribution {
  activate() {
    monaco.languages.register({ id: 'my-lang' })
    monaco.languages.setMonarchTokensProvider('my-lang', {
      tokenizer: { root: [[/\[error.*/, 'custom-error']] },
    })
  }

  deactivate() {
    // release any disposables here
  }
}

// providers
{ provide: NGE_MONACO_CONTRIBUTION, multi: true, useClass: CustomLanguageContribution }
```

## Self-host Monaco

To serve Monaco from your own domain instead of the CDN, copy its files to your assets and point
`assets` at them.

```json
{
  "assets": [
    { "glob": "**/*", "input": "./node_modules/monaco-editor/min", "output": "./assets/nge/monaco/min" },
    { "glob": "**/*", "input": "./node_modules/monaco-editor/min-maps", "output": "./assets/nge/monaco/min-maps" }
  ]
}
```

```typescript
NgeMonacoModule.forRoot({ assets: 'assets/nge/monaco' })
```

## NgModule apps

Import `NgeMonacoModule.forRoot({ /* ... */ })` in your root module instead of
`importProvidersFrom`. The components work the same once imported.

## Links

- [Monaco editor](https://github.com/microsoft/monaco-editor/)
- [Editor options](https://microsoft.github.io/monaco-editor/docs.html)
