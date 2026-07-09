import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ListComponent, ListTemplateComponent } from '@cisstech/nge/ui/list'

/** Live sample of `ui-list`, embedded in the List page with `<ui-list-demo>`. */
@Component({
  selector: 'ui-list-demo',
  imports: [FormsModule, ListComponent, ListTemplateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-demo">
      <input
        class="ui-demo-search"
        [ngModel]="query()"
        (ngModelChange)="query.set($event)"
        placeholder="Filter fruits"
        aria-label="Filter fruits"
      />
      <ui-list class="ui-demo-list" [idField]="'id'" [items]="fruits" [filter]="query()" [filterBy]="['name']">
        <ui-list-template slot="row">
          <ng-template let-item="item">
            <div class="ui-demo-row">{{ item.name }}</div>
          </ng-template>
        </ui-list-template>
      </ui-list>
    </div>
  `,
  styles: [
    `
      .ui-demo {
        padding: 1rem 1.2rem;
        border: 1px solid var(--nge-doc-border, #e4e4e7);
        border-radius: var(--nge-doc-r-lg, 12px);
        background: var(--nge-doc-bg-subtle, #fafafa);
      }
      .ui-demo-search {
        width: 100%;
        padding: 0.45rem 0.7rem;
        margin-bottom: 0.7rem;
        border: 1px solid var(--nge-doc-border-strong, #d4d4d8);
        border-radius: 8px;
        background: var(--nge-doc-surface, #fff);
        color: inherit;
      }
      .ui-demo-list {
        display: block;
        max-height: 210px;
        overflow-y: auto;
      }
      .ui-demo-row {
        padding: 0.4rem 0.6rem;
        border-radius: 6px;
        font-size: 0.9rem;
      }
      .ui-demo-row:hover {
        background: var(--nge-doc-surface-hover, #f4f4f5);
      }
    `,
  ],
})
export class UiListDemoComponent {
  readonly query = signal('')
  readonly fruits = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Apricot' },
    { id: 3, name: 'Banana' },
    { id: 4, name: 'Blackberry' },
    { id: 5, name: 'Blueberry' },
    { id: 6, name: 'Cherry' },
    { id: 7, name: 'Clementine' },
    { id: 8, name: 'Date' },
    { id: 9, name: 'Fig' },
    { id: 10, name: 'Grape' },
    { id: 11, name: 'Kiwi' },
    { id: 12, name: 'Lemon' },
  ]
}
