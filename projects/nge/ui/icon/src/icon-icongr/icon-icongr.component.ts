import { ChangeDetectionStrategy, Component, Injector, computed, inject, input } from '@angular/core'
import { IcongrIcon, ICON_TOKEN } from '../icons'
import { IconGrPipe } from '@cisstech/nge/pipes'

@Component({
  selector: 'ui-icon-icongr',
  templateUrl: './icon-icongr.component.html',
  styleUrls: ['./icon-icongr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconGrPipe],
})
export class IconIcongrComponent {
  private readonly injector = inject(Injector)

  readonly icon = input<IcongrIcon>()

  protected readonly resolvedIcon = computed(() => this.icon() ?? this.injector.get<IcongrIcon>(ICON_TOKEN))
}
