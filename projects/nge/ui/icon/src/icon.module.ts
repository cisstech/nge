import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconGrPipeModule } from '@cisstech/nge/pipes';

import { IconPipe } from './pipes/icon.pipe';
import { IconFilePipe } from './pipes/icon-file.pipe';

import { IconComponent } from './icon.component';
import { IconFaComponent } from './icon-fa/icon-fa.component';
import { IconImgComponent } from './icon-img/icon-img.component';
import { IconCodIconComponent } from './icon-codicon/icon-codicon.component';
import { IconIcongrComponent } from './icon-icongr/icon-icongr.component';
import { IconFaPipe } from './pipes/icon-fa.pipe';
import { IconIcongrPipe } from './pipes/icon-icongr.pipe';
import { IconCodiconPipe } from './pipes/icon-codicon.pipe';

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
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, PortalModule, IconGrPipeModule],
  exports: [...DECLARATIONS],
})
export class NgeUiIconModule {}
