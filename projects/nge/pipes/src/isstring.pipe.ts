import { Pipe, PipeTransform, TemplateRef } from '@angular/core';

@Pipe({
  name: 'isstring',
  standalone: true,
})
export class IsStringPipe implements PipeTransform {
  transform(value: any): value is string {
    return typeof value === 'string'
  }
}
