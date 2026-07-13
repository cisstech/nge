---
title: withNavbar
description: Declare the header navigation links (e.g. to move between documentation sites).
---
# withNavbar

`function`

Declare the header navigation links (e.g. to move between documentation sites).

Without it, the default theme derives them from the active site's sections
(`nav: 'tabs'`) or lists the registered sites.

## Signature

```typescript
function withNavbar(links: NgeDocNavLink[]): NgeDocFeature
```

### Parameters

- `links` (`NgeDocNavLink[]`)

### Returns

`NgeDocFeature`
