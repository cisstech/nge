import { InjectionToken, Type } from '@angular/core';
import { IDynamicModule } from '@cisstech/nge/services';


/**
 * A NgeElementDef is a definition of a custom element
 */
export interface NgeElementDef {
  /**
   * The selector of the element
   */
  selector: string;
  /**
   * Reference to the module that defines the element's component.
   * The module must implements {@link IDynamicModule} and define a public "component" field.
   */
  module?: () => Type<IDynamicModule> | Promise<Type<IDynamicModule>>;


  /**
   * A component ref instead of a module ref can be provided.
   */
  component?: () => Type<any> | Promise<Type<any>>;
}

export const NGE_ELEMENTS = new InjectionToken<NgeElementDef[]>('NGE_ELEMENTS');
