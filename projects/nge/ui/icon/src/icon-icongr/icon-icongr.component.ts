import { Component, Injector, Input, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { IcongrIcon, ICON_TOKEN } from '../icons'

@Component({
  selector: 'ui-icon-icongr',
  templateUrl: './icon-icongr.component.html',
  styleUrls: ['./icon-icongr.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class IconIcongrComponent implements OnInit {
  private readonly injector = inject(Injector)

  @Input() icon!: IcongrIcon

  ngOnInit() {
    this.icon = this.icon || this.injector.get<IcongrIcon>(ICON_TOKEN)
  }
}
