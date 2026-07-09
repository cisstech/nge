// ANGULAR
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

// LIBS
import { provideNgeDoc, withMarkdownRenderer, withNavbar } from '@cisstech/nge/doc'
import {
  NgeMarkdownAdmonitionsProvider,
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

// MODULE
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

export function markdownOptions(): NgeMarkdownConfig {
  return {
    // Align nge-markdown's dark detection with the class NgeDocThemeService toggles.
    darkThemeClassName: 'nge-doc-dark',
  }
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
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
        darkModeClass: 'nge-doc-dark',
      },
    }),
    AppRoutingModule,
  ],
  providers: [
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
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideNgeDoc(
      withNavbar([
        { title: 'nge/doc', href: '/docs/nge-doc/' },
        { title: 'nge/markdown', href: '/docs/nge-markdown/' },
        { title: 'nge/monaco', href: '/docs/nge-monaco/' },
      ]),
      withMarkdownRenderer({
        component: () => import('@cisstech/nge/markdown').then((m) => m.NgeMarkdownComponent),
      })
    ),
  ],
})
export class AppModule {}
