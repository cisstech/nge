---
title: withSeo
description: Enable per-page canonical, Open Graph and Twitter tags. Titles and descriptions
---
# withSeo

`function`

Enable per-page canonical, Open Graph and Twitter tags. Titles and descriptions
come from each page (frontmatter overrides the manifest); `url` builds the
canonical and `og:url`, and `image` sets the default social card.

## Signature

```typescript
function withSeo(config: NgeDocSeoConfig): NgeDocFeature
```

### Parameters

- `config` (`NgeDocSeoConfig`)

### Returns

`NgeDocFeature`
