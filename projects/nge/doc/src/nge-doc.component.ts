import { ChangeDetectionStrategy, Component, OnInit, Type, inject, signal } from '@angular/core'
import { NgComponentOutlet } from '@angular/common'
import { NgeDocService } from './nge-doc.service'
import { DEFAULT_NGE_DOC_LAYOUT, NGE_DOC_LAYOUT } from './nge-doc.providers'

@Component({
  selector: 'nge-doc',
  templateUrl: './nge-doc.component.html',
  providers: [NgeDocService],
  styleUrls: ['nge-doc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet],
})
export class NgeDocComponent implements OnInit {
  private readonly docService = inject(NgeDocService)
  private readonly layoutLoader = inject(NGE_DOC_LAYOUT, { optional: true }) ?? DEFAULT_NGE_DOC_LAYOUT

  /** Resolved theme component, mounted once the engine and the theme are ready. */
  protected readonly layout = signal<Type<unknown> | null>(null)

  async ngOnInit(): Promise<void> {
    // Resolve navigation state before mounting so the theme paints with data.
    await this.docService.setup()
    const loaded = await this.layoutLoader()
    this.layout.set('default' in loaded ? loaded.default : loaded)
  }
}
