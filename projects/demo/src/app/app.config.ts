import { provideHttpClient } from '@angular/common/http'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router'

import { provideNgeDoc, withBrand, withEditLink, withSearchIndex, withSeo } from '@cisstech/nge/doc'
import {
  NgeMarkdownConfig,
  provideNgeMarkdown,
  withAdmonitions,
  withComponents,
  withConfig,
  withEmoji,
  withIcons,
  withKatex,
  withLinkAnchor,
  withTabbedSet,
  withThemes,
} from '@cisstech/nge/markdown'
import { withShiki } from '@cisstech/nge/markdown/shiki'
import { withStackblitz } from '@cisstech/nge/markdown/stackblitz'
import { NGE_MONACO_THEMES, provideNgeMonaco } from '@cisstech/nge/monaco'

import { routes } from './app.routes'

export function markdownOptions(): NgeMarkdownConfig {
  return {
    // Align nge-markdown's dark detection with the class NgeDocThemeService toggles.
    darkThemeClassName: 'nge-doc-dark',
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(),
    provideNgeMonaco({
      locale: 'fr',
      theming: {
        themes: NGE_MONACO_THEMES.map((theme) => 'assets/nge/monaco/themes/' + theme),
        default: 'github',
        // Follow the documentation color scheme: nge-doc toggles `nge-doc-dark`
        // on <html>, and Monaco switches themes accordingly (no coupling).
        light: 'github',
        dark: 'tomorrow-night',
        darkThemeClassName: 'nge-doc-dark',
      },
    }),
    provideNgeMarkdown(
      withConfig(markdownOptions),
      withThemes({ name: 'github', styleUrl: 'assets/nge/markdown/themes/github.css' }),
      withKatex(),
      withIcons(),
      withEmoji(),
      withTabbedSet(),
      withLinkAnchor(),
      withAdmonitions(),
      withShiki(),
      withStackblitz({ template: 'typescript', file: 'index.ts', title: 'nge-doc example' }),
      withComponents({
        'demo-counter': () => import('./markdown/embed-demo/embed-demo.component').then((m) => m.EmbedDemoComponent),
        'ui-tree-demo': () => import('./ui-demos/ui-tree-demo.component').then((m) => m.UiTreeDemoComponent),
        'ui-list-demo': () => import('./ui-demos/ui-list-demo.component').then((m) => m.UiListDemoComponent),
        'ui-icon-demo': () => import('./ui-demos/ui-icon-demo.component').then((m) => m.UiIconDemoComponent),
        'monaco-showcase': () => import('./monaco/showcase/showcase.component').then((m) => m.ShowcaseComponent),
        'markdown-cheatsheet': () =>
          import('./markdown/cheat-sheet/cheat-sheet.component').then((m) => m.CheatSheetComponent),
      })
    ),
    provideNgeDoc(
      withBrand({ title: 'NG Essentials', icon: 'assets/images/nge.svg', href: '/' }),
      withSeo({ url: 'https://cisstech.github.io/nge', image: 'assets/images/nge.svg' }),
      withEditLink('https://github.com/cisstech/nge/edit/main/projects/demo/public/docs'),
      withSearchIndex('docs/search.json')
    ),
  ],
}
