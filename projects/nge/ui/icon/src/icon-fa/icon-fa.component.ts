import { Component, Injector, Input, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { FaIcon, ICON_TOKEN } from '../icons'

@Component({
  selector: 'ui-icon-fa',
  templateUrl: './icon-fa.component.html',
  styleUrls: ['./icon-fa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFaComponent implements OnInit {
  private readonly injector = inject(Injector)

  @Input() icon!: FaIcon

  ngOnInit() {
    this.icon = this.icon || this.injector.get<FaIcon>(ICON_TOKEN)
  }
}
