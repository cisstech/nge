import { Component, Injector, Input, OnInit } from '@angular/core'
import { IcongrIcon, ICON_TOKEN } from '../icons'

@Component({
  selector: 'ui-icon-icongr',
  templateUrl: './icon-icongr.component.html',
  styleUrls: ['./icon-icongr.component.scss'],
})
export class IconIcongrComponent implements OnInit {
  @Input() icon!: IcongrIcon

  constructor(private readonly injector: Injector) {}

  ngOnInit() {
    this.icon = this.icon || this.injector.get<IcongrIcon>(ICON_TOKEN)
  }
}
