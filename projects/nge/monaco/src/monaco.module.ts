import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgeMonacoDiffEditorComponent } from './components/monaco-diff-editor/monaco-diff-editor.component';
import { NgeMonacoEditorComponent } from './components/monaco-editor/monaco-editor.component';
import { NgeMonacoViewerComponent } from './components/monaco-viewer/monaco-viewer.component';
import { NGE_MONACO_CONTRIBUTION } from './contributions/monaco-contribution';
import { PreventSymbolDuplication } from './contributions/prevent-symbol-duplication';
import { NgeMonacoConfig, NGE_MONACO_CONFIG } from './monaco-config';
import { NgeMonacoThemeService } from './services/monaco-theme.service';
import { NgeMonacoPlaceholderComponent } from './components/monaco-placeholder/monaco-placeholder.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    NgeMonacoEditorComponent,
    NgeMonacoDiffEditorComponent,
    NgeMonacoViewerComponent,
  ],
  declarations: [
    NgeMonacoEditorComponent,
    NgeMonacoDiffEditorComponent,
    NgeMonacoViewerComponent,
    NgeMonacoPlaceholderComponent,
  ],
})
export class NgeMonacoModule {
  static forRoot(
    config: NgeMonacoConfig
  ): ModuleWithProviders<NgeMonacoModule> {
    return {
      ngModule: NgeMonacoModule,
      providers: [
        { provide: NGE_MONACO_CONFIG, useValue: config },
        {
          provide: NGE_MONACO_CONTRIBUTION,
          multi: true,
          useExisting: NgeMonacoThemeService,
        },
        {
          provide: NGE_MONACO_CONTRIBUTION,
          multi: true,
          useClass: PreventSymbolDuplication,
        },
      ],
    };
  }
}
