# Usage

nge-doc usage is based on Angular router module.
As for the router module, you define the routes (pages) of your documentation site
using a configuration object then nge-doc will handle the navigation between the pages.

## Create one project called my-doc

```bash
ng new my-doc --routing
```

This command will generate an Angular project with the following generated files.

===app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

=== app-routing.module.ts

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DOC } from './doc';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
```

=== app.component.html

```html
<router-outlet></router-outlet>
```

===

## Add nge-doc dependencies to the project

### Angular Material

This library use some of Angular CDK apis so you must integrate it in your application by using
the following command.

```bash
npm i @angular/cdk
```

### nge-markdown

As the library is intended to render markdown content you must install a markdown renderer library. Here
we will install [nge-markdown](https://mciissee.github.io/nge/docs/nge-markdown/) and we will see later how to integrate
it to the library and how to use another markdown renderer library if you don't like this one.

```bash
npm i marked
```

### nge

Now that the dependencies of the nge-doc are installed, you can install the library itself from npm.

```bash
npm i @mcisse/nge
```

## Register the documentation pages

A documentation site in nge-doc is a collection of links. Each link can refer either to a static page (Markdown file) or a dynamic page (Angular component).

To define the links of the site, you must register new route in the `routes` array of one of the router modules of your application like `app-routing.module.ts`. This route should lazy load `NgeDocModule` from `@mcisse/nge/doc` and use the `data` property of the route to define the links.

=== app-routings.module.ts

```typescript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgeDocSettings } from 'nge-doc';

const routes: Routes = [
    {
        path: 'docs',
        loadChildren: () => import('@mcisse/nge/doc').then(m => m.NgeDocModule),
        data: {
          meta: {
              name: 'nge-doc',
              logo: 'assets/images/nge.svg',
              root: '/docs/',
              repo: {
                  name: 'nge-doc',
                  url: 'https://github.com/mciissee/nge-doc',
              },
          },
          pages: [
              { title: 'Getting Started', href: 'getting-started', renderer: 'assets/docs/getting-started' },
              { title: 'Installation', href: 'installation', renderer: 'assets/docs/installation' },
              { title: 'Usage', href: 'usage', renderer: 'assets/docs/usage' },
              { title: 'Advanced Usage', href: 'advanced-usage', renderer: 'assets/docs/advanced-usage.md' },
          ],
        } as NgeDocSettings,
    },
    { path: '**', redirectTo: 'docs', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, , {
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules
        }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
```

=== app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NGE_DOC_RENDERERS } from '@mcisse/nge/doc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
     // provide NgeMarkdownComponent as a markdown renderer for nge-doc.
      {
          provide: NGE_DOC_RENDERERS,
          useValue: {
              markdown: {
                  component: () => import('@mcisse/nge/markdown').then(m => m.NgeMarkdownComponent),
              }
          }
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

===

In this example, the `renderer` property of the links refers to markdown files placed in assets folder.

Since we want to render markdown files, we must provide a markdown renderer component to the library.
`NgeMarkdownComponent` from [nge-markdown](https://mciissee.github.io/nge/docs/nge-markdown/) library is a component that can render markdown and it's the library used to render the markdown files of this documentation site.

You are free to use the markdown renderer you want by referencing another component that expose a `file` @Input() to render markdown from an url and a `data` @Input() to render a markdown from a string.

> The `data` property of the `Router` config accepts also an array of `NgeDocSettings`. In such case, item of the array will refers to a page accessible from `item.meta.root` url.
