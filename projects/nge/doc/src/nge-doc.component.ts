import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { NgeDocService } from './nge-doc.service'
import { DefaultLayoutComponent } from './layouts/default/default-layout.component'

@Component({
  selector: 'nge-doc',
  templateUrl: './nge-doc.component.html',
  providers: [NgeDocService],
  styleUrls: ['nge-doc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DefaultLayoutComponent],
})
export class NgeDocComponent implements OnInit {
  private readonly docService = inject(NgeDocService)

  async ngOnInit() {
    await this.docService.setup()
  }
}
