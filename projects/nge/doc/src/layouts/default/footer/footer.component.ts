import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NgeDocService } from '../../../nge-doc.service'
import { RouterLink } from '@angular/router'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'nge-doc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AsyncPipe],
})
export class FooterComponent {
  private readonly docService = inject(NgeDocService)

  readonly state$ = this.docService.stateChanges
}
