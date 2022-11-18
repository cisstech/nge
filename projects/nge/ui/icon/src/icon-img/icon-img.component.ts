import { Component, Injector, Input, OnInit } from '@angular/core';
import { ICON_TOKEN, ImgIcon } from '../icons';

@Component({
  selector: 'ui-icon-img',
  templateUrl: './icon-img.component.html',
  styleUrls: ['./icon-img.component.scss'],
})
export class IconImgComponent implements OnInit {
  @Input() icon!: ImgIcon;

  constructor(private readonly injector: Injector) {}

  ngOnInit() {
    this.icon = this.icon || this.injector.get<ImgIcon>(ICON_TOKEN);
  }
}
