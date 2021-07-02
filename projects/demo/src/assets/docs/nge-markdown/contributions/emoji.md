# Emoji

**Emoji** contribution add the possibility to use a thousands of emojis in your project documentation.
There are two ways to add emoji to markdown files:

* **copy and paste the emoji into your markdown.**

  This is the solution you will choose in the most cases, you can simply copy an emoji from a source like [Emojipedia](https://emojipedia.org/)
  and paste it into your document and skip the configuration section.

* **type emoji shortcodes.**

  If you choose this solution, you must read the configuration section to config the contribution.

## Configuration

```typescript highlights="6-9 18 21"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgeMarkdownModule,
  NgeMarkdownEmojiProvider,
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
  providers: [NgeMarkdownEmojiProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Options

The contribution use [emoji-toolkit](https://github.com/joypixels/emoji-toolkit) render emoji from shortcodes and load it from a cdn with the default options.
But you can load the library from another domain by providing a value to `NGE_MARKDOWN_EMOJI_OPTIONS` injection token.

```typescript highlights="6-10 19 23-24"
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgeMarkdownModule,
  NgeMarkdownEmojiProvider,
  NgeMarkdownEmojiOptionsProvider,
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
    NgeMarkdownEmojiProvider,
    NgeMarkdownEmojiOptionsProvider({ url: 'assets/scripts/joypixels.min.js' })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Usage

Emojis can be integrated in Markdown by putting the shortcode of the emoji between two colons.
You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md)
or [Emojipedia](https://emojipedia.org/joypixels/) for a complete list of shortcodes.

Example:

```plaintext
:smile:
```

Result:

😄
