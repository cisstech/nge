import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgeMarkdownComponent } from '../../../../nge/markdown/src/nge-markdown.component'

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgeMarkdownComponent],
})
export class HomeComponent {}
