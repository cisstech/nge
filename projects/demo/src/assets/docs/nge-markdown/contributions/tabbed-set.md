# TabbetSet

Sometimes, it's desirable to group alternative content under different tabs. **TabbetSet** contribution allows for beautiful and functional tabs, grouping code blocks and other content.

## Configuration

```typescript highlights="6-9 18 21"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgeMarkdownModule,
  NgeMarkdownTabbetSetProvider,
} from 'nge-markdown';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgeMarkdownModule,
    BrowserAnimationsModule,
  ],
  providers: [NgeMarkdownTabbetSetProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Usage

**TabbetSet** follow a simple syntax:

* Each tab must start with `===` followed by a text which is used as the title of the tab then a blank line.
* The content can contain arbitrary nested content, except further content tabs.
* The set must end with a blank line followed by `===` .

Example:

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

* Sed sagittis eleifend rutrum
* Donec vitae suscipit est
* Nulla tempor lobortis orci

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

* Sed sagittis eleifend rutrum
* Donec vitae suscipit est
* Nulla tempor lobortis orci

===

:::+ note
Tabs can contain arbitrary nested content, except further content tabs, and can be nested in other blocks like admonitions, details or blockquotes.
:::
