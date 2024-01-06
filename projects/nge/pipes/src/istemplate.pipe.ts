import { Pipe, PipeTransform, TemplateRef } from '@angular/core';

@Pipe({
  name: 'istemplate',
  standalone: true,
})
export class IsTemplatePipe implements PipeTransform {
  transform(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
}
