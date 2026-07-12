/**
 * Shared chrome of fenced code blocks: a wrapper with a toolbar holding the
 * optional `filename` tab and the copy / download actions. The highlighter
 * contribution applies it whatever the colorizing backend (monaco, shiki), so
 * every block gets the same look and actions.
 */

const STYLE_ID = 'nge-markdown-code-chrome'

const COPY_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>'

const DOWNLOAD_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'

const CHECK_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>'

export interface CodeChromeOptions {
  /** The `<pre>` element of the block. */
  pre: HTMLElement
  /** Raw code, captured before colorizing (used by copy and download). */
  code: string
  /** Optional filename shown as the tab label and used as the download name. */
  filename?: string
  /** Language, used as the download extension fallback. */
  language?: string
}

/**
 * Wraps the block and prepends the toolbar. Idempotent: a block already
 * wrapped keeps its chrome (the actions are re-bound on the fresh elements a
 * re-render produces anyway, since re-rendering replaces the whole fragment).
 */
export function applyCodeChrome(document: Document, options: CodeChromeOptions): void {
  const { pre } = options
  const parent = pre.parentNode as HTMLElement | null
  if (!parent || parent.getAttribute?.('class')?.includes('nge-code-block')) {
    return
  }

  const wrapper = document.createElement('div')
  wrapper.setAttribute('class', 'nge-code-block')

  const toolbar = document.createElement('div')
  toolbar.setAttribute('class', 'nge-code-toolbar')

  const label = document.createElement('span')
  label.setAttribute('class', 'nge-code-toolbar-label')
  label.textContent = options.filename ?? options.language ?? ''
  toolbar.appendChild(label)

  const actions = document.createElement('div')
  actions.setAttribute('class', 'nge-code-toolbar-actions')
  actions.appendChild(copyAction(document, options))
  actions.appendChild(downloadAction(document, options))
  toolbar.appendChild(actions)

  parent.insertBefore(wrapper, pre)
  wrapper.appendChild(toolbar)
  wrapper.appendChild(pre)

  ensureChromeStyle(document)
}

function copyAction(document: Document, options: CodeChromeOptions): HTMLElement {
  const button = actionButton(document, 'Copy code to clipboard', COPY_SVG)
  button.addEventListener('click', async (event) => {
    event.preventDefault()
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(options.code)
      feedback(button, COPY_SVG)
    } catch {
      // Clipboard unavailable (permissions, insecure context): nothing to do.
    }
  })
  return button
}

function downloadAction(document: Document, options: CodeChromeOptions): HTMLElement {
  const button = actionButton(document, 'Download code as file', DOWNLOAD_SVG)
  button.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    const url = URL.createObjectURL(new Blob([options.code], { type: 'text/plain' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = options.filename || `code.${options.language || 'txt'}`
    anchor.click()
    URL.revokeObjectURL(url)
    feedback(button, DOWNLOAD_SVG)
  })
  return button
}

function actionButton(document: Document, title: string, svg: string): HTMLElement {
  const button = document.createElement('button')
  button.setAttribute('type', 'button')
  button.setAttribute('class', 'nge-code-action')
  button.setAttribute('title', title)
  button.setAttribute('aria-label', title)
  button.innerHTML = svg
  return button
}

/** Swaps the icon for a check mark for a moment, as the action's confirmation. */
function feedback(button: HTMLElement, restore: string): void {
  button.innerHTML = CHECK_SVG
  button.setAttribute('class', 'nge-code-action nge-code-action-done')
  setTimeout(() => {
    button.innerHTML = restore
    button.setAttribute('class', 'nge-code-action')
  }, 2000)
}

/** Neutral, scheme-adaptive styling: everything derives from `currentColor`. */
function ensureChromeStyle(document: Document): void {
  if (document.getElementById(STYLE_ID)) {
    return
  }
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = [
    '.nge-code-block { border: 1px solid color-mix(in srgb, currentColor 14%, transparent); border-radius: 8px; overflow: hidden; margin: 1em 0; }',
    '.nge-code-block > pre { margin: 0; border-radius: 0; }',
    '.nge-code-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 0.5em; padding: 0.35em 0.5em 0.35em 1em; font-size: 0.8em; background-color: color-mix(in srgb, currentColor 5%, transparent); border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); }',
    '.nge-code-toolbar-label { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; opacity: 0.75; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
    '.nge-code-toolbar-actions { display: flex; gap: 0.25em; }',
    '.nge-code-action { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; border: none; border-radius: 6px; background: transparent; color: inherit; opacity: 0.65; cursor: pointer; transition: opacity 0.2s, background-color 0.2s; }',
    '.nge-code-action:hover { opacity: 1; background-color: color-mix(in srgb, currentColor 10%, transparent); }',
    '.nge-code-action-done { color: #22c55e; opacity: 1; }',
  ].join('\n')
  document.head.appendChild(style)
}
