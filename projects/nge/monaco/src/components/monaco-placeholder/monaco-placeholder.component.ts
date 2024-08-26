import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'nge-monaco-placeholder',
  templateUrl: './monaco-placeholder.component.html',
  styleUrls: ['./monaco-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgeMonacoPlaceholderComponent {}
