import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { Icon } from './icons'
import { NgSwitch } from '@angular/common'
import { CdkPortalOutlet } from '@angular/cdk/portal'
import { IconPipe } from './pipes/icon.pipe'

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgSwitch, CdkPortalOutlet, IconPipe],
})
export class IconComponent {
  @Input() icon?: Icon
}
