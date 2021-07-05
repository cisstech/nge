import { Component, Injector, Input, OnInit } from '@angular/core';
import { CodIcon, ICON_TOKEN } from '../icons';

@Component({
    selector: 'ui-icon-codicon',
    templateUrl: './icon-codicon.component.html',
    styleUrls: ['./icon-codicon.component.scss'],
})
export class IconCodIconComponent implements OnInit {
    @Input() icon!: CodIcon;

    constructor(private readonly injector: Injector) {}

    ngOnInit() {
        this.icon = this.icon || this.injector.get<CodIcon>(ICON_TOKEN);
    }
}
