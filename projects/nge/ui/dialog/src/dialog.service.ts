import { ComponentType } from '@angular/cdk/portal';
import { Injectable, NgZone } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig } from '@angular/material/legacy-snack-bar';
import { Subscription } from 'rxjs';
import { ConfirmOptions } from './confirm/confim';
import { ConfirmComponent } from './confirm/confirm.component';
import { PrompOptions } from './prompt/prompt';
import { PromptComponent } from './prompt/prompt.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private readonly zone: NgZone,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar
  ) {}

  open(options: IMaterialDialogOptions) {
    return this.dialog.open(options.component, options.config);
  }

  promptAsync(options: PrompOptions) {
    const ref: MatDialogRef<PromptComponent, PrompOptions> = this.dialog.open(
      PromptComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        data: options,
      }
    );
    return new Promise<PrompOptions>((resolve) => {
      this.zone.run(() => {
        let subscription: Subscription;
        subscription = ref.afterClosed().subscribe((value) => {
          subscription.unsubscribe();
          resolve(value as PrompOptions);
        });
      });
    });
  }

  confirmAsync(options: ConfirmOptions) {
    const ref: MatDialogRef<ConfirmComponent, any> = this.dialog.open(
      ConfirmComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        data: options,
        autoFocus: false,
        minWidth: '400px',
        minHeight: '100px',
      }
    );
    return new Promise<any>((resolve) => {
      this.zone.run(() => {
        let subscription: Subscription;
        subscription = ref.afterClosed().subscribe((value) => {
          subscription.unsubscribe();
          resolve(value);
        });
      });
    });
  }

  snack(message: string, config?: MatSnackBarConfig) {
    this.zone.run(() => {
      this.snackbar.open(message, '', {
        duration: 3000,
        ...(config || {}),
      });
    });
  }
}

export interface IMaterialDialogOptions {
  component: ComponentType<any>;
  config?: MatDialogConfig<any>;
}
