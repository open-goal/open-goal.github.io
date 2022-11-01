---
sidebar_position: 1
---

import CaptionedImage from "/src/components/CaptionedImage";

# Game Settings

In addition to the settings available in the original Jak games, OpenGOAL provides some additional settings that will allow you to tweak and improve the games in new ways. This page will highlight some of these new settings and provide examples for them, but there are still more to find in game. Once you've had a look through this page, [try changing them yourself in game](/docs/usage/installation)!

## Subtitles (and languages)

**Found in Options > Game Options**

One major new addition to OpenGOAL that was not present in the original game are the subtitles. These were not part of the original game, but instead are a community effort to transcribe and translate the game into subtitles for different languages, making it easier for more people to enjoy.

Additionally all of the original available audio and text options for the game are available as settings, regardless of what version is on your disc!

This list may expand as more languages are added, but for now these are the available options:

Audio: ENGLISH, FRANÇAIS, DEUTSCH, ESPAÑOL, ITALIANO, にほんご

Subtitles: ENGLISH, DEUTSCH, ESPAÑOL, PORTUGUÊS (BRASIL)

Text language: : ENGLISH, ENGLISH (UK), FRANÇAIS, DEUTSCH, ESPAÑOL, ITALIANO, にほんご

If you're interested in adding new subtitles to the game, or editing existing ones, take a look [at the subtitle translations page](/docs/contributing/subtitle-translations).

![Subtitle and language settings](/docs/settings/settings_subtitles.png)
![An example of subtitles in game](/docs/settings/subtitles_example.png)

## Cutscene skips

**Found in Options > Game Options > Miscellaneous**

Speedrunners, rejoice! This setting enables you to skip most of the cutscenes in the game by pressing Triangle (or the equivalent button) while they're playing. There are many smaller cutscenes that are not technically cutscenes in the code, and these can't be skipped (eg the Klaww battle start scene, or the Mountain pass start scene), but this option still saves a significant amount of time.

NOTE: This setting will not skip them automatically (you must always press the button), and that there's no confirmation step (eg press twice to skip).

## Speedrunner mode

**Found in Options > Game Options > Miscellaneous**

For those of you looking to speedrun the game, there's a dedicated speedrunner mode that takes care of some of the default settings, and makes sure that your run is compliant with the [OpenGOAL Jak1 speedrun categories](https://www.speedrun.com/jak1og). This includes settings like disabling hints and skipping the opening cutscene!

## Discord rich presence

**Found in Options > Game Options > Miscellaneous**

If you're interested in showing off your progress in game through Discord, then this setting is for you! The rich presence setting will show some of your gameplay stats to people viewing your Discord profile.

![Discord rich presence example](/docs/settings/discord_rich_presence_example.png)

## Precursor Orb glow

**Found in Options > Game Options > Miscellaneous**

This is a small visual tweak, but one that can make orbs easier to see in the distance or on certain backgrounds. It might also help you find that one last missing orb!

<div className="row markdownMarginBottom">
    <div className="col">
        <div className="simple-flex-box">
            <CaptionedImage caption="Orb glow off, the original" src="/docs/settings/orb_glow_off.png" />
            <CaptionedImage caption="Orb glow on, new option" src="/docs/settings/orb_glow_on.png" />
        </div>
    </div>
</div>

## MSAA (anti-aliasing / smoothing)

**Found in Options > Graphic Options > MSAA**

**M**ulti**S**ample **A**nti-**A**liasing is setting commonly found in most modern games, and is an approach to "smooth out" jagged edges found in images or models to improve their appearance. A comparison of the lowest setting (off) against the highest setting (16x) is shown below. Notice the edges of the scout fly box on both, particularly at the top of the image.

<div className="row markdownMarginBottom">
    <div className="col">
        <div className="simple-flex-box">
            <CaptionedImage caption="MASS off, the lowest setting" src="/docs/settings/msaa_off.png" />
            <CaptionedImage caption="MASS 16x, the highest setting" src="/docs/settings/msaa_16x.png" />
        </div>
    </div>
</div>

## Camera settings

**Found in Options > Game Options > Camera Options**

For those of you who find the default camera controls uncomfortable there are settings to invert the camera controls both horizontally and vertically, in both 3rd and 1st person. Always worth testing to see if you find it easier to play with these adjusted!

![Camera options](/docs/settings/settings_camera.png)

## Cheats

**Found in Options > Secrets > Cheats**

If you have played through the original Jak 2 and Jak 3 games you might have seen the cheats menu option, with settings that are unlocked through gameplay and change either how the game is played or how it looks. We won't spoil all the different cheats here, but here's a quick example with some of the more noticable visual cheats ...

![Some fun graphical cheats](/docs/settings/cheats_example.png)

## Graphical Settings

TODO

## Controller Binds

TODO
