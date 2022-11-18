import { Injectable } from '@angular/core';
import { NgeMonacoLoaderService } from './monaco-loader.service';
import { NgeMonacoThemeService } from './monaco-theme.service';

@Injectable({ providedIn: 'root' })
export class NgeMonacoColorizerService {
  constructor(
    private readonly loader: NgeMonacoLoaderService,
    private readonly theming: NgeMonacoThemeService
  ) {}

  async colorizeElement(options: NgeMonacoColorizeOptions) {
    const { element } = options;

    element.innerHTML = this.escapeHtml(options.code || '');
    element.style.padding = '4px';
    element.style.display = 'block';

    const pre = element.parentElement;
    if (pre?.tagName === 'PRE') {
      if (!pre.classList.contains('monaco-editor')) {
        pre.classList.add('monaco-editor');
      }
      if (!pre.classList.contains('monaco-editor-background')) {
        pre.classList.add('monaco-editor-background');
      }
    }
    element.className = '';

    await this.loader.loadAsync();

    const languages = monaco.languages.getLanguages();
    const language = languages.find((e) => {
      return (
        e.id === options.language ||
        e.aliases?.find((a) => a === options.language)
      );
    })?.id;

    await monaco.editor.colorizeElement(element, {
      mimeType: language || 'plaintext',
      theme: this.theming.theme?.themeName || 'vs',
    });

    this.highlightLines(options);
    this.showLineNumbers(options);
  }

  private escapeHtml(input: string) {
    const map: any = {
      '<': '&lt;',
      '>': '&gt;',
    };
    return input.replace(/[<>]/g, (tag) => map[tag] || tag);
  }

  private highlightLines(options: NgeMonacoColorizeOptions) {
    if (!options.highlights) {
      return;
    }

    const { element } = options;

    const linesToHighlight = this.lineNumbersFromString(
      options.highlights.toString()
    );

    let newLine = true;
    let lineNumber = 1;
    element.childNodes.forEach((e) => {
      const node = e as HTMLElement;
      if (newLine) {
        const div = document.createElement('div');
        div.style.height = '18px';
        if (linesToHighlight.includes(lineNumber)) {
          div.classList.add('rangeHighlight');
          div.classList.add('selected-text');
        }
        element.insertBefore(div, node);
        element.removeChild(node);
        div.appendChild(node);
        newLine = false;
      } else if (node.tagName === 'BR') {
        lineNumber++;
        newLine = true;
      }
    });
    Array.from(element.getElementsByTagName('br')).forEach((node) =>
      node.remove()
    );
  }

  private showLineNumbers(options: NgeMonacoColorizeOptions) {
    if (!options.lines) {
      return;
    }

    const { element } = options;
    const lines = this.lineNumbersFromString(options.lines.toString());
    const length = (options.code || '').split('\n').length;
    if (lines.length === 1) {
      for (let i = lines[0] + 1; i <= length; i++) {
        lines.push(i);
      }
    }

    const side = ['<div style="padding:0  12px; text-align: right;">'];
    for (let i = 0; i < length; i++) {
      let num = '';
      if (lines.includes(i + 1)) {
        num = '' + (i + 1);
      }
      side.push(`<div class="line-numbers" style="height: 18px">${num}</div>`);
    }
    side.push('</div>');

    element.style.display = 'flex';
    element.innerHTML = `
            ${side.join('')}
            <div style="flex: 1;">${element.innerHTML}</div>
        `;
  }

  private lineNumbersFromString(input: string): number[] {
    const tokens = (input || '').trim().split(' ');
    const lines: number[] = [];
    for (const token of tokens) {
      if (token.includes('-')) {
        const range = token.split('-');
        const start = Number.parseInt(range[0], 10);
        const end = Number.parseInt(range[1], 10);
        if (start && end) {
          for (let i = start; i <= end; i++) {
            if (!lines.includes(i)) {
              lines.push(i);
            }
          }
        }
      } else {
        const n = Number.parseInt(token, 10);
        if (n) {
          lines.push(n);
        }
      }
    }
    return lines;
  }
}

export interface NgeMonacoColorizeOptions {
  /** Element to colorize (&lt;code&gt; element). */
  element: HTMLElement;

  /** Code to highlight */
  code: string;

  /** Target language (default plaintext). */
  language?: string;

  /**
   * Start line number or a space separated list of line numbers to show.
   *
   * Example:
   *
   * *Show all line numbers starting 1*
   *
   * `"1"`
   *
   * *Show all line numbers from 1 to 4*
   *
   * `"1-4"`
   *
   * *Show lines 2 4 5 6 7 9*
   *
   * `"2 4-7 9"`
   */
  lines?: string | number;

  /**
   * A space separated list of line numbers to highlight.
   *
   * Example:
   *
   * *Highlight line 1*
   *
   * `"1"`
   *
   * *Highlight all lines from 1 to 4*
   *
   * `"1-4"`
   *
   * *Highlight lines 2 4 5 6 7 9*
   *
   * `"2 4-7 9"`
   */
  highlights?: string | number;
}
