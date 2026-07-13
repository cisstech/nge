import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgeDocService } from '../../../../core/nge-doc.service'

@Component({
  selector: 'nge-doc-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class PagerComponent {
  private readonly docService = inject(NgeDocService)
  protected readonly prev = this.docService.prevLink
  protected readonly next = this.docService.nextLink
  protected readonly labels = this.docService.labels
}
