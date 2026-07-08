import { ChangeDetectionStrategy, Component, Injector, computed, inject, input } from '@angular/core'
import { CodIcon, ICON_TOKEN } from '../icons'

@Component({
  selector: 'ui-icon-codicon',
  templateUrl: './icon-codicon.component.html',
  styleUrls: ['./icon-codicon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCodIconComponent {
  private readonly injector = inject(Injector)

  readonly icon = input<CodIcon>()

  protected readonly resolvedIcon = computed(() => this.icon() ?? this.injector.get<CodIcon>(ICON_TOKEN))
}
