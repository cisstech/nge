import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgeDocRendererModule } from '../../renderer/renderer.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DefaultLayoutComponent } from './default-layout.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    DefaultLayoutComponent,
  ],
  exports: [DefaultLayoutComponent],
  imports: [CommonModule, RouterModule, NgeDocRendererModule],
})
export class DefaultLayoutModule {}
