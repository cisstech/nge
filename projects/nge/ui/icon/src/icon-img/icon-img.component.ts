import { Component, Injector, Input, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ICON_TOKEN, ImgIcon } from '../icons'

@Component({
  selector: 'ui-icon-img',
  templateUrl: './icon-img.component.html',
  styleUrls: ['./icon-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class IconImgComponent implements OnInit {
  @Input() icon!: ImgIcon

  constructor(private readonly injector: Injector) {}

  ngOnInit() {
    this.icon = this.icon || this.injector.get<ImgIcon>(ICON_TOKEN)
  }
}
