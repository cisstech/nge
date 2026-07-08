import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { NgeDocService } from './nge-doc.service'

@Component({
  selector: 'nge-doc',
  templateUrl: './nge-doc.component.html',
  providers: [NgeDocService],
  styleUrls: ['nge-doc.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class NgeDocComponent implements OnInit {
  private readonly docService = inject(NgeDocService)

  async ngOnInit() {
    await this.docService.setup()
  }
}
