---
title: provideNgeDoc
description: Configure the nge-doc engine at the application root.
---
# provideNgeDoc

`function`

Configure the nge-doc engine at the application root.

Optional: without it, the default theme is used. Compose features such as
[withTheme](/docs/api/functions/withTheme) to opt into a custom theme.

```ts
providers: [provideNgeDoc(withTheme(() => import('@acme/theme').then((m) => m.AcmeTheme)))]
```

## Signature

```typescript
function provideNgeDoc(...features: NgeDocFeature[]): EnvironmentProviders
```

### Parameters

- `...features` (`NgeDocFeature[]`)

### Returns

`EnvironmentProviders`
