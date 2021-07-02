# Highlighter

**Highlighter** contribution add the possibility highlight code blocks you write from your markdown files.

## Configuration

```typescript highlights="6-9 18 21"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgeMarkdownModule,
  NgeMarkdownHighlighterProvider,
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
  providers: [NgeMarkdownHighlighterProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Options

The contribution is designed in a way to not depend on any syntax highlighter.
To use it, you must implements `NgeMarkdownHighlighterService` interface and provide
a value for `NGE_MARKDOWN_HIGHLIGHTER_SERVICE`token.

[nge-monaco](https://www.npmjs.com/package/nge-monaco) is already integrated as a
highlighter service to the contribution, so
you can use it.

```typescript lines="1" highlights="6-12 21-22 26-27"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgeMonacoModule, NgeMonacoColorizerService, NGE_THEMES } from 'nge-monaco';

import {
  NgeMarkdownModule,
  NgeMarkdownMonacoProvider,
  NgeMarkdownHighlighterMonacoProvider
} from 'nge-markdown';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgeMarkdownModule,
    NgeMonacoModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    NgeMarkdownMonacoProvider,
    NgeMarkdownHighlighterMonacoProvider(NgeMonacoColorizerService),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Usage

Example

````plaintext
```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```
````

Result

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

Example

````plaintext
```python lines="1"
s = "Show line numbers starting at 1"
print(s)
```
````

Result

```python lines="1"
s = "Show line numbers starting at 1"
print(s)
```

Example

````plaintext
```python highlights="2"
s = "Highlight line 2"
print(s)
```
````

Result

```python highlights="2"
s = "Highlight line 2"
print(s)
```

Example

````plaintext
```python highlights="1-2"
s = "Highlight range"
print(s)
```
````

Result

```python highlights="1-2"
s = "Highlight range"
print(s)
```
