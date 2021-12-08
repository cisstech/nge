import { ComponentPortal } from '@angular/cdk/portal';
import { Pipe, PipeTransform, Injector } from '@angular/core';

import { IconFaComponent } from './icon-fa/icon-fa.component';
import { IconImgComponent } from './icon-img/icon-img.component';
import { IconCodIconComponent } from './icon-codicon/icon-codicon.component';

import { Icon, ICON_TOKEN } from './icons';

@Pipe({
    name: 'icon'
})
export class IconPipe implements PipeTransform {
    constructor(private readonly injector: Injector) {}
    transform(icon?: Icon): ComponentPortal<any> {
        switch (icon?.type) {
            case 'codicon':
                return new ComponentPortal(IconCodIconComponent, null, this.createInjector(icon));
            case 'fa':
                return new ComponentPortal(IconFaComponent, null, this.createInjector(icon));
            case 'img':
                return new ComponentPortal(IconImgComponent, null, this.createInjector(icon));
            default:
                throw new TypeError('unknown icon type "' + icon?.type + '"');
        }
    }

    createInjector(icon: Icon): Injector {
        return Injector.create({
            providers: [
                { provide: ICON_TOKEN, useValue: icon }
            ],
            parent: this.injector,
        });
    }
}
