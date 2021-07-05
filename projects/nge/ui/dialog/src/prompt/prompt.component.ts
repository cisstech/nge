import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrompOptions } from './prompt';

@Component({
    selector: 'ui-dialog-prompt',
    templateUrl: './prompt.component.html',
    styleUrls: ['./prompt.component.scss']
  })
export class PromptComponent {
    constructor(
        readonly dialog: MatDialogRef<PromptComponent>,
        @Inject(MAT_DIALOG_DATA)
        readonly data: PrompOptions
    ) {
        data.okTitle = data.okTitle || 'OK';
        data.noTitle = data.noTitle || 'CANCEL';
    }
}
