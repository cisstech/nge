# Admonitions

**Admonitions**, also known as call-outs, are an excellent choice for including side content without significantly interrupting the document flow. nge-markdown provides several different types of admonitions and allows for the inclusion and nesting of arbitrary content.

> The examples from this page are based on <https://squidfunk.github.io/mkdocs-material/reference/admonitions/>

## Configuration

```typescript highlights="6-9 18 21"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgeMarkdownModule,
  NgeMarkdownAdmonitionsProvider,
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
  providers: [NgeMarkdownAdmonitionsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Usage

**Admonitions** follow a simple syntax: a block must start with `:::` followed by a single keyword which is used as the type qualifier of the block.
The content of the block then follows on the next line, then a closing block `:::`

Example

```plaintext
::: note
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
massa, nec semper lorem quam in massa.
:::
```

Result

::: note

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
massa, nec semper lorem quam in massa.

:::

## Adding a title

A title can be added to the admonition by adding a string containing valid Markdown (including links, formatting, ...) after the type qualifier.

> Adding a **+** after **:::** will open the admonition by default

Example

```plaintext
:::+ note Phasellus **posuere** in sem ut cursus
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
massa, nec semper lorem quam in massa.
:::
```

Result

:::+ note Phasellus **posuere** in sem ut cursus
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
massa, nec semper lorem quam in massa.
:::

## Embedded content

Admonitions can contain all kinds of text content, including headlines, lists, paragraphs and other blocks. While the parser from the standard Markdown library doesn't account for nested blocks, the Admonition contribution adds the ability to nest arbitrary content inside admonitions.

Example:

````plaintext
:::+ note Phasellus **posuere** in sem ut cursus
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
massa, nec semper lorem quam in massa.

``` python
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

Nunc eu odio eleifend, blandit leo a, volutpat sapien. Phasellus posuere in
sem ut cursus. Nullam sit amet tincidunt ipsum, sit amet elementum turpis.
Etiam ipsum quam, mattis in purus vitae, lacinia fermentum enim.
:::
````

Result:

:::+ note Phasellus **posuere** in sem ut cursus
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
massa, nec semper lorem quam in massa.

``` python
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

Nunc eu odio eleifend, blandit leo a, volutpat sapien. Phasellus posuere in
sem ut cursus. Nullam sit amet tincidunt ipsum, sit amet elementum turpis.
Etiam ipsum quam, mattis in purus vitae, lacinia fermentum enim.
:::

## Supported types

Following is a list of type qualifiers provided ***Admonitions***:

`note`

:::+ note Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`abstract`

:::+ abstract Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`info`

:::+ info Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`tip`

:::+ tip Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`success`

:::+ success Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`question`

:::+ question Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`warning`

:::+ warning Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`failure`

:::+ failure Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`danger`

:::+ danger Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`bug`

:::+ bug Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`example`

:::+ example Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::

`quote`

:::+ quote Phasellus posuere in sem ut cursus
Lorem **ipsum** dolor sit amet, consectetur adipiscing elit.
:::
