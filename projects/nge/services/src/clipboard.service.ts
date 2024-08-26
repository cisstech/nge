import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  copy(data: string): Promise<void> {
    return navigator.clipboard.writeText(data)
  }

  read() {
    return navigator.clipboard.readText()
  }
}
