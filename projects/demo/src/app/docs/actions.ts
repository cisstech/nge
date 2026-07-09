import { NgeDocIcon, NgeDocLinAction } from '@cisstech/nge/doc'

// icongr.am is cross-origin, so provide a per-scheme colored variant (a mask
// can't recolor a cross-origin icon). Colors match the theme's muted foreground.
export const octicon = (name: string): NgeDocIcon => ({
  light: `https://icongr.am/octicons/${name}.svg?color=52525b`,
  dark: `https://icongr.am/octicons/${name}.svg?color=a1a1aa`,
})

// `path` is the file under projects/demo/src (the same value as a page renderer),
// so the action links straight to the Markdown source on GitHub.
export const editInGithubAction = (path: string): NgeDocLinAction => ({
  title: 'Edit on github',
  icon: octicon('pencil'),
  run: `https://github.com/cisstech/nge/tree/main/projects/demo/src/${path}`,
})
