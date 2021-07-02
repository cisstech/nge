# Katex

**Katex** contribution add the possibility to write mathematical and chemical expressions from your markdown files.

## Configuration

```typescript highlights="6-9 18 21"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgeMarkdownModule,
  NgeMarkdownKatexProvider,
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
  providers: [NgeMarkdownKatexProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Options

The contribution use [Katex](https://katex.org) to render the expressions. The library is loaded from a cdn
with the default options but you can load it from another domain using the **NGE_MARKDOWN_KATEX_OPTIONS** token.

```typescript lines="1" highlights="6-10 23-36"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgeMarkdownModule,
  NgeMarkdownKatexProvider,
  NgeMarkdownKatexOptionsProvider
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
  providers: [
    NgeMarkdownKatexProvider,
    NgeMarkdownKatexOptionsProvider({
      baseUrl: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/',
      options: {
          delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
          ],
      },
      extensions: {
        mhchem: true,
        copyTex: true
      }
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Usage

Blocks must be enclosed in `$$`...`$$` on separate lines:

Example

```plaintext
$$
f(x) = \int_&#123;-\infty&#125;^\infty \hat f(\xi) e^&#123;2 \pi i \xi x&#125; d\xi
$$
```

Result

$$
f(x) = \int_&#123;-\infty&#125;^\infty \hat f(\xi) e^&#123;2 \pi i \xi x&#125; d\xi
$$

Inline blocks must be enclosed in `$`...`$`:

Example

```plaintext
$c = \\pm\\sqrt&#123;a^2 + b^2&#125;$
```

Result

$c = \\pm\\sqrt&#123;a^2 + b^2&#125;$

Chemical expression can be used in the same way as the mathematical expressions using the syntax
described here <https://mhchem.github.io/MathJax-mhchem/>:

Example

```plaintext
$\ce{CO2 + C -> 2 CO}$
```

Result

$\ce{CO2 + C -> 2 CO}$

:::+ warning
Chemical expressions are rendered only if `extensions.mhchem` is set to `true` in the options.
This is the case by default.
:::

:::+ note Copy as source
When `extensions.copyTex` is set to `true` (this is the case by default), selecting and copying KaTeX-rendered elements, copies their LaTeX source to the clipboard
:::
