import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Type, inject, signal } from '@angular/core'
import { NgComponentOutlet } from '@angular/common'
import { NgeDocService } from '../core/nge-doc.service'
import { NgeDocThemeService } from '../core/nge-doc-theme.service'
import { NgeDocSeoService } from '../core/seo.service'
import { NgeDocSitesLoader } from '../core/sites-loader'
import { DEFAULT_NGE_DOC_LAYOUT, NGE_DOC_LAYOUT } from '../core/providers'

@Component({
  selector: 'nge-doc',
  templateUrl: './nge-doc.component.html',
  // NgeDocService is the facade; its collaborators live in the same route scope.
  providers: [NgeDocService, NgeDocSeoService, NgeDocSitesLoader],
  styleUrls: ['nge-doc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet],
})
export class NgeDocComponent implements OnInit, OnDestroy {
  private readonly docService = inject(NgeDocService)
  private readonly themeService = inject(NgeDocThemeService)
  private readonly layoutLoader = inject(NGE_DOC_LAYOUT, { optional: true }) ?? DEFAULT_NGE_DOC_LAYOUT

  /** Resolved theme component, mounted once the engine and the theme are ready. */
  protected readonly layout = signal<Type<unknown> | null>(null)

  constructor() {
    // Manage the document color scheme only while the docs are mounted.
    this.themeService.setActive(true)
  }

  async ngOnInit(): Promise<void> {
    // Resolve navigation state before mounting so the theme paints with data.
    await this.docService.setup()
    const loaded = await this.layoutLoader()
    this.layout.set('default' in loaded ? loaded.default : loaded)
  }

  ngOnDestroy(): void {
    // Release the document root so the scheme does not leak outside the docs.
    this.themeService.setActive(false)
  }
}
