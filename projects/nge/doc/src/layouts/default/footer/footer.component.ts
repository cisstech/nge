import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NgeDocService } from '../../../nge-doc.service'

@Component({
  selector: 'nge-doc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FooterComponent {
  private readonly docService = inject(NgeDocService)

  readonly state$ = this.docService.stateChanges
}
