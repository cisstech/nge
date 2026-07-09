---
title: Icons
description: Inline icons from icongram, sized and colored, loaded on demand.
---

# Icons

Drop icons into Markdown with almost no setup. Icons are fetched on demand from
[icongram](https://icongr.am), which offers more than 10,000 across several libraries.

## Register

```typescript
import { NgeMarkdownIconsProvider } from '@cisstech/nge/markdown'

// add to your app providers (see Usage for the full setup)
providers: [NgeMarkdownIconsProvider]
```

## Syntax

Wrap the icon library and name in `@`.

```plaintext
@octicons home@
@fontawesome home@
```

Result: @octicons home@ @fontawesome home@

## Color and size

Add `color` (a hex value without `#`) and `size` (in pixels).

```plaintext
@octicons home size=32 color=FF0000@
@fontawesome home size=48 color=00AA00@
```

Result: @octicons home size=32 color=FF0000@ @fontawesome home size=48 color=00AA00@
