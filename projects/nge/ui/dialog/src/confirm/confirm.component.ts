import { Component, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ConfirmOptions } from './confim';

@Component({
  selector: 'ui-dialog-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    readonly dialog: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA)
    readonly data: ConfirmOptions,
    private readonly changes: ChangeDetectorRef
  ) {
    data.okTitle = data.okTitle || 'OK';
    data.noTitle = data.noTitle || 'CANCEL';
  }

  ngOnInit(): void {
    this.changes.detectChanges();
  }
}
