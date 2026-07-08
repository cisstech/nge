import { Directive, TemplateRef, inject } from '@angular/core'
import { ITreeNodeHolder } from './tree.model'

export declare type Context<T> = {
  $implicit: ITreeNodeHolder<T>
}

/** Element that can be used as a template for a `TreeComponent`  */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[treeNode], ui-tree-node',
  standalone: false,
})
export class TreeNodeDirective<T> {
  readonly templateRef = inject<TemplateRef<Context<T>>>(TemplateRef)

  // https://medium.com/angular-in-depth/type-checking-templates-in-angular-viewengine-and-ivy-77f8536359f5
  static ngTemplateContextGuard<T>(_: TreeNodeDirective<T>, ctx: any): ctx is Context<T> {
    return true
  }
}
