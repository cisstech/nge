---
title: Getting started with nge/monaco
description: Embed the Monaco editor in Angular with editor, diff editor and read-only viewer components, a theming API with automatic light/dark switching, and full control over the editor instance.
---

# nge/monaco

**nge/monaco** brings the [Monaco editor](https://microsoft.github.io/monaco-editor/), the editor
that powers VS Code, into Angular. It wraps Monaco in components while leaving the editor instance
fully in your hands.

## What you get

- **Three components.** An editor, a side-by-side diff editor, and a read-only viewer for
  highlighting a code block.
- **Theming.** A set of ready-to-use themes, an API to switch at runtime, and automatic
  light/dark switching driven by a CSS class or the OS preference.
- **Full control.** You create and own the `ITextModel`, so binding, languages and disposal work
  exactly the way Monaco intends.
- **Extensible.** Register contributions to add languages, completions or any Monaco API once the
  editor loads.
- **Loads from a CDN by default.** Point it at your own server to self-host, and localize the
  editor UI.

## Next steps

- [Installation](/docs/nge-monaco/installation) to add it to a project.
- [Usage](/docs/nge-monaco/usage) for the components, theming and extensions.
- [Showcase](/docs/nge-monaco/showcase) to see the components running.
