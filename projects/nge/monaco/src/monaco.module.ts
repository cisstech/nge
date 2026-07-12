import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { NgeMonacoDiffEditorComponent } from './components/monaco-diff-editor/monaco-diff-editor.component'
import { NgeMonacoEditorComponent } from './components/monaco-editor/monaco-editor.component'
import { NgeMonacoViewerComponent } from './components/monaco-viewer/monaco-viewer.component'
import { NgeMonacoConfig } from './monaco-config'
import { provideNgeMonaco } from './monaco.providers'
import { NgeMonacoPlaceholderComponent } from './components/monaco-placeholder/monaco-placeholder.component'

@NgModule({
  imports: [
    CommonModule,
    NgeMonacoEditorComponent,
    NgeMonacoDiffEditorComponent,
    NgeMonacoViewerComponent,
    NgeMonacoPlaceholderComponent,
  ],
  exports: [NgeMonacoEditorComponent, NgeMonacoDiffEditorComponent, NgeMonacoViewerComponent],
})
export class NgeMonacoModule {
  /** @deprecated Use `provideNgeMonaco(config)` in the application providers instead; will be removed in the next major. */
  static forRoot(config: NgeMonacoConfig | (() => NgeMonacoConfig)): ModuleWithProviders<NgeMonacoModule> {
    return {
      ngModule: NgeMonacoModule,
      providers: [provideNgeMonaco(config)],
    }
  }
}
