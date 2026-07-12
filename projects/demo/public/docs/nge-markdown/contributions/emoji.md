---
title: Emoji
description: Render emoji from shortcodes such as :smile: using Emoji Toolkit.
---

# Emoji

Write emoji straight into Markdown. You can paste a Unicode emoji directly, or type a shortcode
and let this contribution render it with [Emoji Toolkit](https://github.com/joypixels/emoji-toolkit).

## Register

```typescript
import { provideNgeMarkdown, withEmoji } from '@cisstech/nge/markdown'

// add to your app providers (see Usage for the full setup)
providers: [provideNgeMarkdown(withEmoji())]
```

## Syntax

Wrap a shortcode in colons. See the [emoji cheat sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md)
for the full list.

```plaintext
:smile:
```

Result: 😄

## Options

Emoji Toolkit loads from a CDN by default. Point it at another location by passing options to
`withEmoji`:

```typescript
import { provideNgeMarkdown, withEmoji } from '@cisstech/nge/markdown'

providers: [
  provideNgeMarkdown(
    withEmoji({ url: 'assets/scripts/joypixels.min.js' }),
  ),
]
```
