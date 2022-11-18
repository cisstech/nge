import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgeMonacoColorizerService } from '../../services/monaco-colorizer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nge-monaco-viewer',
  templateUrl: 'monaco-viewer.component.html',
  styleUrls: ['monaco-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgeMonacoViewerComponent implements OnChanges, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ViewChild('transclusion', { static: true })
  transclusion!: ElementRef<HTMLElement>;

  /** code to highlight */
  @Input() code?: string;
  /** show line numbers? */
  @Input() lines?: string | number;
  /** target language */
  @Input() language?: string;
  /** space separated list of line numbers to highlight */
  @Input() highlights?: string | number;

  private editor?: monaco.editor.IEditor;
  private observer?: MutationObserver;
  private subscriptions: Subscription[] = [];

  constructor(private readonly colorizer: NgeMonacoColorizerService) {}

  ngOnChanges(): void {
    const code =
      this.transclusion.nativeElement.textContent?.trim() || this.code || '';
    this.colorize(code);
  }

  ngOnDestroy() {
    this.editor?.dispose();
    this.observer?.disconnect();
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private async colorize(code: string) {
    await this.colorizer.colorizeElement({
      code: code || '',
      element: this.container.nativeElement,
      lines: this.lines,
      language: this.language,
      highlights: this.highlights,
    });
  }
}
