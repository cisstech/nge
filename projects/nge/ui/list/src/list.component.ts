/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  TemplateRef,
  ChangeDetectionStrategy,
  inject,
  output,
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
export class ListComponent<T> implements OnChanges, AfterContentInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef)

  readonly templates = contentChildren(ListTemplateComponent)

  @Input()
  idField!: string

  readonly items = input<T[]>([])

  readonly trackBy = input<string>()

  readonly selectable = input(false)

  @Input()
  filter?: string

  readonly filterBy = input<string[]>([])

  @Input()
  selections: T[] = []

  readonly containerClass = input<string>()

  readonly selectionsChange = output<T[]>()

  _selectionStates: Record<string, boolean> = {}
  _noResultTemplate: TemplateRef<any> | null = null
  _emptyStateTemplate: TemplateRef<any> | null = null

  _empty = false

  get hasSelection() {
    return !!this.selections.length
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

  ngOnChanges() {
    this._empty = !this.items()?.length
    setTimeout(() => {
      this.checkSelections()
    }, 300)
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
    const id = (item as any)[this.idField]
    this.selections = this.selections.filter((e) => e !== item)
    this._selectionStates[id] = false
    this.selectionsChange.emit(this.selections)
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
      if (this.items().find((item) => this.equals(item, selection))) {
        return true
      }
      delete this._selectionStates[selection[this.idField]]
      return false
    })
    this.selectionsChange.emit(this.selections)
    this.changeDetectorRef.markForCheck()
  }
}
