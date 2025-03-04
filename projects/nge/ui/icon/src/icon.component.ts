import { Component, Input } from '@angular/core'
import { Icon } from './icons'

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() icon?: Icon
}
