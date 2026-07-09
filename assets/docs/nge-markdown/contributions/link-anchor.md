---
title: LinkAnchor
description: Make in-page anchor links navigate through the Angular router instead of reloading.
---

# LinkAnchor

Unlike the other contributions, LinkAnchor adds no syntax. It makes fragment links such as
`[go to section](#my-section)` navigate through the Angular router, so a full page reload never
happens and the router keeps control of the URL.

## Register

```typescript
import { NgeMarkdownLinkAnchorProvider } from '@cisstech/nge/markdown'

// add to your app providers (see Usage for the full setup)
providers: [NgeMarkdownLinkAnchorProvider]
```

That is all: existing anchor links in your Markdown now route in place.
