import {z as zt,y as yt,u as uf,m as mr,bb as iN,k as kd,aJ as cr,ax as wa,aK as _S,az as Vd,aQ as $a}from'./main-ARUFEQ2D.js';var u=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=kd({type:e,selectors:[["app-home"]],decls:14,vars:0,consts:[["align","center"],["src","./assets/images/nge.svg","alt","NGE logo","width","120px"]],template:function(i,b){i&1&&(wa(0,"nge-markdown"),_S(1,`
`),_S(2,`

`),wa(3,"h1",0),_S(4,"NG Essentials"),Vd(),_S(5,`

`),wa(6,"div",0),_S(7,`
  `),$a(8,"img",1),_S(9,`
`),Vd(),_S(10,`

`),wa(11,"div",0),_S(12,`

A collection of libraries for [Angular](https://angular.dev) developers.

[![Tests](https://github.com/cisstech/nge/actions/workflows/ci.yml/badge.svg)](https://github.com/cisstech/nge/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/cisstech/nge/branch/main/graph/badge.svg)](https://codecov.io/gh/cisstech/nge)
[![codefactor](https://www.codefactor.io/repository/github/cisstech/nge/badge/main)](https://www.codefactor.io/repository/github/cisstech/nge/overview/main)
[![GitHub Tags](https://img.shields.io/github/tag/cisstech/nge.svg)](https://github.com/cisstech/nge/tags)
[![npm package](https://img.shields.io/npm/v/@cisstech/nge.svg)](https://www.npmjs.org/package/@cisstech/nge)
[![NPM downloads](http://img.shields.io/npm/dm/@cisstech/nge.svg)](https://npmjs.org/package/@cisstech/nge)
[![licence](https://img.shields.io/github/license/cisstech/nge)](https://github.com/cisstech/nge/blob/main/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

`),Vd(),_S(13,`

## Overview

\`@cisstech/nge\` is a set of focused building blocks for Angular apps: a documentation
site engine, a Markdown renderer, a Monaco editor integration, and a few UI and utility
packages. Everything ships from a single package split into secondary entry points, so
you only bundle what you import.

## Libraries

| Entry point | What it does |
| --- | --- |
| [\`@cisstech/nge/doc\`](https://cisstech.github.io/nge/docs/nge-doc/) | Build a documentation site from a route config, Markdown files or live Angular components. |
| [\`@cisstech/nge/markdown\`](https://cisstech.github.io/nge/docs/nge-markdown/) | Markdown rendering built on [Marked](https://github.com/markedjs/marked) v11, with admonitions, tabs, KaTeX and syntax highlighting. |
| [\`@cisstech/nge/monaco\`](https://cisstech.github.io/nge/docs/nge-monaco/) | [Monaco editor](https://microsoft.github.io/monaco-editor/) integration: editor, diff editor and read-only viewer. |

Additional entry points are available for UI and helpers: \`@cisstech/nge/ui/tree\`,
\`@cisstech/nge/ui/list\`, \`@cisstech/nge/ui/icon\`, \`@cisstech/nge/services\`,
\`@cisstech/nge/pipes\` and \`@cisstech/nge/utils\`.

## Compatibility

The major version of \`@cisstech/nge\` tracks the Angular major it targets. Pick the line
that matches your Angular version.

| @cisstech/nge | Angular | Node |
| --- | --- | --- |
| 22.x | 22 | ^22.22.3, ^24.15.0 or >=26 |
| 18.x | 18 | ^18.19, ^20.11 or >=22 |
| 17.x | 17 | ^18.13 or >=20 |
| 16.x | 16 | ^16.14 or >=18 |
| 15.x | 15 | ^14.20, ^16.13 or >=18 |

## Installation

\`\`\`bash
npm install @cisstech/nge
\`\`\`

\`@angular/common\`, \`@angular/core\`, \`@angular/cdk\` and \`@angular/material\` are required
peer dependencies. \`marked\` (for \`nge/markdown\`), \`monaco-editor\` (for \`nge/monaco\`) and
\`ngx-pipes\` are optional peers: install them only when you use the matching entry point.

## Documentation

Guides and API for every library are hosted at
[cisstech.github.io/nge](https://cisstech.github.io/nge/).

## Development

\`\`\`bash
git clone https://github.com/cisstech/nge
cd nge
npm install
npm run start
\`\`\`

The demo opens at <//localhost:4200>. The repository pins its Node version in
\`.nvmrc\` (run \`nvm use\`). Useful scripts:

- \`npm run build\` builds the library, then the demo.
- \`npm test\` runs the unit tests.
- \`npm run lint\` runs ESLint.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](https://github.com/cisstech/nge/blob/main/CONTRIBUTING.md)
first, then open a [pull request](https://github.com/cisstech/nge/pulls) or an
[issue](https://github.com/cisstech/nge/issues). Before submitting, make sure your code
matches the existing style and that the tests and linter pass.

## Support

This library is free to use. As its owner and main maintainer, I put a lot of time into
it, aside from my job and my family, to answer questions, fix issues and add features. If
it saved you or your team some time, a star helps support its maintenance and future work.

## License

MIT \xA9 [Mamadou Cisse](https://github.com/cisstech)

`),Vd());},dependencies:[cr],styles:["[_nghost-%COMP%]{display:block;width:100vw;height:100vh;padding:2rem 8rem;box-sizing:border-box}@media only screen and (max-width:600px){[_nghost-%COMP%]{padding:2rem}}"],changeDetection:1});let n=e;return n})();var C=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=zt({type:e}),e.\u0275inj=yt({imports:[uf,mr,iN.forChild([{path:"",component:u}])]});let n=e;return n})();export{C as HomeModule};