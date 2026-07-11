import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { parseFrontmatter } from '../../../frontmatter'
import { NgeDocService } from '../../../nge-doc.service'

/**
 * "Copy as Markdown" and "Open in ChatGPT / Claude" actions for the active page.
 * Copy fetches the page's raw markdown; the AI links carry its absolute `.md`
 * url (only shown when `withSeo({ url })` provides one).
 */
@Component({
  selector: 'nge-doc-page-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (markdownUrl(); as url) {
      <div class="nge-doc-page-actions">
        <button type="button" class="action" (click)="copy(url)">
          {{ copied() ? labels.copied : labels.copyAsMarkdown }}
        </button>
        @if (aiLinks(); as ai) {
          <a class="action" [href]="ai.chatgpt" target="_blank" rel="noopener">{{ labels.openInChatGpt }}</a>
          <a class="action" [href]="ai.claude" target="_blank" rel="noopener">{{ labels.openInClaude }}</a>
        }
      </div>
    }
  `,
  styles: [
    `
      .nge-doc-page-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .action {
        font: inherit;
        font-size: 0.8rem;
        padding: 0.25rem 0.6rem;
        border: 1px solid var(--nge-doc-border);
        border-radius: 0.4rem;
        background: transparent;
        color: var(--nge-doc-fg-muted);
        cursor: pointer;
        transition:
          color 0.12s,
          border-color 0.12s;
      }
      .action:hover {
        color: var(--nge-doc-primary);
        border-color: var(--nge-doc-primary);
      }
    `,
  ],
})
export class PageActionsComponent {
  private readonly docService = inject(NgeDocService)
  private readonly http = inject(HttpClient, { optional: true })

  protected readonly labels = this.docService.labels
  protected readonly markdownUrl = this.docService.markdownUrl
  protected readonly copied = signal(false)

  /** ChatGPT and Claude urls that ask the model to read the page's raw markdown. */
  protected readonly aiLinks = computed(() => {
    const url = this.docService.markdownAbsoluteUrl()
    if (!url) {
      return undefined
    }
    const prompt = encodeURIComponent(`Read ${url} so I can ask you questions about it.`)
    return { chatgpt: `https://chatgpt.com/?q=${prompt}`, claude: `https://claude.ai/new?q=${prompt}` }
  })

  protected async copy(url: string): Promise<void> {
    if (!this.http) {
      return
    }
    try {
      const raw = await firstValueFrom(this.http.get(url, { responseType: 'text' }))
      await navigator.clipboard?.writeText(parseFrontmatter(raw).content)
      this.copied.set(true)
      setTimeout(() => this.copied.set(false), 2000)
    } catch {
      // Clipboard or fetch may be unavailable; leave the label unchanged.
    }
  }
}
