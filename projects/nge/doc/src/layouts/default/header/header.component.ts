import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Output, inject } from '@angular/core'
import { NgeDocLinkActionHandler } from '../../../nge-doc'
import { NgeDocService } from '../../../nge-doc.service'

@Component({
  selector: 'nge-doc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class HeaderComponent {
  readonly injector = inject(Injector)
  readonly docService = inject(NgeDocService)

  @Output() toggle = new EventEmitter()
  state$ = this.docService.stateChanges

  async invoke(handler: NgeDocLinkActionHandler) {
    if (typeof handler === 'string') {
      window.open(handler, '_blank')
    } else {
      await handler(this.injector)
    }
  }
}
