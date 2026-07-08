import { Component, Injector, Input, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { ICON_TOKEN, ImgIcon } from '../icons'

@Component({
  selector: 'ui-icon-img',
  templateUrl: './icon-img.component.html',
  styleUrls: ['./icon-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconImgComponent implements OnInit {
  private readonly injector = inject(Injector)

  @Input() icon!: ImgIcon

  ngOnInit() {
    this.icon = this.icon || this.injector.get<ImgIcon>(ICON_TOKEN)
  }
}
