---
sidebar_position: 0
---

import { LauncherDownloadLink } from "/src/pages/index.js"
import Requirements from '../../partials/_requirements.mdx';

# Installation

## Opening notes

> Please note that help and support for this project is not always available, as everyone involved is donating their time to this project for free. If this page or the [FAQs](/docs/faq) can't answer your question, you might be able to find help in the OpenGOAL [discord](https://discord.gg/VZbXMHXzWv), but we do not guarantee support.

At the moment OpenGOAL only supports running the first Jak and Daxter game, and Jak 2 is currently in progress. There are no timelines for their completion, as this is an open source passion project, but you're more than welcome to contribute to their development with us! See [Contributing](/docs/category/contributing) and [Developing](/docs/category/developing) for more information.

Additionally, if you'd like to see a video copy of this installation, there is a guide available [on YouTube](https://www.youtube.com/watch?v=p8I9NfuZOgE) that you can follow along with.

There are 3 main steps required to set up OpenGOAL on your machine, which are:

- Creating your `.iso` file containing (these contain the official Jak and Daxter assets)
- Installing OpenGOAL
- Running the OpenGOAL setup

Once these steps are complete you'll be able to run Jak and Daxter within OpenGOAL, and see everything this project has to offer. Follow the instructions below to prepare your installation and start playing!

## Requirements

<Requirements/>

### Windows Specific

:::info
We only support Windows 10, and Windows 11.
- Windows 7 has been out of support since January 2020
- Windows 8.1 will be end of life January 2023
:::

