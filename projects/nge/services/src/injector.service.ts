import { AbstractType, Injectable, InjectionToken, Injector, Type, inject } from '@angular/core'

export interface IDynamicService {
  injectable(): boolean
}

@Injectable({ providedIn: 'root' })
export class InjectorService {
  private readonly injector = inject(Injector)

  get<T extends IDynamicService>(token: Type<any> | InjectionToken<any> | AbstractType<any>): T {
    const service = (this.injector.get(token, []) as T[]).find((e) => e.injectable())
    if (!service) {
      throw new Error('[InjectorService]: No provider found for ' + token)
    }
    return service
  }
}
