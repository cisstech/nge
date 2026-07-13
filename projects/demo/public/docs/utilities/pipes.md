---
title: Pipes
description: Standalone template pipes for type checks, length, safe values and inline icons.
---

# Pipes

`nge/pipes` are standalone pipes. Import the pipe class into the component that uses it.

```typescript
import { Component } from '@angular/core'
import { IsTemplatePipe } from '@cisstech/nge/pipes'

@Component({
  selector: 'app-demo',
  imports: [IsTemplatePipe],
  template: `@if (value | istemplate) {
    <ng-container [ngTemplateOutlet]="value" />
  }`,
})
export class DemoComponent {}
```

## What is available

- **`istemplate`**, **`isobject`**, **`isstring`**: type-guard checks, handy when a value can be a
  `TemplateRef`, an object or a plain string and the template must branch.
- **`length`**: the length of an array or string.
- **`safe`**: bypass Angular sanitization for a value you trust, by kind. Use it for a resource
  url, HTML, style, script or url.

  ```html
  <div [innerHTML]="trustedHtml | safe: 'html'"></div>
  ```

- **`icongr`**: replace [icongram](https://icongr.am) markup inside a string with the matching
  `<img>` tags.
