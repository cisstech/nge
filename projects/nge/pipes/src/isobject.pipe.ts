import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isobject',
  standalone: true,
})
export class IsObject implements PipeTransform {
  transform(value: any): value is object {
    return typeof value === 'object'
  }
}
