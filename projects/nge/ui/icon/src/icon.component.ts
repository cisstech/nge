import { Component, ChangeDetectionStrategy, input } from '@angular/core'
import { Icon } from './icons'
import { CdkPortalOutlet } from '@angular/cdk/portal'
import { IconPipe } from './pipes/icon.pipe'

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkPortalOutlet, IconPipe],
})
export class IconComponent {
  readonly icon = input<Icon>()
}
