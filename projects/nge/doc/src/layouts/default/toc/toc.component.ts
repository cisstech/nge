import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { NgeDocRendererComponent } from '../../../renderer/renderer.component'
import { NgeDocService } from '../../../nge-doc.service'

@Component({
  selector: 'nge-doc-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TocComponent {
  /** The active renderer, whose extracted headings drive this table of contents. */
  readonly renderer = input.required<NgeDocRendererComponent>()

  protected readonly labels = inject(NgeDocService).labels

  protected onSelect(event: Event, id: string): void {
    event.preventDefault()
    this.renderer().scrollToHeading(id)
  }

  protected scrollToTop(): void {
    const options: ScrollToOptions = { top: 0, behavior: 'smooth' }
    // scrollingElement is the viewport scroller (document root or body).
    document.scrollingElement?.scrollTo(options)
    window.scrollTo(options)
  }
}
