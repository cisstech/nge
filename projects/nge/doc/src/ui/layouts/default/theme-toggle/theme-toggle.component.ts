import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NgeDocThemeService } from '../../../../core/nge-doc-theme.service'
import { NgeDocService } from '../../../../core/nge-doc.service'

@Component({
  selector: 'nge-doc-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="icon-btn"
      type="button"
      [attr.aria-label]="isDark() ? labels.switchToLight : labels.switchToDark"
      (click)="theme.toggle()"
    >
      @if (isDark()) {
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          />
        </svg>
      } @else {
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      }
    </button>
  `,
})
export class ThemeToggleComponent {
  protected readonly theme = inject(NgeDocThemeService)
  protected readonly isDark = this.theme.isDark
  protected readonly labels = inject(NgeDocService).labels
}
