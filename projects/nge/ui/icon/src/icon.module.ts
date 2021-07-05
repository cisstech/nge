import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatBadgeModule } from '@angular/material/badge';

import { IconPipe } from './icon.pipe';
import { FileIconPipe } from './file-icon.pipe';

import { IconComponent } from './icon.component';
import { IconFaComponent } from './icon-fa/icon-fa.component';
import { IconFileComponent } from './icon-file/icon-file.component';
import { IconImgComponent } from './icon-img/icon-icon.component';
import { IconCodIconComponent } from './icon-codicon/icon-codicon.component';

const DECLARATIONS = [
    IconComponent,
    IconFaComponent,
    IconImgComponent,
    IconFileComponent,
    IconCodIconComponent,

    IconPipe,
    FileIconPipe,
];

@NgModule({
  declarations: [
    ...DECLARATIONS,
  ],
  imports: [
      MatBadgeModule,
      CommonModule,
      PortalModule,
  ],
  exports: [
    ...DECLARATIONS,
  ],
})
export class NgeUiIconModule { }
