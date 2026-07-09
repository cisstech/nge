import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core'

/**
 * A tiny interactive component used to demonstrate embedding a live component in Markdown
 * with the `<demo-counter>` keyword. The visible count proves it is a running Angular component,
 * not static HTML, and the `label` attribute shows how tag attributes map to inputs.
 */
@Component({
  selector: 'demo-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-counter">
      <button type="button" (click)="count.set(count() - 1)" aria-label="Decrement">-</button>
      <strong>{{ count() }}</strong>
      <button type="button" (click)="count.set(count() + 1)" aria-label="Increment">+</button>
      <span>{{ label() }} (a live component rendered from Markdown)</span>
    </div>
  `,
  styles: [
    `
      .demo-counter {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.8rem 1rem;
        border: 1px solid var(--nge-doc-border, #e4e4e7);
        border-radius: var(--nge-doc-r-lg, 12px);
        background: var(--nge-doc-bg-subtle, #fafafa);
        font-size: 0.9rem;
      }
      button {
        width: 1.9rem;
        height: 1.9rem;
        border: 1px solid var(--nge-doc-border-strong, #d4d4d8);
        border-radius: 8px;
        background: var(--nge-doc-surface, #fff);
        color: inherit;
        font-size: 1.1rem;
        line-height: 1;
        cursor: pointer;
      }
      button:hover {
        border-color: var(--nge-doc-primary, #5b53d6);
        color: var(--nge-doc-primary, #5b53d6);
      }
      strong {
        min-width: 1.5rem;
        text-align: center;
        font-variant-numeric: tabular-nums;
        color: var(--nge-doc-primary, #5b53d6);
      }
      span {
        color: var(--nge-doc-fg-muted, #52525b);
      }
    `,
  ],
})
export class EmbedDemoComponent {
  /** Optional label, shown to demonstrate attribute-to-input mapping. */
  readonly label = input('Counter')
  protected readonly count = signal(0)
}
