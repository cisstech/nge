/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ChangeDetectionStrategy,
  effect,
  inject,
  model,
  contentChildren,
  input,
} from '@angular/core'
import { ListContext, ListTemplateSlots } from './list'
import { ListTemplateComponent } from './list-template.component'
import { NgTemplateOutlet, NgClass } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgArrayPipesModule } from 'ngx-pipes'

@Component({
  selector: 'ui-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, NgClass, FormsModule, NgArrayPipesModule],
})
export class ListComponent<T> implements AfterContentInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef)

  readonly templates = contentChildren(ListTemplateComponent)

  readonly idField = input.required<string>()

  readonly items = input<T[]>([])

  readonly trackBy = input<string>()

  readonly selectable = input(false)

  readonly filter = input<string>()

  readonly filterBy = input<string[]>([])

  readonly selections = model<T[]>([])

  readonly containerClass = input<string>()

  _selectionStates: Record<string, boolean> = {}
  _noResultTemplate: TemplateRef<any> | null = null
  _emptyStateTemplate: TemplateRef<any> | null = null

  _empty = false

  get hasSelection() {
    return !!this.selections().length
  }

  protected get classes() {
    const containerClass = this.containerClass()
    if (!containerClass) {
      return {}
    }
    return {
      [containerClass]: true,
    }
  }

  constructor() {
    effect(() => {
      this._empty = !this.items()?.length
      setTimeout(() => this.checkSelections(), 300)
    })
  }

  ngAfterContentInit() {
    this._noResultTemplate =
      this.templates()
        .find((e) => e.slot() === 'noresult')
        ?.template() || null
    this._emptyStateTemplate =
      this.templates()
        .find((e) => e.slot() === 'empty')
        ?.template() || null
  }

  unselect(item: T) {
    const id = (item as any)[this.idField()]
    this.selections.set(this.selections().filter((e) => e !== item))
    this._selectionStates[id] = false
  }

  _template(context: T | ListContext<T>, slot: ListTemplateSlots): TemplateRef<any> | null {
    const templates = this.templates()
    return (
      templates
        .find((e) => {
          const when = e.when()
          if (e.slot() === slot && when) {
            return when(context)
          }
          return false
        })
        ?.template() ||
      templates.find((e) => e.slot() === slot && !e.when())?.template() ||
      null
    )
  }

  _isSelected(item: T): boolean {
    return !!this.selections().find((e) => e === item)
  }

  _toggleSelection(item: T): void {
    const current = this.selections()
    const index = current.findIndex((e) => this.equals(e, item))
    if (index >= 0) {
      this.selections.set(current.filter((_, i) => i !== index))
    } else {
      this.selections.set([...current, item])
    }
  }

  private equals(a: any, b: any) {
    return a[this.idField()] === b[this.idField()]
  }

  private checkSelections() {
    this.selections.set(
      this.selections().filter((selection: any) => {
        if (this.items().find((item) => this.equals(item, selection))) {
          return true
        }
        delete this._selectionStates[selection[this.idField()]]
        return false
      })
    )
    this.changeDetectorRef.markForCheck()
  }
}