You may need to install the [latest 64-bit C++ redistribution](https://aka.ms/vs/17/release/vc_redist.x64.exe).

### Linux Specific

Nothing additional should be required other than functional GPU drivers

## Step 1: Preparing your ISO

The first major step requires a legal copy of any retail version of Jak and Daxter (early builds and demos not supported), as well as a CD drive to read it. We will be using these to create a `.iso` file, which contains all of the assets (such as the 3d models and sound files) that are stored on the PS2 disc, and are needed to run OpenGOAL.

:::danger
You will need your own legitimately obtained copy of the original game. The Jak games are not rare and can be found used for very affordable prices at a variety of second-hand and online stores.

[Example _Jak and Daxter_ listing (THIS IS NOT AN ENDORSEMENT).](https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=jak&_sacat=0)
:::

This guide will include one example of how to do this using ImgBurn, but any software that reads your disc will likely be able to do this. More information about this process and some alternatives can be found in the [PCSX2 guide](https://pcsx2.net/guides/basic-setup/#dumping-ps2-discs-via-imgburn).

The first step is to download ImgBurn and install, which is hosted by a number of mirrors listed on the [ImgBurn website](https://www.imgburn.com/index.php?act=download).

We do not provide support for ImgBurn directly, but there are many documents about this on the ImgBurn site and across the web. With any luck you won't need to troubleshoot the install, it's generally very stable.

Once it is installed, you'll need to insert your Jak and Daxter CD into your CD drive, and let ImgBurn read it. On the opening screen, this can be done with the `Create image file from disc` command, followed by choosing a location to save your `.iso` and starting the read. Some images of this process are included below.

<details>
  <summary>Expand this section to see step by step ImgBurn screenshots</summary>
  <div>

![Read the disc with "Creating image file from disc"](./img/imgburn_read.png)
![Choose a location for your .iso and start the read](./img/imgburn_read_confirm.png)
![This process will take a few minutes](./img/imgburn_read_in_progress.png)
![Once it's finished, you can safely close the window](./img/imgburn_read_finished.png)
![Once it's finished, you can safely close the window](./img/imgburn_operation_completed.png)

  </div>
</details>

This process will take a few minutes, so leave it running while we continue on with the next step: installing OpenGOAL itself.

:::caution
If you are on a SteamDeck, you will likely need to use the compiled releases, instead of the Launcher.  See Step 2b below!
:::

## Step 2a: Installing via the Launcher

The launcher is the preferred way of getting and using OpenGOAL:
- You can easily update both the launcher and the game
- Designed for non-technical users
- More useful features in the future

:::info
Linux support via the launcher is relatively new and there may be issues, please reach out to us so we can correct them!
:::

### Launcher Pre-requisites

There are a few requirements depending on your platform that you may need to handle.

#### Windows

The Launcher depends on Webview2, which has been shipping on Windows 10+ since April 2018.  If for some reason you still don't have it and have been keeping your PC up to date, you can get it here https://developer.microsoft.com/en-us/microsoft-edge/webview2/

#### Linux

The Launcher is distributed as an AppImage, in recent distributions such as Ubuntu 22.04, you may see an error like the following:

![](./img/linux-req-fuse.png)

If so, install the following package

```bash
sudo apt install libfuse2
```

### Downloading and Installing

We provide a pre-packaged OpenGOAL installation that you can use to get started right away. The latest download can be found below:

<div className="row markdownMarginBottom">
    <div className="col col--4">
        <LauncherDownloadLink />
    </div>
</div>

#### Windows Defender Warnings

This installer however is not signed, which may lead to warnings from Microsoft Defender or your antivirus of choice, as installing unsigned applications can be a security risk. This is unfortunately something we can not fix, as signing an application is both expensive and time consuming, and this project is being developed free of charge by a community of volunteers.

If you trust this application even without the signature, some screenshots of how to pass through the most common warnings can be found below. If you have some technical experience, and would prefer to build this application from the source yourself to avoid these errors, then take a look at the [project README instructions](https://github.com/open-goal/jak-project#setting-up-a-development-environment) instead. Support for this however is outside the scope of this document.

<details>
  <summary>Expand this section to see examples warnings and ignore them (if you trust this application!)</summary>
  <div>

![The first warning](./img/executable_warning.png)
![Windows Defender SmartScreen hides the skip button](./img/windows_defender_warning.png)
![Run anyway if you trust this application](./img/windows_defender_run_anyway.png)

  </div>
</details>

If you have chosen to continue installing the application after these warnings, you'll be shown a simple installation wizard that will allow you to configure and launch OpenGOAL. Some step by step screenshots have been included below.

<details>
  <summary>Expand this section to see the process of installing OpenGOAL</summary>
  <div>

![Launching the installer](./img/opengoal_install_start.png)
![Choose a location to install OpenGOAL](./img/opengoal_install_location.png)
![Start the install](./img/opengoal_install_confirm.png)
![Wait for the installer to complete](./img/opengoal_install_in_progress.png)
![Launch OpenGOAL once the install is complete](./img/opengoal_install_finished.png)

  </div>
</details>

If you choose to launch OpenGOAL once the install is completed, you'll skip right to the next step. If not you'll need to navigate to the location you chose for OpenGOAL to install (by default this location is `C:\Program Files\OpenGOAL-Launcher`), and run `OpenGOAL-Launcher.exe`.

If this opens successfully, you've reached the final stage! Up next we'll be setting up the launcher, including extracting the assets from your `.iso` file.

### Setting up the launcher

If you would prefer a video, see the following (made using Windows but the process should be very similar on Linux):

<ReactPlayer url={"https://www.youtube.com/watch?v=p8I9NfuZOgE"} style={{marginBottom: "1em"}}/>

This step is very straightforward, but as this project is still in active development you may come across issues along the way. If you hit issues please remember that this is a community led project, and we can't guarantee support. Please first visit the [FAQs](/docs/faq) and if you can't find an answer there, you might be able to find help in the OpenGOAL [discord](https://discord.gg/VZbXMHXzWv), but we do not guarantee support.

If you haven't already, you'll first need to navigate to the location you chose for OpenGOAL to install:
- For **Windows** - by default this location is `C:\Program Files\OpenGOAL-Launcher`), and run `OpenGOAL-Launcher.exe`.
- For **Linux** - this is wherever you placed the downloaded AppImage

:::danger
If you see an error when you first open your launcher about your device not meeting requirements, you unfortunately **WILL NOT** be able to continue with the installation. OpenGOAL requires a minimum OpenGL version from your GPU as well as AVX support from your CPU, and if either of those requirements aren't met you **WILL NOT** be able to run OpenGOAL.

![Missing minimum requirements](./img/opengoal_launcher_jd1_opengl_not_supported.png)
:::

If you don't see this above error though, you're ready to continue! For this step we'll first give OpenGOAL the location of the `.iso` file we created earlier. Click the `SETUP` button in the launcher window to begin with.

![Setup OpenGOAL with your .iso file](./img/opengoal_launcher_jd1_setup.png)

This will open a window, and you'll need to navigate to the `.iso` file you created earlier in the setup here to continue. Once you've chosen the `.iso` file, the launcher will begin extracting the assets for the game.

![Launcher extracting assets and completing compilation](./img/opengoal_launcher_jd1_compiling.png)

This can take some time, but if you find it taking more than a few minutes try opening the `INSTALLATION LOGS` view below the progress bar, and see if there is still progress being made. If you don't see any changes here after a minute or two more, try closing and re-running the launcher.

This process will complete loading the assets from your `.iso` file, and once it's done you'll be ready to run the game!

![Starting Jak and Daxter in OpenGOAL](./img/opengoal_launcher_jd1_ready_to_start.png)

Once you've reached this screen, you're all set up and ready to go! Just hit `PLAY` to start the game. The other controls are not something you'll need to play the game, as most of them are tools for developers, but do take note of the `SETTINGS AND SAVES` button if you want a link to your saves to move them or back them up, and of course the `UNINSTALL` button if you choose to do so down the line. The OpenGOAL launcher can also be uninstalled from the OpenGOAL installer used earlier in the instructions.

That's everything! At this point you should have a working copy of the game to play. Join us in the [discord](https://discord.gg/VZbXMHXzWv) or finding streams/streaming yourself on [Twitch](https://www.twitch.tv/directory/game/Jak%20and%20Daxter:%20The%20Precursor%20Legacy) to get involved in the community.

**ENJOY!**

## Step 2b: Installing via a `jak-project` Release

If you don't want to use the Launcher or it is not applicable for your platform, you can use the minimal base release instead.

These releases can be found here - https://github.com/open-goal/jak-project/releases
- For **Windows** you want to download the `opengoal-windows-vX.X.X.zip` asset
- For **Linux** you want to download the `opengoal-linux-vX.X.X.tar.gz` asset

:::tip
If you have some technical experience, and would prefer to build this application from the source yourself, then take a look at the [project README instructions](https://github.com/open-goal/jak-project#setting-up-a-development-environment) instead. Support for this however is outside the scope of this document.
:::

### Windows

If you would prefer a video, see the following:

<ReactPlayer url={"https://www.youtube.com/watch?v=yQBKCnS5MDY"} style={{marginBottom: "1em"}}/>

1. Extract the `.zip` file wherever you'd like
2. Drag your `.iso` file onto the `extractor.exe` file
3. Run `gk.exe` to open the game

### Linux

If you're continuing with the builds from the latest releases, extract the contents of the `.tar.gz` file to get a folder with a similar list of files to the below.

![Expected files for Linux users](./img/linux_files_list.png)

Once you have these files extracted, there are two main steps required. The first is to extract all of the assets from the `.iso` file you created earlier, using the `extractor` from the install above (eg `./extractor <path-to-iso>`). Once this extraction completes, you should be able to run `gk` from the same folder to start the game.

### Linux (Steam Deck)

If you are here looking to set up OpenGOAL on your Steam Deck there is a video guide for Steam Deck users that covers the process of installing and running OpenGOAL very thoroughly. The only change in this video is that we do now support other non black label versions of Jak and Daxter, so any disc should work!

<ReactPlayer url={"https://www.youtube.com/watch?v=Cv7mlCSHKxc&t=564s"} style={{marginBottom: "1em"}}/>

> NOTE: For Steam Deck users, you can add OpenGOAL to your Steam library after installation by pointing to the `gk` file in this folder. You will need to change the `File type` to `All Files` in order to see it!
>
> ![Add gk to add OpenGOAL to your Steam Library, filter by All Files](./img/steam_deck_add_to_library.png)


## MacOS

:::danger
We do not support macOS at this time. Unfortunately macOS does not currently support the version of OpenGL we use for this project, and we additionally do not support any ARM processors, meaning significant changes would be required.
:::

## Conclusion

That's everything! At this point you should have a working copy of the game to play. Join us in the [discord](https://discord.gg/VZbXMHXzWv) or finding streams/streaming yourself on [Twitch](https://www.twitch.tv/directory/game/Jak%20and%20Daxter:%20The%20Precursor%20Legacy) to get involved in the community.
