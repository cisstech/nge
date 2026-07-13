---
title: withBrand
description: Set a single brand (logo and title) for the header, shared across every site.
---
# withBrand

`function`

Set a single brand (logo and title) for the header, shared across every site.

The default theme otherwise shows the active site's `meta.name` and `meta.logo`,
so the brand width follows the current site. A fixed brand keeps the header stable
while site names still drive breadcrumbs and page titles.

## Signature

```typescript
function withBrand(brand: NgeDocBrand): NgeDocFeature
```

### Parameters

- `brand` (`NgeDocBrand`)

### Returns

`NgeDocFeature`
