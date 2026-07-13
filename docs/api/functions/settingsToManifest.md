---
title: settingsToManifest
description: Converts code-first NgeDocSettings into a NgeDocManifest:
---
# settingsToManifest

`function`

Converts code-first [NgeDocSettings](/docs/api/interfaces/NgeDocSettings) into a [NgeDocManifest](/docs/api/interfaces/NgeDocManifest):
resolves dynamic `meta`/`pages` factories and returns a fresh tree with hrefs
joined under `meta.root`. The input is never mutated, so settings stay reusable
across navigations.

## Signature

```typescript
function settingsToManifest(settings: NgeDocSettings, injector: Injector): Promise<NgeDocManifest>
```

### Parameters

- `settings` (`NgeDocSettings`)
- `injector` (`Injector`)

### Returns

`Promise<NgeDocManifest>`
