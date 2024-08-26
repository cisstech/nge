export function isImage(extension: string): boolean {
  extension = extension.toLowerCase()
  if (!extension.startsWith('.')) {
    extension = '.' + extension
  }
  return ['.ai', '.png', '.jpg', '.pjg', '.gif', '.svg', '.jpeg'].includes(extension)
}

export function isPdf(extension: string): boolean {
  extension = extension.toLowerCase()
  if (!extension.startsWith('.')) {
    extension = '.' + extension
  }
  return extension === '.pdf'
}

export function isWordDoc(extension: string): boolean {
  extension = extension.toLowerCase()
  if (!extension.startsWith('.')) {
    extension = '.' + extension
  }
  return ['.odt', '.doc', '.docx'].includes(extension)
}

export function isText(extension: string): boolean {
  extension = extension.toLowerCase()
  return extension === 'txt' || extension === '.txt'
}

export function isExcelDoc(extension: string): boolean {
  extension = extension.toLowerCase()
  if (!extension.startsWith('.')) {
    extension = '.' + extension
  }
  return ['.xlsx', '.xlsm', '.xsl', '.xst'].includes(extension)
}

export function isPowerPointDoc(extension: string): boolean {
  extension = extension.toLowerCase()
  if (!extension.startsWith('.')) {
    extension = '.' + extension
  }
  return ['.ppt', '.pptm', '.pptx'].includes(extension)
}

/**
 * Gets the extension of the file (without the dot '.').
 * Throws an exception if the file is undefined.
 * @param file the file
 * @returns the extension of the file.
 */
export function extensionOf(file: File | Blob): string {
  if (file instanceof File) {
    const tmp1 = Math.max(0, file.name.lastIndexOf('.'))
    return file.name.slice((tmp1 || Infinity) + 1).toLowerCase()
  }
  const tmp2 = Math.max(0, file.type.lastIndexOf('/'))
  return file.type.slice((tmp2 || Infinity) + 1).toLowerCase()
}
