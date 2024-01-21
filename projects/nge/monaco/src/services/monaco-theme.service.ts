import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgeMonacoContribution } from '../contributions/monaco-contribution';
import { NGE_MONACO_CONFIG, NgeMonacoConfig } from '../monaco-config';

@Injectable({ providedIn: 'root' })
export class NgeMonacoThemeService implements NgeMonacoContribution {
  private readonly themes = new BehaviorSubject<string[]>([]);
  private readonly activeTheme = new BehaviorSubject<
    NgeMonacoTheme | undefined
  >(undefined);

  private themeService: any;

  constructor(
    @Optional()
    private readonly http: HttpClient,

    @Optional()
    @Inject(NGE_MONACO_CONFIG)
    private readonly config: NgeMonacoConfig
  ) { }

  /**
   * Gets the current active theme of monaco editor (undefined if monaco editor is not loaded).
   */
  get theme(): NgeMonacoTheme | undefined {
    return this.activeTheme.value;
  }

  /**
   * Gets an observable that emit each time monaco editor theme change.
   *
   * Note: The observable emits first with the current theme
   * the first time `subscribe()` method is called.
   */
  get themeChanges(): Observable<NgeMonacoTheme | undefined> {
    return this.activeTheme.asObservable();
  }

  /**
   * Gets an observable that emit each time monaco editor theme list change.
   */
  get themesChanges(): Observable<string[]> {
    return this.themes.asObservable().pipe(
      map((e) => e.slice()) // return a copy of the array
    );
  }

  async activate(): Promise<void> {
    this.decorateCreateEditorAPI();

    const node = document.createElement('div');

    const editor = monaco.editor.create(node);
    this.themeService = (editor as any)._themeService;
    setTimeout(() => editor.dispose());

    this.retrieveThemes();

    await this.setTheme(this.config?.theming?.default || 'vs');
    node.remove()
  }

  /**
   * Switches monaco editor theme.
   * @param themeName The new theme to use.
   *
   */
  async setTheme(themeName: string): Promise<void> {
    await this.defineTheme(themeName);
    monaco.editor.setTheme(themeName);
    this.activeTheme.next(this.themeService.getColorTheme());
  }

  /**
   * Gets the information about the given `themeName`
   * @param themeName The theme to get.
   * @returns A promise that resolves with the theme info.
   */
  async getTheme(themeName: string): Promise<NgeMonacoTheme> {
    await this.defineTheme(themeName);
    return this.themeService._knownThemes.get(themeName);
  }

  /**
   * Defines a theme for the Monaco editor.
   * @remarks
   * - If the theme is already defined, this method does nothing.
   * @param themeName - The name of the theme to define.
   * @throws {ReferenceError} If the themeName argument is not provided.
   * @throws {Error} If the specified theme is missing.
   * @throws {Error} If HttpClientModule is missing in AppModule.
   * @returns A Promise that resolves when the theme is defined successfully.
   */
  async defineTheme(themeName: string): Promise<void> {
    if (!themeName) {
      throw new ReferenceError('Argument "themeName" is required');
    }

    const knownThemes: Map<string, NgeMonacoTheme> =
      this.themeService._knownThemes;
    if (knownThemes.has(themeName)) {
      return;
    }

    const customThemePath = this.config?.theming?.themes?.find((e) => {
      return this.themeNameFromPath(e) === themeName;
    });
    if (!customThemePath) {
      throw new Error(`[nge-monaco] Missing theme "${themeName}"`);
    }

    if (!this.http) {
      throw new Error(
        '[nge-monaco] Missing HttpClientModule in AppModule. See README for more information'
      );
    }

    try {
      const theme = await firstValueFrom(this.http.get<any>(customThemePath));
      monaco.editor.defineTheme(themeName, {
        base: theme.base,
        inherit: theme.inherit,
        rules: theme.rules,
        colors: theme.colors as any,
      });
    } catch (error) {
      console.error(
        '[nge-monaco] Failed to load theme ' + customThemePath,
        error
      );
    }
  }

  private retrieveThemes(): void {
    const themes: string[] = [];
    this.themeService._knownThemes.forEach((theme: any) => {
      themes.push(theme.themeName);
    });
    const customThemes: string[] = (this.config?.theming?.themes || []).map(
      this.themeNameFromPath.bind(this)
    );
    this.themes.next(themes.concat(customThemes));
  }

  private themeNameFromPath(path: string): string {
    const name = path.split('/').pop();
    if (!name) {
      throw new Error(`[nge-monaco]: invalid theme path "${path}"`);
    }
    return name.replace('.json', '');
  }


  private decorateCreateEditorAPI(): void {
    const createEditor = monaco.editor.create;
    monaco.editor.create = (
      element: HTMLElement,
      options?: monaco.editor.IStandaloneEditorConstructionOptions | undefined,
      override?: monaco.editor.IEditorOverrideServices | undefined
    ) => {
      const editor = createEditor.call(monaco.editor, element, options, override);
      const updateOptions = editor.updateOptions;
      editor.updateOptions = (newOptions: monaco.editor.IStandaloneEditorConstructionOptions) => {
        updateOptions.call(editor, newOptions);
        if (newOptions.theme) {
          this.setTheme(newOptions.theme).catch(console.error);
        }
      };

      if (options?.theme) {
        this.setTheme(options.theme).catch(console.error);
      }
      return editor;
    };
  }
}

export interface NgeMonacoTheme {
  id: string;
  type: 'light' | 'dark' | 'hc';
  colors: Map<string, any>;
  themeName: string;
  semanticHighlighting: boolean;
  themeData: monaco.editor.IStandaloneThemeData;
  defaultColors: Map<string, any>;
  defines(colorId: string): boolean;
  getColor(colorId: string, useDefault?: boolean): any;
  getColors(): Map<string, any>;
}

/** List of all custom themes from of the library */
export const NGE_MONACO_THEMES = [
  'active4d.json',
  'all-hallows-eve.json',
  'amy.json',
  'birds-of-paradise.json',
  'blackboard.json',
  'brilliance-black.json',
  'brilliance-dull.json',
  'chrome-devtools.json',
  'clouds-midnight.json',
  'clouds.json',
  'cobalt.json',
  'dawn.json',
  'dreamweaver.json',
  'eiffel.json',
  'espresso-libre.json',
  'github.json',
  'idle-fingers.json',
  'idle.json',
  'iplastic.json',
  'katzenmilch.json',
  'kuroir-theme.json',
  'kr-theme.json',
  'lazy.json',
  'magicwb-amiga.json',
  'merbivore-soft.json',
  'merbivore.json',
  'monokai-bright.json',
  'monokai.json',
  'monoindustrial.json',
  'night-owl.json',
  'nord.json',
  'oceanic-next.json',
  'one-dark-pro.json',
  'pastels-on-dark.json',
  'slush-and-poppies.json',
  'solarized-dark.json',
  'solarized-light.json',
  'space-cadet.json',
  'sunburst.json',
  'textmate.json',
  'tomorrow-night-blue.json',
  'tomorrow-night-bright.json',
  'tomorrow-night-eighties.json',
  'tomorrow-night.json',
  'tomorrow.json',
  'twilight.json',
  'upstream-sunburst.json',
  'vibrant-ink.json',
  'xcode.json',
  'zenburnesque.json',
];
