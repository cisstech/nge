---
title: Icon
description: Render an icon from Font Awesome, icongram, VS Code codicons, a file or folder type, or an image, behind one component.
---

# Icon

`ui-icon` renders an icon from several sources behind a single component. You pass an `Icon`
instance and the component draws the right thing.

## Usage

```html
<ui-icon [icon]="icon" />
```

```typescript
import { FaIcon, CodIcon, IcongrIcon, ImgIcon } from '@cisstech/nge/ui/icon'

readonly icon = new FaIcon('user') // Font Awesome
```

## Sources

- `new FaIcon('user')`: a [Font Awesome](https://fontawesome.com) icon.
- `new CodIcon('git-commit')`: a [VS Code codicon](https://microsoft.github.io/vscode-codicons/).
- `new IcongrIcon('material account')`: an [icongram](https://icongr.am) icon (`library name`),
  with size and color options.
- `new ImgIcon('assets/logo.svg', { alt: 'Logo' })`: any image url.

## File and folder icons

Icons matched by file extension (and folder open/closed state) are available through the package's
icon pipes, so a file explorer can show the right glyph per entry.

## Configuration

Provide `NGE_UI_ICON_CONFIG` to set a default file icon or register extra `FileIcon` mappings for
extensions the built-in set does not cover.
