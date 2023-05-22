---
sidebar_position: 10
---

# Font Color Tables

This page contains the font color table for each game. This table and the enum is defined in `font-h.gc`. It includes the color index (used for the `L` format command, e.g. `~3L` will set the color to the one with index `3`), the color name (used in the `font-color` enum) - whose value matches the index - and an example of how it looks like. Note that the table does not include alpha/transparency, it is shown here as pre-multiplied with the RGB values.

:::info
Some of these colors are modified at runtime. For example, `credits` in Jak 1 is altered when rendering the staff titles. These tables only reflect the initial values.
:::


import ColorTable from './color_table.js';

## Jak & Daxter

<ColorTable game="jak1"/>

## Jak II

<ColorTable game="jak2"/>

