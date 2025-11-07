/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core'
import { ListContext, ListTemplateSlots } from './list'
import { ListTemplateComponent } from './list-template.component'

@Component({
  selector: 'ui-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<T> implements OnChanges, AfterContentInit {
  @ContentChildren(ListTemplateComponent)
  templates!: QueryList<ListTemplateComponent<T>>

  @Input()
  idField!: string

  @Input()
  items: T[] = []

  @Input()
  trackBy?: string

  @Input()
  selectable = false

  @Input()
  filter?: string

  @Input()
  filterBy: string[] = []

  @Input()
  selections: T[] = []

  @Input()
  containerClass?: string

  @Output()
  selectionsChange = new EventEmitter<T[]>()

  _selectionStates: Record<string, boolean> = {}
  _noResultTemplate: TemplateRef<any> | null = null
  _emptyStateTemplate: TemplateRef<any> | null = null

  _empty = false

  get hasSelection() {
    return !!this.selections.length
  }

  protected get classes() {
    if (!this.containerClass) {
      return {}
    }
    return {
      [this.containerClass]: true,
    }
  }

  ngOnChanges() {
    this._empty = !this.items?.length
    setTimeout(() => {
      this.checkSelections()
    }, 300)
  }

  ngAfterContentInit() {
    this._noResultTemplate = this.templates.find((e) => e.slot === 'noresult')?.template || null
    this._emptyStateTemplate = this.templates.find((e) => e.slot === 'empty')?.template || null
  }

  unselect(item: T) {
    const id = (item as any)[this.idField]
    this.selections = this.selections.filter((e) => e !== item)
    this._selectionStates[id] = false
    this.selectionsChange.emit(this.selections)
  }

  _trackBy(index: number, item: any): any {
    if (this.trackBy) {
      return item[this.trackBy] ?? index
    }
    return index
  }

  _template(context: T | ListContext<T>, slot: ListTemplateSlots): TemplateRef<any> | null {
    return (
      this.templates.find((e) => {
        if (e.slot === slot && e.when) {
          return e.when(context)
        }
        return false
      })?.template ||
      this.templates.find((e) => e.slot === slot && !e.when)?.template ||
      null
    )
  }

  _isSelected(item: T): boolean {
    return !!this.selections.find((e) => e === item)
  }

  _toggleSelection(item: T): void {
    for (let i = 0; i < this.selections.length; i++) {
      if (this.equals(this.selections[i], item)) {
        this.selections.splice(i, 1)
        this.selectionsChange.emit(this.selections)
        return
      }
    }
    this.selections.push(item)
    this.selectionsChange.emit(this.selections)
  }

  private equals(a: any, b: any) {
    return a[this.idField] === b[this.idField]
  }

  private checkSelections() {
    this.selections = this.selections.filter((selection: any) => {
      if (this.items.find((item) => this.equals(item, selection))) {
        return true
      }
      delete this._selectionStates[selection[this.idField]]
      return false
    })
    this.selectionsChange.emit(this.selections)
  }
}
