import { ChangeDetectionStrategy, Component } from '@angular/core'
import { IconComponent, IcongrIcon, ImgIcon } from '@cisstech/nge/ui/icon'

/** Live sample of `ui-icon`, embedded in the Icon page with `<ui-icon-demo>`. */
@Component({
  selector: 'ui-icon-demo',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-demo ui-demo-icons">
      @for (icon of icons; track $index) {
        <ui-icon [icon]="icon" />
      }
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
      .ui-demo-icons {
        display: flex;
        gap: 1.4rem;
        align-items: center;
        font-size: 1.7rem;
      }
    `,
  ],
})
export class UiIconDemoComponent {
  readonly icons = [
    new IcongrIcon('material rocket'),
    new IcongrIcon('octicons mark-github'),
    new IcongrIcon('feather heart'),
    new ImgIcon('assets/images/nge.svg'),
  ]
}
