---
sidebar_position: 1
---

# Editor Tools

<!-- TODO - gifs would be nice! -->

Most of the tooling for Jak 1 was all done through Python scripts and the CLI.

This time around, we have some improved tools that you may find useful.

The tools are provided via a VSCode extension that you can find here - https://marketplace.visualstudio.com/items?itemName=opengoal.opengoal

:::caution
Many of these tools assume you have built the repo in `Release` mode
:::

## General Features

Will highlight errors / warnings / info messages in the output so you can tell at a glance what is wrong with the file

![](/docs/developing/decompiling/editor_tools/warn-highlight.png)

Populate an outline view, which is useful for very large files

![](/docs/developing/decompiling/editor_tools/outline.png)

Provides proper folding so you can collapse functions you've completed to reduce scrolling

![](/docs/developing/decompiling/editor_tools/folding.png)

Commands for jumping between IR2 and `disasm.gc` file, as well as returning to IR2 file from the `all-types` file

![](/docs/developing/decompiling/editor_tools/switch-file.png)

## Decompiling a Specific File

Before you can leverage any fancier features like automatic decompilation, you need to pick a file and decompile it manually once.

To do so, run the following command and follow the prompts

![](/docs/developing/decompiling/editor_tools/specific-file.png)

## Automatically Decompiling Files

Ideally, anytime you make a change to the config files you'd like the IR2 files to re-decompile.

If you have `Auto-Decompilation` Enabled, which you can do through either the bottom status bar, any active IR2 files in your editor will be decompiled when a change to the config occurs:

![](/docs/developing/decompiling/editor_tools/auto-decomp-bottom.png)

Or a command:

![](/docs/developing/decompiling/editor_tools/auto-decomp-top.png)

## Decompile Current File

If you'd rather trigger decompilations manually, this is an option as well

![](/docs/developing/decompiling/editor_tools/manual-decomp.png)

## Jump to Definition

Wondered what that LSP binary was that we started adding to our `jak-project` releases? This is what it is primarily for, as long as the LSP is active (shown at the bottom of the editor), you can Ctrl+Click any symbol and the LSP will try to jump you back to the right spot in `all-types.gc`

## Show Register Casts as Inlay Hints

You can press `Ctrl+Alt` at anytime to see what casts are applied to the registers. This is helpful for debugging a cast mistake.

![](/docs/developing/decompiling/editor_tools/inlay-hints.png)

## Applying Casts

There are some commands to help apply casts, it will try to infer the OP Number(s), the registers you have in your select range, etc and try to apply the relevant cast while _preserving comments in the JSON file!_

These are a little experimental and a lot to describe initially so, experiment with them and see if they are helpful to you.

![](/docs/developing/decompiling/editor_tools/cast-ops.png)

:::tip
The most interesting of these is the `Repeat Last`, the editor will remember relevant information about what you casted last and if you are often applying the same cast over and over -- this might be a very useful thing to give a key bind.
:::
