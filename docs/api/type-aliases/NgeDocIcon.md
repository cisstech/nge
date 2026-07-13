---
title: NgeDocIcon
description: An icon reference.
---
# NgeDocIcon

`type`

An icon reference.

- A single url is rendered as-is (and, for monochrome chrome icons, recolored
  to the current text color by the theme so it works in light and dark).
- A `{ light, dark }` pair lets you provide a distinct asset per color scheme,
  useful for multicolor icons or logos that cannot be recolored.

```typescript
type NgeDocIcon = string | object
```
