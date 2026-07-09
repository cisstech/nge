import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgeDocService } from '../../../nge-doc.service'

@Component({
  selector: 'nge-doc-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @if (trail().length) {
      <nav class="breadcrumb" [attr.aria-label]="labels.breadcrumb">
        <span class="root">{{ meta().name }}</span>
        @for (link of trail(); track link.href; let last = $last) {
          <span class="sep" aria-hidden="true">/</span>
          @if (last) {
            <span class="current" aria-current="page">{{ link.title }}</span>
          } @else {
            <a [routerLink]="link.href">{{ link.title }}</a>
          }
        }
      </nav>
    }
  `,
  styles: [
    `
      .breadcrumb {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.4rem;
        font-size: 0.8rem;
        color: var(--nge-doc-fg-muted);
        margin-bottom: 1.1rem;
      }
      .sep {
        color: var(--nge-doc-border-strong);
      }
      .current {
        color: var(--nge-doc-fg);
        font-weight: 600;
      }
      a {
        color: inherit;
        text-decoration: none;
        transition: color 0.12s;
      }
      a:hover {
        color: var(--nge-doc-primary);
      }
    `,
  ],
})
export class BreadcrumbComponent {
  private readonly docService = inject(NgeDocService)
  protected readonly trail = this.docService.breadcrumb
  protected readonly meta = this.docService.meta
  protected readonly labels = this.docService.labels
}
