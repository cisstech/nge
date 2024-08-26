import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { lastValueFrom } from 'rxjs'

@Component({
  selector: 'app-markdown-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrls: ['./cheat-sheet.component.scss'],
})
export class CheatSheetComponent implements OnInit {
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
    'Admonitions',
    'TabbedSet',
  ]

  readonly contents: Record<
    string,
    {
      expanded: boolean
      markdown: string
    }
  > = {}

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.titles.forEach((e) => {
      this.contents[e] = {
        expanded: false,
        markdown: '',
      }
    })
  }

  load(title: string) {
    const record = this.contents[title]
    if (record.expanded) {
      return
    }
    record.expanded = true

    const url = 'assets/docs/nge-markdown/cheatsheet/' + title.toLowerCase().replace(' ', '-') + '.md'

    lastValueFrom(this.http.get(url, { responseType: 'text' })).then((markdown) => {
      record.markdown = markdown
    })
  }

  trackBy(index: number) {
    return index
  }
}
