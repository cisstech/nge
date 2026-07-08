import { ChangeDetectionStrategy, Component, Injector, computed, inject, input } from '@angular/core'
import { ICON_TOKEN, ImgIcon } from '../icons'

@Component({
  selector: 'ui-icon-img',
  templateUrl: './icon-img.component.html',
  styleUrls: ['./icon-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconImgComponent {
  private readonly injector = inject(Injector)

  readonly icon = input<ImgIcon>()

  protected readonly resolvedIcon = computed(() => this.icon() ?? this.injector.get<ImgIcon>(ICON_TOKEN))
}
