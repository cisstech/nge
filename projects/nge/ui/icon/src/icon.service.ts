import { Inject, Injectable, Optional } from '@angular/core'
import { FileIconOptions, ImgIcon, NgeUiIconConfig, NGE_UI_ICON_CONFIG } from './icons'
import { FILE_THEME } from './icons.files'
import { FOLDER_THEME } from './icons.folders'

@Injectable({ providedIn: 'root' })
export class NgeIconService {
  constructor(
    @Optional()
    @Inject(NGE_UI_ICON_CONFIG)
    private readonly config?: NgeUiIconConfig
  ) {}

  fromFileName(fileName: string, options: FileIconOptions): ImgIcon {
    const { defaultIcon } = FILE_THEME
    const baseUrl = this.config?.fileIconsBaseUrl || 'assets/vendors/nge/ui/icon/icons/files/'

    let iconName = ''
    if (fileName) {
      if (options.isDirectory) {
        iconName = this.findFolderIcon(iconName, options, fileName)
      } else {
        iconName = this.findFileIcon(fileName, iconName)
      }
      return new ImgIcon(baseUrl + iconName, options)
    }

    return new ImgIcon(baseUrl + defaultIcon.name + '.svg', options)
  }

  private findFileIcon(fileName: string, iconName: string) {
    const extension = this.extname(fileName)
    const file =
      this.config?.extraFileIcons?.find((item) => {
        return (item.fileExtensions || []).includes(extension)
      }) ||
      FILE_THEME.icons.find((item) => {
        return (item.fileExtensions || []).includes(extension)
      }) ||
      FILE_THEME.defaultIcon

    iconName = file.name + '.svg'
    return iconName
  }

  private findFolderIcon(iconName: string, options: FileIconOptions, fileName: string) {
    iconName = FOLDER_THEME.defaultIcon.name
    if (options.isRoot) {
      iconName = FOLDER_THEME.rootFolder?.name || iconName
    } else {
      const icon =
        this.config?.extraFolderIcons?.find((item) => {
          return item.folderNames.includes(fileName.toLowerCase())
        }) ||
        FOLDER_THEME.icons?.find((item) => {
          return item.folderNames.includes(fileName.toLowerCase())
        })
      iconName = icon?.name || iconName
    }

    if (options.expanded) {
      iconName += '-open'
    }

    iconName += '.svg'
    return iconName
  }

  private basename(path: string) {
    path = path.replace(/\\/g, '/')
    return path.slice(path.lastIndexOf('/') + 1, path.length)
  }

  private extname(path: string) {
    const base = this.basename(path)
    if (!base) {
      return base
    }
    if (base.startsWith('.')) {
      return ''
    }
    const dotIndex = base.lastIndexOf('.')
    if (dotIndex === -1) {
      return ''
    }
    return base.substring(dotIndex + 1).toLowerCase()
  }
}
