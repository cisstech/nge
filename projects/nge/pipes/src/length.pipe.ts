import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length'
})
export class LengthPipe implements PipeTransform {
  transform(value: any): number {
    return Array.isArray(value) ? value.length : Object.keys(value).length;
  }
}


@NgModule({
  exports: [LengthPipe],
  declarations: [LengthPipe],
})
export class LengthPipeModule { }
