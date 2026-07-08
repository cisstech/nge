import { Component, TemplateRef, Input, ChangeDetectionStrategy, contentChild } from '@angular/core'
import { ListContext, ListTemplateSlots } from './list'

@Component({
  selector: 'ui-list-template',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTemplateComponent<T> {
  readonly template = contentChild(TemplateRef)

  @Input()
  slot?: ListTemplateSlots

  @Input()
  when?: (context: T | ListContext<T>) => boolean
}
