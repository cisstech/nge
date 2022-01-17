import { InjectionToken, Type } from '@angular/core';

export interface NgeElementDef {
  selector: string;
  module: () => (Type<any> | Promise<Type<any>>);
}

export const NGE_ELEMENTS = new InjectionToken<NgeElementDef[]>('NGE_ELEMENTS');
