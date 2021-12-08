import { InjectionToken } from '@angular/core';
import { FileIcon } from './icons.files';
import { FolderIcon } from './icons.folders';

declare type IconTypes = 'codicon' | 'fa' | 'img' | 'icongr';


export interface NgeUiIconConfig {
    /** Base url where file icons are store (default to `assets/vendors/nge/icons/files/`) */
    fileIconsBaseUrl: string;
    /** Define extra file icons. (add new icon or override an existing one) */
    extraFileIcons?: FileIcon[];
    /** Define extra folder icons. (add new icon or override an existing one)  */
    extraFolderIcons?: FolderIcon[];
}

export interface Icon {
    type: IconTypes;
}

export interface ImgIconOptions {
    alt?: string;
}

export interface IcongrOptions {
    alt?: string;
}

export interface FileIconOptions {
    alt?: string;
    isRoot?: boolean;
    expanded?: boolean;
    isDirectory?: boolean;
}

export class FaIcon implements Icon {
    readonly type = 'fa';
    constructor(readonly name: string) { }
}

export class CodIcon implements Icon {
    readonly type = 'codicon';
    constructor(readonly name: string) { }
}

export class ImgIcon implements Icon {
    readonly type = 'img';
    constructor(readonly src: string, readonly options?: ImgIconOptions) {
        this.options = options || {};
        this.options.alt = this.options.alt || '';
    }
}

/**
 * https://icongr.am
 */
export class IcongrIcon implements Icon {
    readonly type = 'icongr';
    /**
     * Creates new IcongrIcon
     * @param name type name size=48&color=FF0000
     * @param options extra options
     */
    constructor(readonly name: string, readonly options?: IcongrOptions) {}
}

export const ICON_TOKEN = new InjectionToken<Icon>('ICON_TOKEN');
export const NGE_UI_ICON_CONFIG = new InjectionToken<NgeUiIconConfig>('NGE_UI_ICON_CONFIG');;
