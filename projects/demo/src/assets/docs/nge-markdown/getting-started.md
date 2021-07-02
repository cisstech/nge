# Getting started

**nge-markdown** is an [Angular](https://angular.io) markdown parser library based on [Marked](https://github.com/markedjs/marked) project.

## Features

* Render markdown from a string using @Input()
* Render markdown from a file
* Render markdown using [transclusion](https://ultimatecourses.com/blog/transclusion-in-angular-2-with-ng-content)
* Render markdown using `NgeMarkdownService`.
* Default themes
  * github
* Extends markdown syntax using contributions
  * Admonitions contribution to render fenced styled blocks.
  * TabbedSet contribution to render a set of tabs.
  * Icon contribution to render icons from [icongram](https://icongr.am)
  * Emoji contribution to render emoji using [Emoji Toolkit](https://github.com/joypixels/emoji-toolkit)
  * Katex contribution to render Latex using [Katex](https://katex.org/)
  * Syntax highlighter support using [nge-monaco](https://www.npmjs.com/package/nge-monaco) by default
  * LinkAnchor contribution to handles anchor navigation using Angular router
* Expose marked renderer
* Expose marked tokenizer
* Write your own contribution to modify the ast, the rendered html, marked tokenizer, marked renderer..
* Access to the ast at the end of the parsing.

...

## Contribution

Contributions are always welcome. <br/>

Please read our [CONTRIBUTING.md](https://github.com/mciissee/nge-markdown/blob/master/CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/mciissee/nge-markdown/pulls) or as [GitHub issues](https://github.com/mciissee/nge-markdown/issues).

Please just make sure that ...

Your code style matches with the rest of the project

Unit tests pass

Linter passes

## Support Development

The use of this library is totally free and no donation is required.

As the owner and primary maintainer of this project, I am putting a lot of time and effort beside my job, my family and my private time to bring the best support I can by answering questions, addressing issues and improving the library to provide more and more features over time.

If this project has been useful, that it helped you or your business to save precious time, don't hesitate to give it a star and to consider a donation to support its maintenance and future development.

## License

MIT © [Mamadou Cisse](https://github.com/mciissee)
