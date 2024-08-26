import { InjectionToken, Injector, Type } from '@angular/core'

export declare type StaticPage = NgeDocLink
export declare type DynamicPage = (
  injector: Injector
) => NgeDocLink | Promise<NgeDocLink> | NgeDocLink[] | Promise<NgeDocLink[]>

export declare type StaticMeta = NgeDocMeta
export declare type DynamicMeta = (injector: Injector) => NgeDocMeta | Promise<NgeDocMeta>

export declare type NgeDocRenderer = string | Promise<string> | (() => Type<any> | Promise<Type<any>>)

export declare type NgeDocRenderers = {
  /** Markdown renderer. */
  markdown: {
    /**
     * Reference to a component that can render markdown content.
     *
     * The component should expose a `file` property to render a markdown from an url
     * and a `data` property to render markdown from a string.
     */
    component: () => Type<any> | Promise<Type<any>>
    /** Inputs objects to pass to the component instance. */
    inputs?: Record<string, any> | ((injector: Injector) => Record<string, any> | Promise<Record<string, any>>)
  }
}

export declare type NgeDocLinkActionHandler = string | ((injector: Injector) => void | Promise<void>)

/** Documentation site config. */
export interface NgeDocSettings {
  /** Metadata informations about a documentation site. */
  meta: StaticMeta | DynamicMeta
  /** Pages of the documentation site. */
  pages: (StaticPage | DynamicPage)[]
}

/** Metadata informations about a documentation site. */
export interface NgeDocMeta {
  /** Name of the documentation site. */
  name: string
  /** Root url of the documentation site. (absolute url starting with `/`)  */
  root: string
  /** Url to the logo to the documentation logo. */
  logo?: string
  /** Optional back url (use of Angular [routerLink]) */
  backUrl?: string

  /** Optional url for the back button icon */
  backIconUrl?: string

  /** Optional back href */
  backUrlHref?: string

  /** Optional informations about a github repository linked to the site */
  repo?: {
    /** Url of the repository */
    url: string
    /** Name of the repository. */
    name: string
  }
  /** social links to show insides the footer */
  links?: {
    href: string
    icon: string
  }[]
}

export interface NgeDocLinAction {
  /** Url to an icon to render. */
  icon?: string
  /** Title of the action. */
  title?: string
  /** Action tooltip */
  tooltip?: string
  /** Action handler. (A string value here means that the action is an url to open in a new tab) */
  run: NgeDocLinkActionHandler
}

/**
 * Representation of a link in the documentation navigation.
 */
export interface NgeDocLink {
  /** Url to display in the browser navigation bar. */
  href: string
  /** Title of the link */
  title: string
  /**
   * Content to render once the link is displayed.
   *
   * - A one line string value means that the renderer is an url to a markdown file to render.
   *
   * Remarks:
   * Not required if `children` is defined.
   *
   * Example:
   *
   * `renderer: assets/my-file.md`
   *
   * - A multiline string value means that the renderer is a markdown string to render.
   *
   * Example:
   *
   * `renderer: "# My Title \n my paragraph \n ...."
   *
   * - A reference to a Component type means that the renderer is a dynamic component to render.
   *
   *  Example:
   *
   *  `renderer: () => MyComponent` // direct reference to a component
   *
   *  `renderer: () => import(....).then(m => m.MyComponent)` // reference to a lazy loaded component.
   *
   * - A reference to a Module type means that the renderer is a dynamic component to render.
   *
   *  `renderer: () => MyModule` // direct reference to a module
   *
   *  `renderer: () => import(....).then(m => m.MyModule)` // reference to a lazy loaded module.
   *
   * The difference between referencing a module and referencing a component is the following:
   *  - If you reference a module the dependencies (CommonModule, SharedModule...) of the component
   *    that you want to render will be resolved.
   *  - If you reference a component the dependencies will not be loaded.
   *
   * If you choose to reference a module, the module must contains a public field `component` that indicates
   * the component that you want to render.
   */
  renderer?: NgeDocRenderer
  /** Sub links */
  children?: NgeDocLink[]
  /** A value indicating whether the link is expanded or not. */
  expanded?: boolean
  /** Inputs to pass to the dynamic renderered component if `renderer` is a dynamic component. */
  inputs?: Record<string, any>
  /** Optional icon */
  icon?: string
  /** Custom actions */
  actions?: NgeDocLinAction[]
}

/** Representation of the documentation state. */
export interface NgeDocState {
  /**  Metadata informations about the documentation. */
  meta: NgeDocMeta
  /** Root links of the site. */
  links: NgeDocLink[]
  /** Current active link. */
  currLink?: NgeDocLink
  /** Previous link of the current link. */
  prevLink?: NgeDocLink
  /** Next link of the current link. */
  nextLink?: NgeDocLink
}

/** Custom renderers components */
export const NGE_DOC_RENDERERS = new InjectionToken<NgeDocRenderers>('NGE_DOC_RENDERERS')

export const isNgeDocSettings = (v: any): v is NgeDocSettings =>
  !!v && typeof v === 'object' && !Array.isArray(v) && !!v.meta && !!v.pages

export const extractNgeDocSettings = (v: any): NgeDocSettings[] => {
  let settings: NgeDocSettings[] = []

  if (isNgeDocSettings(v)) {
    settings.push(v)
  } else if (typeof v === 'object') {
    settings.push(
      ...Object.values(v)
        .map((v) => extractNgeDocSettings(v))
        .flat()
    )
  }

  return settings
}
