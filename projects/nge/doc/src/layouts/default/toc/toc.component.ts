import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { NgeDocRendererComponent } from '../../../renderer/renderer.component'

@Component({
  selector: 'nge-doc-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TocComponent {
  /** The active renderer, whose extracted headings drive this table of contents. */
  readonly renderer = input.required<NgeDocRendererComponent>()

  protected onSelect(event: Event, id: string): void {
    event.preventDefault()
    this.renderer().scrollToHeading(id)
  }
}
