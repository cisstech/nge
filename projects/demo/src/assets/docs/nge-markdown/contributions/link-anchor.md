# LinkAnchor

**LinkAnchor** contribution is a quite special, unlike the other contributions, it does not add new syntax to markdown syntax, it purpose is to allow [anchor link navigation](https://www.geekstrick.com/fragment-url-in-angular-8/) with Angular router when you write something like:

`[click to go to myanchor](#myanchor)`

## Configuration

```typescript highlights="6-9 18 21"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgeMarkdownModule,
  NgeMarkdownLinkAnchorProvider,
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
  providers: [NgeMarkdownLinkAnchorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
