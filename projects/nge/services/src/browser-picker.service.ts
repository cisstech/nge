import { Injectable } from '@angular/core'

/** Service to programmatically open file dialog. */
@Injectable({ providedIn: 'root' })
export class PickerBrowserService {
  /**
   * Open file dialog to select files.
   * @param options picker options.
   * @returns A promise that resolves with the picked files or and empty array.
   */
  pickFiles(options: PickerBrowserOptions): Promise<File[]> {
    return new Promise<File[]>(async (resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = options.multiple ?? true
      input.accept = options.accept ?? '*'
      input.style.visibility = 'hidden'
      input.onchange = (event: any) => {
        const target = event.target || event.srcElement
        if (target.value.length > 0) {
          input.remove()
          resolve(target.files)
        } else {
          input.remove()
          resolve([])
        }
      }
      // handle cancel button click.
      setTimeout(() => {
        let onfocus: any
        onfocus = () => {
          if (!input.value.length) {
            resolve([])
            input.remove()
          }
          window.removeEventListener('click', onfocus)
        }
        window.addEventListener('click', onfocus)
      }, 300)
      document.body.appendChild(input)
      input.focus()
      input.click()
    })
  }
}

/** Picker options. */
export interface PickerBrowserOptions {
  /** optional mime type of the files to select. (default *) */
  readonly accept?: string
  /** allow multiple files (default true.) */
  readonly multiple?: boolean
}
