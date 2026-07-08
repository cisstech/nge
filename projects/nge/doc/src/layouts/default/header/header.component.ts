import { ChangeDetectionStrategy, Component, Injector, inject, output } from '@angular/core'
import { NgeDocLinkActionHandler } from '../../../nge-doc'
import { NgeDocService } from '../../../nge-doc.service'
import { RouterLink } from '@angular/router'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'nge-doc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AsyncPipe],
})
export class HeaderComponent {
  readonly injector = inject(Injector)
  readonly docService = inject(NgeDocService)

  readonly toggle = output()
  state$ = this.docService.stateChanges

  async invoke(handler: NgeDocLinkActionHandler) {
    if (typeof handler === 'string') {
      window.open(handler, '_blank')
    } else {
      await handler(this.injector)
    }
  }
}
