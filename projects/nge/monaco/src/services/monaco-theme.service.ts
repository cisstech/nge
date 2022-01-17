import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgeMonacoContribution } from '../contributions/monaco-contribution';
import { NgeMonacoConfig, NGE_MONACO_CONFIG } from '../monaco-config';

@Injectable({ providedIn: 'root' })
export class NgeMonacoThemeService implements NgeMonacoContribution {

    private readonly themes = new BehaviorSubject<string[]>([]);
    private readonly activeTheme = new BehaviorSubject<NgeMonacoTheme | undefined>(
        undefined
    );

    private themeService: any;

    constructor(
        @Optional()
        private readonly http: HttpClient,

        @Optional()
        @Inject(NGE_MONACO_CONFIG)
        private readonly config: NgeMonacoConfig
    ) {}

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

    async activate() {
        const node = document.createElement('div');
        const editor = monaco.editor.create(node);
        this.themeService = (editor as any)._themeService;
        setTimeout(() => editor.dispose());

        this.retrieveThemes();

        await this.setTheme(this.config?.theming?.default || 'vs');
    }

    /**
     * Switches monaco editor theme.
     * @param themeName The new theme to use.
     *
     */
    async setTheme(themeName: string) {
        await this.defineTheme(themeName);
        monaco.editor.setTheme(themeName);
        this.activeTheme.next(this.themeService.getColorTheme());
    }

    /**
     * Gets the information about the given `themeName`
     * @param themeName The theme to get.
     * @returns A promise that resolves with the theme info.
     */
    async getTheme(themeName: string) {
        await this.defineTheme(themeName);
        return this.themeService._knownThemes.get(themeName);
    }

    private retrieveThemes() {
        const themes: string[] = [];
        this.themeService._knownThemes.forEach((theme: any) => {
            themes.push(theme.themeName);
        });
        const customThemes: string[] = (this.config?.theming?.themes || []).map(
            this.themeNameFromPath.bind(this)
        );
        this.themes.next(themes.concat(customThemes));
    }

    private themeNameFromPath(path: string) {
        const name = path.split('/').pop();
        if (!name) {
            throw new Error(`[nge-monaco]: invalid theme path "${path}"`);
        }
        return name.replace('.json', '');
    }

    private async defineTheme(themeName: string) {
        if (!themeName) {
            throw new ReferenceError('Argument "themeName" is required');
        }

        const knownThemes: Map<string, NgeMonacoTheme> = this.themeService
            ._knownThemes;
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
            const theme = await lastValueFrom(this.http.get<any>(customThemePath));
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
