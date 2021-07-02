# Advanced usage

The full list of properties supported by NgeDoc configuration object can be found [here](https://github.com/mciissee/nge-doc/blob/69e02ae21e37fc75345b5cba537233930d2bd388/projects/nge-doc/src/lib/nge-doc.ts#L13).

=== app-routing.module.ts

```typescript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgeDocSettings } from 'nge-doc';

import { NgeDocLink, NgeDocSettings } from 'nge-doc';

const routes: Routes = [
    {
        path: 'docs',
        loadChildren: () => import('nge-doc').then(m => m.NgeDocModule),
        data: {
          meta: {
              name: 'Ngedoc',
              root: '/docs/',
              repo: {
                  name: 'nge-doc',
                  url: 'https://github.com/mciissee/nge-doc',
              },
          },
          pages: [
            { title: 'Markdown from fIle', href: 'md-from-file', renderer: 'assets/docs/getting-started' },
            {
              title: 'Inline markdown',
              href: 'inline-markdown',
              renderer: `
              # H1
              ## H2
              ....
              `
            },
            {
              title: 'MyComponent',
              href: 'my-component',
              renderer: () => import('./my-component').then(m => m.MyComponent),
              actions: [
                { title: 'MyActionToOpenAnUrl', run: 'https://github.com/mciissee/nge-doc' }, // action to open an url
                { title: 'MyDynamicAction', icon: 'https://....', run: injector => alert('My Action Handler') }
              ]
            },
            {
              title: 'MyModule',
              href: 'my-module',
              renderer: () => import('./my-module').then(m => m.MyModule)
            },
            (injector) => {
              const random = () => {
                  const pages: NgeDocLink[] = [];
                  for (let i = 0; i < 15; i++) {
                      const renderer = (i % 2 == 0)
                        ? 'LINK TO A MARKDOWN FILE'
                        : `
                        # Inline Markdown
                        lorem ipsum
                        `
                      ;
                      pages.push({
                          title: 'Dynamic ' + i,
                          href: 'dynamic_' + i,
                          renderer,
                      });
                  }
                  return pages;
              };
              return Promise.resolve({
                  title: 'Dynamic',
                  href: 'dynamic',
                  renderer: 'assets/docs/getting-started',
                  children: random()
              });
            }
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

=== my-component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <h1 *ngIf="name; else: noName">hello {{name}}</h1>
    <ng-template #noName>
    hello world
    </ng-template>
  `
})
export class MyComponent {
  @Input()
  name: string;
}
````

=== my-module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

```typescript
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MyComponent
  ]
})
export class MyModule {
  // REGISTER MyComponent as the component to lazy load.
  component = MyComponent;
}
```

===
