import { Component, Injector, Input, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FaIcon, ICON_TOKEN } from '../icons'

@Component({
  selector: 'ui-icon-fa',
  templateUrl: './icon-fa.component.html',
  styleUrls: ['./icon-fa.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class IconFaComponent implements OnInit {
  @Input() icon!: FaIcon

  constructor(private readonly injector: Injector) {}

  ngOnInit() {
    this.icon = this.icon || this.injector.get<FaIcon>(ICON_TOKEN)
  }
}
