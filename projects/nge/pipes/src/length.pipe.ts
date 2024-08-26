import { NgModule, Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'length',
  standalone: true,
})
export class LengthPipe implements PipeTransform {
  transform(value: any): number {
    return Array.isArray(value) ? value.length : Object.keys(value).length
  }
}

/**
 * @deprecated in favor of standalone api, so please use direclty the pipe as a standalone. Will be removed in/after v18
 */
@NgModule({
  exports: [LengthPipe],
  imports: [LengthPipe],
})
export class LengthPipeModule {}
