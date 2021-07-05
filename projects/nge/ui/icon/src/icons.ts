import { FOLDER_THEMES } from './icons.folders';
import { FILE_THEME } from './icons.files';
import { InjectionToken } from '@angular/core';

export interface Icon {
    type: string;
}

export class FaIcon implements Icon {
    readonly type: string = 'fa';

    constructor(readonly name: string) {}
}

export interface ImgIconOptions {
    alt?: string;
}

export class ImgIcon implements Icon {
    readonly type: string = 'img';

    constructor(readonly src: string, readonly options?: ImgIconOptions) {
        this.options = options || {};
        this.options.alt = this.options.alt || '';
    }
}

export interface FileIconOptions {
    alt?: string;
    isRoot?: boolean;
    expanded?: boolean;
    isDirectory?: boolean;
}

export class FileIcon implements Icon {
    readonly type: string = 'file';

    private constructor(
        readonly src: string,
        readonly options?: FileIconOptions
    ) {
        this.options = options || {};
        this.options.alt = this.options.alt || '';
    }

    static fromFileName(fileName: string, options: FileIconOptions): FileIcon {
        const { defaultIcon, baseUrl } = FILE_THEME;
        let iconName = '';
        if (fileName) {
            if (options.isDirectory) {
                const theme = FOLDER_THEMES[0];
                iconName = theme.defaultIcon.name;
                if (options.isRoot) {
                    iconName = theme.rootFolder?.name || '';
                } else {
                    const icon = theme.icons?.find((item) =>
                        item.folderNames.includes(fileName.toLowerCase())
                    );
                    if (icon) {
                        iconName = icon.name;
                    }
                }
                if (options.expanded) {
                    iconName += '-open';
                }
                iconName += '.svg';
            } else {
                const extension = FileIcon.extname(fileName);
                const file =
                    FILE_THEME.icons.find((item) => {
                        return (item.fileExtensions || []).includes(extension);
                    }) || FILE_THEME.defaultIcon;
                iconName = file.name + '.svg';
            }
            return new FileIcon(baseUrl + iconName, options);
        }

        return new FileIcon(baseUrl + defaultIcon.name, options);
    }

    private static basename(path: string) {
        path = path.replace(/\\/g, '/');
        return path.slice(path.lastIndexOf('/') + 1, path.length);
    }

    private static extname(path: string) {
        const base = FileIcon.basename(path);
        if (!base) {
            return base;
        }
        if (base.startsWith('.')) {
            return '';
        }
        const dotIndex = base.lastIndexOf('.');
        if (dotIndex === -1) {
            return '';
        }
        return base.substring(dotIndex + 1).toLowerCase();
    }
}

export class CodIcon implements Icon {
    readonly type: string = 'codicon';

    constructor(readonly name: string) {}
}

export const ICON_TOKEN = new InjectionToken<Icon>('ICON_TOKEN');
