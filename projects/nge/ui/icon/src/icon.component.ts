import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { Icon } from './icons'

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class IconComponent {
  @Input() icon?: Icon
}
