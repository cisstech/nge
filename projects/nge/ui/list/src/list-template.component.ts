import { Component, ContentChild, TemplateRef, Input } from '@angular/core';
import { ListContext, ListTemplateSlots } from './list';

@Component({
    selector: 'ui-list-template',
    template: ``
})
export class ListTemplateComponent<T> {
    @ContentChild(TemplateRef)
    template?: TemplateRef<ListContext<T>>;

    @Input()
    slot?: ListTemplateSlots;

    @Input()
    when?: (context: T | ListContext<T>) => boolean;
}
