import { InjectionToken } from '@angular/core'
import { NgeDocFeature } from './provide'

/** User-facing wording of the default theme, so it can be translated or reworded. */
export interface NgeDocLabels {
  /** Search control and palette (label, aria and placeholder). */
  search: string
  /** Empty search state, shown before the query. */
  searchEmpty: string
  /** Table of contents heading and its landmark label. */
  tableOfContents: string
  /** Table of contents scroll-to-top action. */
  backToTop: string
  /** Previous page, on the pager. */
  previous: string
  /** Next page, on the pager. */
  next: string
  /** Pager landmark label. */
  pagination: string
  /** Breadcrumb landmark label. */
  breadcrumb: string
  /** Footer credit, shown before the engine name. */
  poweredBy: string
  /** Mobile navigation toggle label. */
  toggleNavigation: string
  /** Sidebar collapse toggle label when the sidebar is hidden. */
  showSidebar: string
  /** Sidebar collapse toggle label when the sidebar is visible. */
  hideSidebar: string
  /** Site navigation landmark label (header and mobile drawer). */
  sections: string
  /** Folder toggle label when the folder is collapsed. */
  expand: string
  /** Folder toggle label when the folder is expanded. */
  collapse: string
  /** Theme toggle label to switch to the light scheme. */
  switchToLight: string
  /** Theme toggle label to switch to the dark scheme. */
  switchToDark: string
  /** Repository link label, used when the repo has no name. */
  repository: string
  /** Header action label, used when an action has no title. */
  action: string
  /** Link to edit the current page's source. */
  editThisPage: string
  /** Prefix for the date the current page was last updated. */
  lastUpdated: string
  /** Action that copies the page's markdown to the clipboard. */
  copyAsMarkdown: string
  /** Confirmation shown briefly after copying. */
  copied: string
  /** Action that opens the page in ChatGPT. */
  openInChatGpt: string
  /** Action that opens the page in Claude. */
  openInClaude: string
}

/** Default (English) theme wording. */
export const DEFAULT_NGE_DOC_LABELS: NgeDocLabels = {
  search: 'Search documentation',
  searchEmpty: 'No results for',
  tableOfContents: 'On this page',
  backToTop: 'Back to top',
  previous: 'Previous',
  next: 'Next',
  pagination: 'Pagination',
  breadcrumb: 'Breadcrumb',
  poweredBy: 'Powered by',
  toggleNavigation: 'Toggle navigation',
  showSidebar: 'Show sidebar',
  hideSidebar: 'Hide sidebar',
  sections: 'Documentation sections',
  expand: 'Expand',
  collapse: 'Collapse',
  switchToLight: 'Switch to light theme',
  switchToDark: 'Switch to dark theme',
  repository: 'Repository',
  action: 'Action',
  editThisPage: 'Edit this page',
  lastUpdated: 'Last updated',
  copyAsMarkdown: 'Copy as Markdown',
  copied: 'Copied!',
  openInChatGpt: 'Open in ChatGPT',
  openInClaude: 'Open in Claude',
}

/** Ready-made English wording, an alias of {@link DEFAULT_NGE_DOC_LABELS}. */
export const NGE_DOC_LABELS_EN: NgeDocLabels = DEFAULT_NGE_DOC_LABELS

/** Ready-made French wording. Use it with `withLabels(NGE_DOC_LABELS_FR)`. */
export const NGE_DOC_LABELS_FR: NgeDocLabels = {
  search: 'Rechercher dans la documentation',
  searchEmpty: 'Aucun résultat pour',
  tableOfContents: 'Sur cette page',
  backToTop: 'Retour en haut',
  previous: 'Précédent',
  next: 'Suivant',
  pagination: 'Pagination',
  breadcrumb: "Fil d'Ariane",
  poweredBy: 'Propulsé par',
  toggleNavigation: 'Afficher la navigation',
  showSidebar: 'Afficher la barre latérale',
  hideSidebar: 'Masquer la barre latérale',
  sections: 'Sections de la documentation',
  expand: 'Déplier',
  collapse: 'Replier',
  switchToLight: 'Passer au thème clair',
  switchToDark: 'Passer au thème sombre',
  repository: 'Dépôt',
  action: 'Action',
  editThisPage: 'Modifier cette page',
  lastUpdated: 'Dernière mise à jour',
  copyAsMarkdown: 'Copier en Markdown',
  copied: 'Copié !',
  openInChatGpt: 'Ouvrir dans ChatGPT',
  openInClaude: 'Ouvrir dans Claude',
}

/** Overridden theme wording. Merged over {@link DEFAULT_NGE_DOC_LABELS}. */
export const NGE_DOC_LABELS = new InjectionToken<Partial<NgeDocLabels>>('NGE_DOC_LABELS')

/** Translate or reword the default theme. Pass only the labels you want to change. */
export function withLabels(labels: Partial<NgeDocLabels>): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_LABELS, useValue: labels }] }
}
