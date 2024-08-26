import { NgModule, Pipe, PipeTransform } from '@angular/core'

/**
 * https://icongr.am
 */
@Pipe({
  name: 'icongr',
  standalone: true,
})
export class IconGrPipe implements PipeTransform {
  transform(value: any): any {
    const pattern = /(\w+)\s+([\w-]+)((\s+(?:color|size)=[^\s]+)*)?/gm
    return value.replace(pattern, (_: string, type: string, name: string, params?: string) => {
      params = (params ?? '')
        .trim()
        .split(' ')
        .filter((e) => e.trim())
        .join('&')
      params = params ? '?' + params : ''
      return `https://icongr.am/${type.trim()}/${name.trim()}.svg${params}`
    })
  }
}

/**
 * @deprecated in favor of standalone api, so please use direclty the pipe as a standalone. Will be removed in/after v18
 */
@NgModule({
  imports: [IconGrPipe],
  exports: [IconGrPipe],
})
export class IconGrPipeModule {}
