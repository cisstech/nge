import { ChangeDetectionStrategy, Component, Injector, computed, inject, input } from '@angular/core'
import { FaIcon, ICON_TOKEN } from '../icons'

@Component({
  selector: 'ui-icon-fa',
  templateUrl: './icon-fa.component.html',
  styleUrls: ['./icon-fa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFaComponent {
  private readonly injector = inject(Injector)

  readonly icon = input<FaIcon>()

  protected readonly resolvedIcon = computed(() => this.icon() ?? this.injector.get<FaIcon>(ICON_TOKEN))
}
