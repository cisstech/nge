---
title: NGE_DOC_ROUTES
description: Routes that render the documentation. Load them directly from a standalone
---
# NGE_DOC_ROUTES

`const`

Routes that render the documentation. Load them directly from a standalone
route configuration:

```ts
{ path: 'docs', loadChildren: () => import('@cisstech/nge/doc').then((m) => m.NGE_DOC_ROUTES), data: [...] }
```

```typescript
const NGE_DOC_ROUTES: Routes
```
