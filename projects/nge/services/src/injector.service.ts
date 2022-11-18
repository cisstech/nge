import {
  AbstractType,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';

export interface IDynamicService {
  injectable(): boolean;
}

@Injectable({ providedIn: 'root' })
export class InjectorService {
  constructor(private readonly injector: Injector) {}

  get<T extends IDynamicService>(
    token: Type<any> | InjectionToken<any> | AbstractType<any>
  ): T {
    const service = (this.injector.get(token, []) as T[]).find((e) =>
      e.injectable()
    );
    if (!service) {
      throw new Error('[InjectorService]: No provider found for ' + token);
    }
    return service;
  }
}
