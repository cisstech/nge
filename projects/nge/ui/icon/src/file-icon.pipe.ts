import { Pipe, PipeTransform } from '@angular/core';
import { FileIcon, FileIconOptions } from './icons';

@Pipe({name: 'fileIcon'})
export class FileIconPipe implements PipeTransform {

    transform(fileName: string, options?: FileIconOptions): FileIcon {
        options = options || {
            alt: fileName,
            isRoot: false,
            isDirectory: false,
        };
        return FileIcon.fromFileName(fileName, options);
    }

}
