---
title: TabbedSet
description: Group alternative content, such as code for several languages, under tabs.
---

# TabbedSet

Group alternative content under tabs, for example the same setup shown for npm and yarn, or a
snippet in several languages.

## Register

```typescript
import { NgeMarkdownTabbedSetProvider } from '@cisstech/nge/markdown'

// add to your app providers (see Usage for the full setup)
providers: [NgeMarkdownTabbedSetProvider]
```

## Syntax

Each tab starts with `===` followed by its title, then a blank line and the content. Close the set
with a line holding only `===`.

````plaintext
=== Code

```c
#include <stdio.h>

int main(void) {
  printf("Hello world!\n");
  return 0;
}
```

=== List

- Sed sagittis eleifend rutrum
- Donec vitae suscipit est
- Nulla tempor lobortis orci

===
````

Result:

=== Code

```c
#include <stdio.h>

int main(void) {
  printf("Hello world!\n");
  return 0;
}
```

=== List

- Sed sagittis eleifend rutrum
- Donec vitae suscipit est
- Nulla tempor lobortis orci

===

:::+ note
A tab can hold arbitrary content and nest inside other blocks (admonitions, blockquotes), but it
cannot contain another tab set.
:::
