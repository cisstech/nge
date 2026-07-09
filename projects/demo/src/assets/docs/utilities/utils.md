---
title: Utils
description: Pure helper functions for colors, dates, strings, comparison, copying, file types and typed builders, with no Angular dependency.
---

# Utils

`nge/utils` is a set of pure functions with no Angular dependency, so you can use them anywhere.

```typescript
import { deepEqual, shortDate, colorContrast } from '@cisstech/nge/utils'

deepEqual({ a: 1 }, { a: 1 }) // true
```

## What is available

- **Colors**: `rgbFromHex`, `rgbToHex`, `colorContrast` (readable foreground for a background),
  `colorTint`, `colorShade`.
- **Dates**: `epoch`, `addDays`, `timestamp`, `toTimestamp`, `dateFromTimestamp`, `fullDate`,
  `shortDate`, `hours`, `isToday`, `compareDays`, `convertDate`, `weeksDiff`, `dateRangeOverlaps`.
- **Strings**: `isNullOrEmpty`, `anyNullOrEmpty`, `isURL`, `hashCode`.
- **Comparison and copy**: `deepEqual`, `deepCopy`.
- **Contracts**: `ensures`, `ensuresNonNull`, `ensuresNonNullArray`, `ensuresNonNullString` for
  runtime assertions that also narrow the type.
- **File types**: `extensionOf`, `isImage`, `isPdf`, `isText`, `isWordDoc`, `isExcelDoc`,
  `isPowerPointDoc`.
- **Builder**: the `Builder<T>` class with the `@Entity` and `@Property` decorators for building
  typed objects.
