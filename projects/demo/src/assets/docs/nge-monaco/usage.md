# Usage

## Configuration

First of all, we will create new Angular project using the CLI then we will add
the dependencies of nge-monaco to the project.

- Generate the project

  ```bash
  ng new my-project
  ```

- Add **nge-monaco** and **monaco-editor** dependencies from npm

  ```bash
  npm i @cisstech/nge monaco-editor@0.34.1
  ```

- Once the project is generated, open the **app.module.ts** file and add **NgeMonacoModule.forRoot()** to the **imports**
  array of the module.

  ```typescript highlights="4 13-14"
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { HttpClientModule } from '@angular/common/http';
  import { NgeMonacoModule } from '@cisstech/nge/monaco';
  import { AppComponent } from './app.component';

  @NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      HttpClientModule,
      NgeMonacoModule.forRoot({}), // use forRoot() in main app module only.
    ],
    providers: [],
    bootstrap: [AppComponent],
  })
  export class AppModule {}
  ```

## Components

This library is designed in a way that you have a total control of the editor instance so the component
does not expose a [(ngModel)] input to bind a variable to the editor content, you must attach a TextModel
to the editor by yourself by calling `monaco.editor.createModel` by yourself.
This is a design choice since this component is intended to be as simple as possible.

### nge-monaco-editor

=== example.component.ts

```typescript
import { Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implement OnDestroy {
    private readonly disposables: monaco.IDisposable[] = [];
    private model?: monaco.editor.ITextModel;

    ngOnDestroy() {
        this.disposables.forEach(d => d.dispose());
    }

    onCreateEditor(editor: monaco.editor.IStandaloneCodeEditor) {
        editor.updateOptions({
            minimap: {
                side: 'left'
            }
        });

        this.model = this.model || monaco.editor.createModel('print("Hello world")', 'python');

        editor.setModel(this.model);

        this.disposables.push(
            this.model.onDidChangeContent(e => {
                console.log(this.model.getValue());
            })
        );

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, (e) => {
            console.log('SAVE');
        });
    }

}
```

=== example.component.html

```html
<nge-monaco-editor
  style="--editor-height: 200px;"
  (ready)="onCreateEditor($event)"
>
</nge-monaco-editor>
```

===

### nge-monaco-diff-editor

=== example.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  private originalModel?: monaco.editor.ITextModel;
  private modifiedModel?: monaco.editor.ITextModel;

  onCreateEditor(editor: monaco.editor.IStandaloneDiffEditor) {
    editor.updateOptions({
      renderSideBySide: true,
    });

    this.originalModel =
      this.originalModel ||
      monaco.editor.createModel('print("Hello world !!!")', 'python');

    this.modifiedModel =
      this.modifiedModel ||
      monaco.editor.createModel('print("hello world")', 'python');

    editor.setModel({
      original: this.originalModel,
      modified: this.modifiedModel,
    });
  }
}
```

=== example.component.html

```html
<nge-monaco-diff-editor
  style="--editor-height: 200px;"
  (ready)="onCreateEditor($event)"
>
</nge-monaco-diff-editor>
```

===

### nge-monaco-viewer

```typescript
// example.component.ts

import { Component } from '@angular/core';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implement OnDestroy {
  code = 'print("Hello world !!!")';
}
```

```html
<!-- example.component.html -->

<!-- DYNAMIC CODE -->
<nge-monaco-viewer [language]="'python'" [code]="code"></nge-monaco-viewer>

<!-- STATIC CODE -->
<nge-monaco-viewer
  [language]="'markdown'"
  [lines]="'1 4-7 10'"
  [highlights]="'2-5'"
  ngPreserveWhitespaces
>
  # H1 ## H2 ### H3 #### H4 ##### H5 ###### H6 Alternatively, for H1 and H2, an
  underline-ish style: Alt-H1 ====== Alt-H2 ------
