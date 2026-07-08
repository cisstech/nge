import { Pipe, PipeTransform } from '@angular/core'
import { CodIcon } from '../icons'

@Pipe({ name: 'iconCodicon' })
export class IconCodiconPipe implements PipeTransform {
  transform(name: string): CodIcon {
    return new CodIcon(name)
  }
}
