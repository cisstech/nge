import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { lastValueFrom } from 'rxjs'
import { NgeMarkdownComponent } from '../../../../../nge/markdown/src/nge-markdown.component'

interface CheatEntry {
  loaded: boolean
  markdown: string
}

@Component({
  selector: 'app-markdown-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrls: ['./cheat-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgeMarkdownComponent],
})
export class CheatSheetComponent implements OnInit {
  private readonly http = inject(HttpClient)

  readonly titles = [
    'Headers',
    'Emphasis',
    'Lists',
    'Task List',
    'Links',
    'Images',
    'Code',
    'Tables',
    'Blockquotes',
    'Horizontal Rule',
    'Admonitions',
    'Emoji',
    'Icons',
    'Latex',
    'TabbedSet',
  ]

  // A signal so async loads and edits reflect reliably (works with OnPush and
  // whatever change detection the host app uses).
  protected readonly contents = signal<Record<string, CheatEntry>>({})

  ngOnInit(): void {
    const initial: Record<string, CheatEntry> = {}
    this.titles.forEach((title) => (initial[title] = { loaded: false, markdown: '' }))
    this.contents.set(initial)
  }

  onToggle(title: string, event: Event): void {
    if ((event.target as HTMLDetailsElement).open) {
      this.load(title)
    }
  }

  onEdit(title: string, markdown: string): void {
    this.patch(title, { markdown })
  }

  private load(title: string): void {
    if (this.contents()[title]?.loaded) {
      return
    }
    this.patch(title, { loaded: true })

    const url = 'assets/docs/nge-markdown/cheatsheet/' + title.toLowerCase().replace(' ', '-') + '.md'
    lastValueFrom(this.http.get(url, { responseType: 'text' })).then((markdown) => this.patch(title, { markdown }))
  }

  private patch(title: string, changes: Partial<CheatEntry>): void {
    this.contents.update((contents) => ({ ...contents, [title]: { ...contents[title], ...changes } }))
  }
}
