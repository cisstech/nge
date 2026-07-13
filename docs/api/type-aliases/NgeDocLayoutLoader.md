---
title: NgeDocLayoutLoader
description: Loads the theme component that renders the documentation.
---
# NgeDocLayoutLoader

`type`

Loads the theme component that renders the documentation.

A theme is a standalone component; return it directly or lazily (dynamic
`import()`), synchronously or as a promise. This is how a theme plugs its own
whole layout into the nge-doc engine.

```typescript
type NgeDocLayoutLoader = () => Type<unknown> | Promise<Type<unknown> | object>
```
