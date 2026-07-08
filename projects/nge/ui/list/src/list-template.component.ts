import { Component, TemplateRef, ChangeDetectionStrategy, contentChild, input } from '@angular/core'
import { ListContext, ListTemplateSlots } from './list'

@Component({
  selector: 'ui-list-template',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTemplateComponent<T> {
  readonly template = contentChild(TemplateRef)

  readonly slot = input<ListTemplateSlots>()

  readonly when = input<(context: T | ListContext<T>) => boolean>()
}
