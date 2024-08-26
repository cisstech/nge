import { Pipe, PipeTransform } from '@angular/core'
import { NgeIconService } from '../icon.service'
import { FileIconOptions, ImgIcon } from '../icons'

@Pipe({ name: 'iconFile' })
export class IconFilePipe implements PipeTransform {
  constructor(private readonly service: NgeIconService) {}

  transform(fileName: string, options?: FileIconOptions): ImgIcon {
    options = options || {
      alt: fileName,
      isRoot: false,
      isDirectory: false,
    }
    return this.service.fromFileName(fileName, options)
  }
}
