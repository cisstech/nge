import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { IconFilePipe } from './pipes/icon-file.pipe'
import { IconPipe } from './pipes/icon.pipe'

import { IconGrPipe } from '@cisstech/nge/pipes'
import { IconCodIconComponent } from './icon-codicon/icon-codicon.component'
import { IconFaComponent } from './icon-fa/icon-fa.component'
import { IconIcongrComponent } from './icon-icongr/icon-icongr.component'
import { IconImgComponent } from './icon-img/icon-img.component'
import { IconComponent } from './icon.component'
import { IconCodiconPipe } from './pipes/icon-codicon.pipe'
import { IconFaPipe } from './pipes/icon-fa.pipe'
import { IconIcongrPipe } from './pipes/icon-icongr.pipe'

const DECLARATIONS = [
  IconComponent,
  IconFaComponent,
  IconImgComponent,
  IconIcongrComponent,
  IconCodIconComponent,

  IconPipe,
  IconFaPipe,
  IconFilePipe,
  IconIcongrPipe,
  IconCodiconPipe,
]

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, PortalModule, IconGrPipe],
  exports: [...DECLARATIONS],
})
export class NgeUiIconModule {}
