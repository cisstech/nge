import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router'

import { provideNgeDoc, withBrand, withMarkdownRenderer, withNavbar } from '@cisstech/nge/doc'
import {
  NgeMarkdownAdmonitionsProvider,
  NgeMarkdownComponentsProvider,
  NgeMarkdownConfig,
  NgeMarkdownConfigProvider,
  NgeMarkdownEmojiProvider,
  NgeMarkdownHighlighterMonacoProvider,
  NgeMarkdownHighlighterProvider,
  NgeMarkdownIconsProvider,
  NgeMarkdownKatexProvider,
  NgeMarkdownLinkAnchorProvider,
  NgeMarkdownModule,
  NgeMarkdownTabbedSetProvider,
  NgeMarkdownThemeProvider,
} from '@cisstech/nge/markdown'
import { NGE_MONACO_THEMES, NgeMonacoColorizerService, NgeMonacoModule } from '@cisstech/nge/monaco'

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
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    importProvidersFrom(
      NgeMarkdownModule,
      NgeMonacoModule.forRoot({
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
      })
    ),
    NgeMarkdownConfigProvider(markdownOptions),
    NgeMarkdownThemeProvider({
      name: 'github',
      styleUrl: 'assets/nge/markdown/themes/github.css',
    }),
    NgeMarkdownKatexProvider,
    NgeMarkdownIconsProvider,
    NgeMarkdownEmojiProvider,
    NgeMarkdownTabbedSetProvider,
    NgeMarkdownLinkAnchorProvider,
    NgeMarkdownAdmonitionsProvider,
    NgeMarkdownHighlighterProvider,
    NgeMarkdownHighlighterMonacoProvider(NgeMonacoColorizerService),
    NgeMarkdownComponentsProvider({
      'demo-counter': () => import('./markdown/embed-demo/embed-demo.component').then((m) => m.EmbedDemoComponent),
      'ui-tree-demo': () => import('./ui-demos/ui-tree-demo.component').then((m) => m.UiTreeDemoComponent),
      'ui-list-demo': () => import('./ui-demos/ui-list-demo.component').then((m) => m.UiListDemoComponent),
      'ui-icon-demo': () => import('./ui-demos/ui-icon-demo.component').then((m) => m.UiIconDemoComponent),
    }),
    provideNgeDoc(
      withBrand({ title: 'NG Essentials', icon: 'assets/images/nge.svg', href: '/' }),
      withNavbar([
        { title: 'Overview', href: '/docs/overview/', icon: 'assets/icons/nav/overview.svg' },
        { title: 'nge/doc', href: '/docs/nge-doc/', icon: 'assets/icons/nav/doc.svg' },
        { title: 'nge/markdown', href: '/docs/nge-markdown/', icon: 'assets/icons/nav/markdown.svg' },
        { title: 'nge/monaco', href: '/docs/nge-monaco/', icon: 'assets/icons/nav/monaco.svg' },
        { title: 'nge/ui', href: '/docs/nge-ui/', icon: 'assets/icons/nav/ui.svg' },
        { title: 'Utilities', href: '/docs/utilities/', icon: 'assets/icons/nav/utils.svg' },
      ]),
      withMarkdownRenderer({
        component: () => import('@cisstech/nge/markdown').then((m) => m.NgeMarkdownComponent),
      })
    ),
  ],
}