</nge-monaco-viewer>
```

:::+ note ngPreserveWhitespaces
As of Angular 6, the template compiler strips whitespace by default. Use `ngPreserveWhitespaces` directive to preserve whitespaces such as newlines in order for the nge-monaco-viever content to render as intended.
https://angular.io/api/core/Component#preserveWhitespaces
:::

:::+ note Escape html when using transclusion
Characters such as &lt;, &gt;, {, } directly written in the HTML template file must be escaped so that the compiler doesn't try to bind it as regular Angular code.
:::

## Options

Optionally, nge-monaco can be configured by passing **NgeMonacoConfig** object to the forRoot method of **NgeMonacoModule** directly
or as factory function, which allows access to dependency injection via `inject` function.

```typescript highlights="5 14-29"
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgeMonacoModule } from '@cisstech/nge/monaco';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // required for the themes to be load
    NgeMonacoModule.forRoot({ // use forRoot() in main app module only.
       assets: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0' // base path for monaco editor
       locale: 'fr', // editor ui language
       options: { // default options passed to monaco editor instances https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IEditorOptions.html
          scrollBeyondLastLine: false
       },
       theming: {
         themes: [ // custom themes (see theming section for more information)
           'assets/nge-monaco/themes/nord.json',
           'assets/nge-monaco/themes/github.json',
           'assets/nge-monaco/themes/one-dark-pro.json',
         ],
         // themes: NGE_THEMES.map(theme => 'assets/nge/monaco/themes/' + theme), // register all themes
         default: 'github' // default theme
       }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Theming

This library comes with a set of custom themes for monaco editor taken from [https://github.com/brijeshb42/monaco-themes/tree/master/themes](https://github.com/brijeshb42/monaco-themes/tree/master/themes) that can be added to the library by using `NgeMonacoModule.forRoot()` method.

### Add the glob to assets in angular.json

```json
{
  "apps": [
    {
      "assets": [
        { "glob": "**/*", "input": "./node_modules/@cisstech/nge/assets/monaco/", "output": "./assets/nge/monaco/" }
      ],
      ...
    }
    ...
  ],
  ...
}
```

> This glob pattern will include all the themes and the monaco-editor source files to your assets folder.

### Register the themes you want to use

```typescript highlights="5 14-26"
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgeMonacoModule, NGE_THEMES } from '@cisstech/nge/monaco';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule, // required for the themes to be load.
    NgeMonacoModule.forRoot({
      theming: {
        /* // use a subset of themes
         themes: [ // custom themes
           'assets/nge/monaco/themes/nord.json',
           'assets/nge/monaco/themes/github.json',
           'assets/nge/monaco/themes/one-dark-pro.json',
         ],
         */
        themes: NGE_THEMES.map((theme) => 'assets/nge/monaco/themes/' + theme), // use all themes
        default: 'github', // default theme
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Use the API to change the theme

```html
<!-- example.component.html -->

<select name="theme" id="theme" (change)="switchTheme($event.target.value)">
  <ng-container *ngFor="let theme of themes|async">
    <option [value]="theme">{{ theme }}</option>
  </ng-container>
</select>

<nge-monaco-editor
  style="--editor-height: 200px"
  (ready)="onCreateEditor($event)"
>
</nge-monaco-editor>
```

```typescript
// example.component.ts

import { Component } from '@angular/core';
import { NgeMonacoThemeService } from '@cisstech/nge/monaco';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  themes = this.theming.themesChanges;

  constructor(private readonly theming: NgeMonacoThemeService) {}

  onCreateEditor(editor: monaco.editor.IStandaloneCodeEditor) {
    editor.setModel(
      monaco.editor.createModel('print("Hello world")', 'python')
    );
  }

  async switchTheme(theme: string) {
    this.theming.setTheme(theme);
  }
}
```

## Extensions

To extends monaco editor api once the editor is loaded, this library expose the injection token `NGE_MONACO_CONTRIBUTION`.

```typescript
import { NgModule, Injectable, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import {
  NgeMonacoModule,
  NgeMonacoContribution,
  NGE_MONACO_CONTRIBUTION,
} from '@cisstech/nge/monaco';

@Injectable() // use injectable only if you want to use angular dependency injection.
class MyContribution implements NgeMonacoContribution {
  constructor(
    private readonly injector: Injector
  ) // use angular dependency injector to inject whatever you want.
  {}

  activate(): void | Promise<void> {
    // use monaco object from window.monaco to extends monaco editor api.

    monaco.languages.register({ id: 'mySpecialLanguage' });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('mySpecialLanguage', {
      tokenizer: {
        root: [
          [/\[error.*/, 'custom-error'],
          [/\[notice.*/, 'custom-notice'],
          [/\[info.*/, 'custom-info'],
          [/\[[a-zA-Z 0-9:]+\]/, 'custom-date'],
        ],
      },
    });
  }

  deactivate(): void | Promise<void> {
    // free the disposables and subscriptions here
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, NgeMonacoModule.forRoot({})],
  providers: [
    { provide: NGE_MONACO_CONTRIBUTION, multi: true, useClass: MyContribution },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Load Monaco Editor from your own server

By default the library load monaco editor from a CDN. Please follow the steps above to load monaco from your own server.

## Include monaco assets to angular.json

```json
{
  "apps": [
    {
      "assets": [
        { "glob": "**/*", "input": "./node_modules/monaco-editor/min", "output": "./assets/nge/monaco/min" },
        { "glob": "**/*", "input": "./node_modules/monaco-editor/min-maps", "output": "./assets/nge/monaco/min-maps" },
      ],
      ...
    }
    ...
  ],
  ...
}
```

### Change the configuration

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgeMonacoModule } from '@cisstech/nge/monaco';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgeMonacoModule.forRoot({
      assets: 'assets/nge/monaco',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Links

[Monaco Editor](https://github.com/Microsoft/monaco-editor/)<br/>
[Monaco Editor Options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IEditorOptions.html)
