import { InjectionToken } from '@angular/core';
import { FileIcon, FILE_THEME } from './icons.files';
import { FolderIcon, FOLDER_THEME } from './icons.folders';

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

export class CodIcon implements Icon {
    readonly type: string = 'codicon';
    constructor(readonly name: string) {}
}

export interface NgeUiIconConfig {
    /** Base url where file icons are store (default to `assets/vendors/nge/icons/files/`) */
    fileIconsBaseUrl: string;
    /** Define extra file icons. (add new icon or override an existing one) */
    extraFileIcons?: FileIcon[];
    /** Define extra folder icons. (add new icon or override an existing one)  */
    extraFolderIcons?: FolderIcon[];
};

export const ICON_TOKEN = new InjectionToken<Icon>('ICON_TOKEN');
export const NGE_UI_ICON_CONFIG = new InjectionToken<NgeUiIconConfig>('NGE_UI_ICON_CONFIG');;
