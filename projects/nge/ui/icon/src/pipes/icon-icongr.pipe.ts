import { Pipe, PipeTransform } from '@angular/core';
import { IcongrIcon, IcongrOptions } from '../icons';

@Pipe({ name: 'iconIcongr' })
export class IconIcongrPipe implements PipeTransform {
  transform(name: string, options?: IcongrOptions): IcongrIcon {
    return new IcongrIcon(name, options);
  }
}
