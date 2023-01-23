import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';

import { NgeMarkdownModule } from '@cisstech/nge/markdown';

import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';

@NgModule({
  declarations: [ConfirmComponent, PromptComponent],
  imports: [
    CommonModule,
    OverlayModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    NgeMarkdownModule,
    MatFormFieldModule,
    FormsModule,
  ],
  exports: [ConfirmComponent, PromptComponent, OverlayModule, MatDialogModule],
})
export class NgeUiDialogModule {}
