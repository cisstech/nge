import { Component, Injector, Input, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { CodIcon, ICON_TOKEN } from '../icons'

@Component({
  selector: 'ui-icon-codicon',
  templateUrl: './icon-codicon.component.html',
  styleUrls: ['./icon-codicon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCodIconComponent implements OnInit {
  private readonly injector = inject(Injector)

  @Input() icon!: CodIcon

  ngOnInit() {
    this.icon = this.icon || this.injector.get<CodIcon>(ICON_TOKEN)
  }
}
