import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'
import { NGE_MONACO_CONTRIBUTION } from './contributions/monaco-contribution'
import { PreventSymbolDuplication } from './contributions/prevent-symbol-duplication'
import { NGE_MONACO_CONFIG, NgeMonacoConfig } from './monaco-config'
import { NgeMonacoThemeService } from './services/monaco-theme.service'

/**
 * Configure the Monaco editors at the application root:
 *
 * ```ts
 * providers: [
 *   provideNgeMonaco({
 *     theming: { themes: NGE_MONACO_THEMES.map((t) => 'assets/nge/monaco/themes/' + t), default: 'github' },
 *   }),
 * ]
 * ```
 *
 * The editor components themselves are standalone; import them (or
 * `NgeMonacoModule`) where the templates use them.
 */
export function provideNgeMonaco(config: NgeMonacoConfig | (() => NgeMonacoConfig) = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    typeof config === 'function'
      ? { provide: NGE_MONACO_CONFIG, useFactory: config }
      : { provide: NGE_MONACO_CONFIG, useValue: config },
    { provide: NGE_MONACO_CONTRIBUTION, multi: true, useExisting: NgeMonacoThemeService },
    { provide: NGE_MONACO_CONTRIBUTION, multi: true, useClass: PreventSymbolDuplication },
  ])
}
