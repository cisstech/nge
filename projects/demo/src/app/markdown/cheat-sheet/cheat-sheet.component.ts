import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelContent,
} from '@angular/material/expansion'
import { MatFormField, MatInput } from '@angular/material/input'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { FormsModule } from '@angular/forms'
import { NgeMarkdownComponent } from '../../../../../nge/markdown/src/nge-markdown.component'

@Component({
  selector: 'app-markdown-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrls: ['./cheat-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelContent,
    MatFormField,
    CdkTextareaAutosize,
    MatInput,
    FormsModule,
    NgeMarkdownComponent,
  ],
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
}
