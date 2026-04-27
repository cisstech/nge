import { Pipe, PipeTransform } from '@angular/core'
import { FaIcon } from '../icons'

@Pipe({ name: 'iconFa', standalone: false })
export class IconFaPipe implements PipeTransform {
  transform(name: string): FaIcon {
    return new FaIcon(name)
  }
}
