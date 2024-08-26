import { InjectionToken } from '@angular/core'

export interface NgeMonacoContribution {
  activate(): void | Promise<void>
  deactivate?(): void | Promise<void>
}

export const NGE_MONACO_CONTRIBUTION = new InjectionToken<NgeMonacoContribution>('NGE_MONACO_CONTRIBUTION')
