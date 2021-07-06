import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'icongr'
})
export class IconGrPipe implements PipeTransform {
    transform(value: any): any {
        const pattern = /(\w+)\s+([\w-]+)((\s+(?:color|size)=[^\s]+)*)?/gm;
        return value.replace(pattern, (_: string, type: string,  name: string, params?: string) => {
            params = (params ?? '')
                .trim()
                .split(' ')
                .filter(e => e.trim())
                .join('&');
            params = params ? '?' + params : '';
            return `https://icongr.am/${type.trim()}/${name.trim()}.svg${params}`;
        });
    }
}

@NgModule({
    declarations: [IconGrPipe],
    exports: [IconGrPipe]
})
export class IconGrPipeModule {}
