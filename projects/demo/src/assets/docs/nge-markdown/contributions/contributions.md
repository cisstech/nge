---
title: Contributions
description: Extend nge/markdown with admonitions, tabs, KaTeX, emoji, icons, router-aware links and syntax highlighting, or write your own transform of the Markdown pipeline.
---

# Contributions

A contribution hooks into the Markdown pipeline to change the syntax it understands or the HTML
it produces. nge/markdown ships a set of ready-made ones and lets you write your own.

## Built-in contributions

Each is a provider you add to your app. Add only the ones you use.

| Contribution | Provider | What it adds |
| --- | --- | --- |
| [Admonitions](/docs/nge-markdown/contributions/admonitions) | `NgeMarkdownAdmonitionsProvider` | Styled call-out blocks |
| [TabbedSet](/docs/nge-markdown/contributions/tabbed-set) | `NgeMarkdownTabbedSetProvider` | Tabbed content groups |
| [KaTeX](/docs/nge-markdown/contributions/katex) | `NgeMarkdownKatexProvider` | Math and chemistry |
| [Emoji](/docs/nge-markdown/contributions/emoji) | `NgeMarkdownEmojiProvider` | Emoji from shortcodes |
| [Icons](/docs/nge-markdown/contributions/icons) | `NgeMarkdownIconsProvider` | Inline icons |
| [LinkAnchor](/docs/nge-markdown/contributions/link-anchor) | `NgeMarkdownLinkAnchorProvider` | Router-aware anchor links |
| [Highlighter](/docs/nge-markdown/contributions/highlighter) | `NgeMarkdownHighlighterProvider` | Code syntax highlighting |

Register them in your app providers (see [Usage](/docs/nge-markdown/usage) for the full setup):

```typescript
import {
  NgeMarkdownAdmonitionsProvider,
  NgeMarkdownTabbedSetProvider,
  NgeMarkdownKatexProvider,
  NgeMarkdownEmojiProvider,
  NgeMarkdownIconsProvider,
  NgeMarkdownLinkAnchorProvider,
  NgeMarkdownHighlighterProvider,
} from '@cisstech/nge/markdown'

// in your ApplicationConfig (or NgModule) providers
providers: [
  NgeMarkdownAdmonitionsProvider,
  NgeMarkdownTabbedSetProvider,
  NgeMarkdownKatexProvider,
  NgeMarkdownEmojiProvider,
  NgeMarkdownIconsProvider,
  NgeMarkdownLinkAnchorProvider,
  NgeMarkdownHighlighterProvider,
]
```

## Write your own

A contribution is a class implementing `NgeMarkdownContribution`. Its `contribute` method receives
an `NgeMarkdownTransformer` that lets you hook into each phase of the parse:

- `addMarkdownTransformer` rewrites the raw Markdown string before parsing.
- `addTokenizerTransformer` adjusts the Marked [tokenizer](https://marked.js.org/using_pro#tokenizer).
- `addAstTransformer` edits the token list produced by the [lexer](https://marked.js.org/using_pro#lexer).
- `addRendererTransformer` adjusts the Marked [renderer](https://marked.js.org/using_pro#renderer).
- `addHtmlTransformer` edits the final HTML before it is displayed.

`dependencies()` can return external scripts or styles to load before the transforms run.

=== my-contribution.ts

```typescript
import { Injectable, Provider } from '@angular/core'
import {
  NgeMarkdownContribution,
  NgeMarkdownTransformer,
  NGE_MARKDOWN_CONTRIBUTION,
} from '@cisstech/nge/markdown'

@Injectable()
export class MyContribution implements NgeMarkdownContribution {
  contribute(transformer: NgeMarkdownTransformer) {
    transformer.addHtmlTransformer((element) => {
      element.querySelectorAll('h2').forEach((h2) => h2.classList.add('section-title'))
    })
  }
}

export const MyContributionProvider: Provider = {
  provide: NGE_MARKDOWN_CONTRIBUTION,
  multi: true,
  useClass: MyContribution,
}
```

=== providers

```typescript
providers: [MyContributionProvider]
```

===
