---
sidebar_position: 3
---

# Texture Packs

This information should help you along the process of creating and distributing a texture pack properly.

## Restrictions

Do not change the resolution of the sky, clouds, or eye textures. Other textures should let you change the size. Using extremely large textures will use more VRAM and will load slower.

The PNG file should have an alpha channel. Some textures use their alpha channels for transparency, or for indicating which parts should have environment mapping applied. It may be useful to look at how the original texture uses the alpha channel first, especially for particle effects.

## Recommended workflow

To make this easier to set up, you can copy the default textures from `assets`, and then modify those.

For example, you can copy the `common` folder from `data/decompiler_out/jak1/textures` to `texture_replacements`. Then you can modify the png files in `texture_replacements/common`

## Rebuilding the game with modified textures

Run the decompiler/extractor again to rebuild with modified textures.

If it worked, you will see:

```
Replacing jak-project/texture_replacements/common/jng-precursor-metal-plain-01-lores.png
```

as part of the output.

## Distributing

If you want your texture pack to be installable via the Launcher, there are some simple rules you should follow when bundling it up.

![](./img/texture-packs.png)

1. Ensure it is a `.zip` file with a top level `texture_replacements` folder. This folder should contain all of your texture replacements in the same layout they would be while creating the pack. For example:

![](./img/texture-dir-example1.png)
![](./img/texture-dir-example2.png)

2. If you want your texture pack to have a nice thumbnail in the launcher, you should add a top level `cover.png` image as shown above.

3. Lastly, if you want your texture pack to have associated metadata (such as a description and author name) you should add a top level `metdata.json` file that abides by the following format - https://github.com/open-goal/mod-bundling-tools/blob/main/schemas/texture-packs/v1/texture-pack-schema.v1.json
   - If you aren't familiar with JSON schema, here is an example (which may become out of date in terms of newly supported fields)

```json
{
  "name": "Snowy Legacy",
  "version": "1.0.0",
  "author": "InnocentMiau",
  "releaseDate": "2022-09-08",
  "supportedGames": ["jak1"],
  "description": "Snowy texture pack and snowy weather everywhere.",
  "tags": ["overhaul", "themed"]
}
```
