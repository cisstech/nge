# Icons

**Icons** contribution add the possibility to use more than 10000 icons in your project documentation with practically zero additional effort.
The icons are downloaded on demand from [icongr](https://icongr.am).

## Configuration

```typescript highlights="6-9 18 21"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgeMarkdownModule,
  NgeMarkdownIconsProvider,
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
  providers: [NgeMarkdownIconsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Usage

Icons can be integrated in Markdown by putting between `@` the name of any of the icon libraries
supported by [icongr](https://icongr.am) followed by the name of an icon.

Example:

```plaintext
@octicons home@
@fontawesome home@
```

Result:

@octicons home@
@fontawesome home@

## With colors

Icons can be colored by using the `color` option.

Example:

```plaintext
@octicons home color=FF0000@
@fontawesome home color=00FF00@
```

Result:

@octicons home color=FF0000@
@fontawesome home color=00FF00@


## With size

Icons can be resized by using the `size` option.

Example:

```plaintext
@octicons home size=64 color=FF0000@
@fontawesome home size=96 color=00FF00@
```

Result:

@octicons home size=64 color=FF0000@
@fontawesome home size=96 color=00FF00@
