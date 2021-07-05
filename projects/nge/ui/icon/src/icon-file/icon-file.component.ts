import { Component, Injector, Input, OnInit } from '@angular/core';
import { FileIcon, ICON_TOKEN } from '../icons';

@Component({
    selector: 'ui-icon-file',
    templateUrl: './icon-file.component.html',
    styleUrls: ['./icon-file.component.scss'],
})
export class IconFileComponent implements OnInit {
    @Input() icon!: FileIcon;

    constructor(private readonly injector: Injector) {}

    ngOnInit() {
        this.icon = this.icon || this.injector.get<FileIcon>(ICON_TOKEN);
    }
}
