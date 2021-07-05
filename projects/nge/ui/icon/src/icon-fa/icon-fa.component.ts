import { Component, Injector, Input, OnInit } from '@angular/core';
import { FaIcon, ICON_TOKEN } from '../icons';

@Component({
    selector: 'ui-icon-fa',
    templateUrl: './icon-fa.component.html',
    styleUrls: ['./icon-fa.component.scss'],
})
export class IconFaComponent implements OnInit {
    @Input() icon!: FaIcon;

    constructor(private readonly injector: Injector) {}

    ngOnInit() {
        this.icon = this.icon || this.injector.get<FaIcon>(ICON_TOKEN);
    }
}
