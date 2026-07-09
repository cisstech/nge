import { DOCUMENT, InjectionToken, Injectable, computed, effect, inject, signal } from '@angular/core'

/** Color scheme preference. `auto` follows the operating system setting. */
export type NgeDocColorScheme = 'light' | 'dark' | 'auto'

/** Default color scheme used when the user has not chosen one yet (see `withDarkMode`). */
export const NGE_DOC_DEFAULT_COLOR_SCHEME = new InjectionToken<NgeDocColorScheme>('NGE_DOC_DEFAULT_COLOR_SCHEME')

/**
 * Owns the documentation color scheme.
 *
 * The resolved scheme is reflected as a `nge-doc-dark` class on the document
 * root and as a native `color-scheme`, so themes and the markdown renderer can
 * style themselves through plain CSS without re-rendering. Provided in root so a
 * single instance is shared by every theme.
 */
@Injectable({ providedIn: 'root' })
export class NgeDocThemeService {
  private static readonly STORAGE_KEY = 'nge-doc-color-scheme'
  private static readonly DARK_CLASS = 'nge-doc-dark'

  private readonly document = inject(DOCUMENT)
  private readonly window = this.document.defaultView
  private readonly defaultScheme = inject(NGE_DOC_DEFAULT_COLOR_SCHEME, { optional: true }) ?? 'auto'

  private readonly systemPrefersDark = signal(this.matchSystemDark())

  /** The user preference. Defaults to `auto` (follows the OS). */
  readonly scheme = signal<NgeDocColorScheme>(this.readStoredScheme())

  /** Whether dark mode is currently active once `auto` is resolved. */
  readonly isDark = computed(() =>
    this.scheme() === 'auto' ? this.systemPrefersDark() : this.scheme() === 'dark'
  )

  constructor() {
    const query = this.window?.matchMedia?.('(prefers-color-scheme: dark)')
    query?.addEventListener?.('change', (event) => this.systemPrefersDark.set(event.matches))

    effect(() => {
      const root = this.document.documentElement
      const dark = this.isDark()
      root.classList.toggle(NgeDocThemeService.DARK_CLASS, dark)
      root.style.colorScheme = dark ? 'dark' : 'light'
    })
  }

  /** Sets the color scheme preference and persists it. */
  setScheme(scheme: NgeDocColorScheme): void {
    this.scheme.set(scheme)
    try {
      this.window?.localStorage?.setItem(NgeDocThemeService.STORAGE_KEY, scheme)
    } catch {
      // Storage can throw in private mode; the choice just won't persist.
    }
  }

  /** Flips between light and dark, pinning the resolved value. */
  toggle(): void {
    this.setScheme(this.isDark() ? 'light' : 'dark')
  }

  private matchSystemDark(): boolean {
    return this.window?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  }

  private readStoredScheme(): NgeDocColorScheme {
    try {
      const stored = this.window?.localStorage?.getItem(NgeDocThemeService.STORAGE_KEY)
      if (stored === 'light' || stored === 'dark' || stored === 'auto') {
        return stored
      }
    } catch {
      // Ignore unreadable storage and fall back to the configured default.
    }
    return this.defaultScheme
  }
}
