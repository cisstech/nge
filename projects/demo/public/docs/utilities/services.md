---
title: Services
description: Root-provided helpers for the clipboard, dynamic component rendering, on-demand resource loading and file picking.
---

# Services

Every service in `nge/services` is `providedIn: 'root'`, so you just `inject()` it.

```typescript
import { inject } from '@angular/core'
import { ClipboardService } from '@cisstech/nge/services'

const clipboard = inject(ClipboardService)
await clipboard.copy('Copied to the clipboard')
```

## What is available

- **`ClipboardService`** copies text to the clipboard: `copy(text): Promise<void>`.
- **`CompilerService`** mounts a component dynamically: `render(options): Promise<ComponentRef>`
  and `resolveComponent(type, injector)`. This is what the doc engine and the Markdown renderer use
  to render component pages.
- **`ResourceLoaderService`** loads external scripts and styles on demand, once each:
  `loadAllSync(resources)` and `loadAllAsync(resources)` return an observable, and
  `waitForPendings()` resolves when in-flight loads finish. It is how contributions pull in KaTeX,
  emoji and other assets only when needed.
- **`PickerBrowserService`** opens the browser file picker: `pickFiles(options): Promise<File[]>`.
- **`InjectorService`** exposes the root injector for the rare case where you need it outside
  Angular's dependency injection.
