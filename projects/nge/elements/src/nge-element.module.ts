import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { NgeElementDetectorDirective } from './nge-element-detector.directive'
import { NGE_ELEMENTS, NgeElementDef } from './nge-element'

@NgModule({
  imports: [CommonModule],
  declarations: [NgeElementDetectorDirective],
  exports: [NgeElementDetectorDirective],
})
export class NgeElementModule {
  static forRoot(elements: NgeElementDef[]): ModuleWithProviders<NgeElementModule> {
    return {
      ngModule: NgeElementModule,
      providers: [
        {
          provide: NGE_ELEMENTS,
          useValue: elements,
        },
      ],
    }
  }
}
