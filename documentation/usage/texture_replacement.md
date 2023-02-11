---
sidebar_position: 3
---

# How to Replace Textures

<!-- TODO - doc for using the Launcher -->

:::caution

The following instructions depend on if you are using a release version (pre-compiled) or building the project from source.

:::

## Restrictions

Do not change the resolution of the sky, clouds, or eye textures. Other textures should let you change the size.  Using extremely large textures will use more VRAM and will load slower.

The PNG file should have an alpha channel. Some textures use their alpha channels for transparency, or for indicating which parts should have environment mapping applied. It may be useful to look at how the original texture uses the alpha channel first, especially for particle effects.

## Where to place the files?

### Using the OpenGOAL Launcher

Click on the gear icon in the bottom left of the launcher to get to the Settings page of the launcher. Then click on the button labeled Open App Directory, this should open up a folder with your systems file manager. Inside of this directory open the `data` folder and create a folder called `texture_replacements` . The directory structure should be

```
data/texture_replacements/page_name/texture_name.png
```

Where `page_name` is the name of the folder in `data/decompiler_out/jak1/textures` and `texture_name.png` is the name of the texture. After you have placed your texture replacements into the proper directory, click on the `Decompile` button on the front page of the launcher to replace the textures in your game.

### Using a Release build

Create a folder called `texture_replacements` inside the `data` directory. The directory structure should be

```
data/texture_replacements/page_name/texture_name.png
```

Where `page_name` is the name of the folder in `data/decompiler_out/jak1/textures` and `texture_name.png` is the name of the texture.

### From source

Textures to be replaced should be saved in

```
jak-project/texture_replacements/page_name/texture_name.png
```

Where `page_name` is the name of the folder in `decompiler_out/jak1/textures` and `texture_name.png` is the name of the texture.

:::tip

You'll have to create the `texture_replacements` folder yourself.

:::

## Recommended workflow

To make this easier to set up, you can copy the default textures from `assets`, and then modify those.

For example, you can copy the `common` folder from `data/decompiler_out/jak1/textures` to `texture_replacements`.  Then you can modify the png files in `texture_replacements/common`

## Rebuilding the game with modified textures

Run the decompiler/extractor again to rebuild with modified textures.

If it worked, you will see:

```
Replacing jak-project/texture_replacements/common/jng-precursor-metal-plain-01-lores.png
```

as part of the output.

