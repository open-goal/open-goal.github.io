---
sidebar_position: 0
---

import { LauncherDownloadLink } from "/src/pages/index.js"

# Installation

## Opening notes

> Please note that help and support for this project is not always available, as everyone involved is donating their time to this project for free. If this page or the [FAQs](/faq.md) can't answer your question, you might be able to find help in the OpenGOAL [discord](https://discord.gg/VZbXMHXzWv), but we do not guarantee support.

At the moment OpenGOAL only supports running the first Jak and Daxter game, and Jak 2 is currently in progress. There are no timelines for their completion, as this is an open source passion project, but you're more than welcome to contribute to their development with us! See [Contributing](/docs/category/contributing) and [Developing](/docs/category/developing) for more information.

Additionally, if you'd like to see a video copy of this installation, there is a guide available [on YouTube](https://www.youtube.com/watch?v=p8I9NfuZOgE) that you can follow along with.

## Windows

There are 3 main steps required to set up OpenGOAL on your machine, which are:

- Creating your `.iso` file containing (these contain the official Jak and Daxter assets)
- Installing OpenGOAL
- Running the OpenGOAL setup

Once these steps are complete you'll be able to run Jak and Daxter within OpenGOAL, and see everything this project has to offer. Follow the instructions below to prepare your installation and start playing!

### Creating your ISO

The first major step requires a legal copy of any retail version of Jak and Daxter (early builds and demos not supported), as well as a CD drive to read it. We will be using these to create a `.iso` file, which contains all of the assets (such as the 3d models and sound files) that are stored on the PS2 disc, and are needed to run OpenGOAL.

:::danger
You will need your own legitimately obtained copy of the original game. The Jak games are not rare and can be found used for very affordable prices at a variety of second-hand and online stores.

[Example _Jak & Daxter_ listing (THIS IS NOT AN ENDORSEMENT).](https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=jak&_sacat=0)
:::

This guide will include one example of how to do this using ImgBurn, but any software that reads your disc will likely be able to do this. More information about this process and some alternatives can be found in the [PCSX2 guide](https://pcsx2.net/guides/basic-setup/#dumping-ps2-discs-via-imgburn).

The first step is to download ImgBurn and install, which is hosted by a number of mirrors listed on the [ImgBurn website](https://www.imgburn.com/index.php?act=download).

We do not provide support for ImgBurn directly, but there are many documents about this on the ImgBurn site and across the web. With any luck you won't need to troubleshoot the install, it's generally very stable.

Once it is installed, you'll need to insert your Jak and Daxter CD into your CD drive, and let ImgBurn read it. On the opening screen, this can be done with the `Create image file from disc` command, followed by choosing a location to save your `.iso` and starting the read. Some images of this process are included below.

<details>
  <summary>Expand this section to see step by step ImgBurn screenshots</summary>
  <div>

![Read the disc with "Creating image file from disc"](/docs/installation/imgburn_read.png)
![Choose a location for your .iso and start the read](/docs/installation/imgburn_read_confirm.png)
![This process will take a few minutes](/docs/installation/imgburn_read_in_progress.png)
![Once it's finished, you can safely close the window](/docs/installation/imgburn_read_finished.png)
![Once it's finished, you can safely close the window](/docs/installation/imgburn_operation_completed.png)

  </div>
</details>

This process will take a few minutes, so leave it running while we continue on with the next step: installing OpenGOAL itself.

### Downloading and Installing OpenGOAL

For Windows users we provide a pre-packaged OpenGOAL installation that you can use to get started right away. The latest download can be found below:

<div className="row markdownMarginBottom">
    <div className="col col--4">
        <LauncherDownloadLink />
    </div>
</div>

This installer however is not signed, which may lead to warnings from Microsoft Defender or your antivirus of choice, as installing unsigned applications can be a security risk. This is unfortunately something we can not fix, as signing an application is both expensive and time consuming, and this project is being developed free of charge by a community of volunteers.

If you trust this application even without the signature, some screenshots of how to pass through the most common warnings can be found below. If you have some technical experience, and would prefer to build this application from the source yourself to avoid these errors, then take a look at the [project README instructions](https://github.com/open-goal/jak-project#setting-up-a-development-environment) instead. Support for this however is outside the scope of this document.

<details>
  <summary>Expand this section to see examples warnings and ignore them (if you trust this application!)</summary>
  <div>

![The first warning](/docs/installation/executable_warning.png)
![Windows Defender SmartScreen hides the skip button](/docs/installation/windows_defender_warning.png)
![Run anyway if you trust this application](/docs/installation/windows_defender_run_anyway.png)

  </div>
</details>

If you have chosen to continue installing the application after these warnings, you'll be shown a simple installation wizard that will allow you to configure and launch OpenGOAL. Some step by step screenshots have been included below.

<details>
  <summary>Expand this section to see the process of installing OpenGOAL</summary>
  <div>

![Launching the installer](/docs/installation/opengoal_install_start.png)
![Choose a location to install OpenGOAL](/docs/installation/opengoal_install_location.png)
![Start the install](/docs/installation/opengoal_install_confirm.png)
![Wait for the installer to complete](/docs/installation/opengoal_install_in_progress.png)
![Launch OpenGOAL once the install is complete](/docs/installation/opengoal_install_finished.png)

  </div>
</details>

If you choose to launch OpenGOAL once the install is completed, you'll skip right to the next step. If not you'll need to navigate to the location you chose for OpenGOAL to install (by default this location is `C:\Program Files\OpenGOAL-Launcher`), and run `OpenGOAL-Launcher.exe`.

If this opens successfully, you've reached the final stage! Up next we'll be setting up the launcher, including extracting the assets from your `.iso` file.

### Setting up the launcher

This step is very straightforward, but as this project is still in active development you may come across issues along the way. If you hit issues please remember that this is a community led project, and we can't guarantee support. Please first visit the [FAQs](/faq.md) and if you can't find an answer there, you might be able to find help in the OpenGOAL [discord](https://discord.gg/VZbXMHXzWv), but we do not guarantee support.

If you haven't already, you'll first need to navigate to the location you chose for OpenGOAL to install (by default this location is `C:\Program Files\OpenGOAL-Launcher`), and run `OpenGOAL-Launcher.exe`.

:::danger
If you see an error when you first open your launcher about your device not meeting requirements, you unfortunately **WILL NOT** be able to continue with the installation. OpenGOAL requires a minimum OpenGL version from your GPU as well as AVX support from your CPU, and if either of those requirements aren't met you **WILL NOT** be able to run OpenGOAL.

![Missing minimum requirements](/docs/installation/opengoal_launcher_jd1_opengl_not_supported.png)
:::

If you don't see this above error though, you're ready to continue! For this step we'll first give OpenGOAL the location of the `.iso` file we created earlier. Click the `SETUP` button in the launcher window to begin with.

![Setup OpenGOAL with your .iso file](/docs/installation/opengoal_launcher_jd1_setup.png)

This will open a window, and you'll need to navigate to the `.iso` file you created earlier in the setup here to continue. Once you've chosen the `.iso` file, the launcher will begin extracting the assets for the game.

![Launcher extracting assets and completing compilation](/docs/installation/opengoal_launcher_jd1_compiling.png)

This can take some time, but if you find it taking more than a few minutes try opening the `INSTALLATION LOGS` view below the progress bar, and see if there is still progress being made. If you don't see any changes here after a minute or two more, try closing and re-running the launcher.

This process will complete loading the assets from your `.iso` file, and once it's done you'll be ready to run the game!

![Starting Jak and Daxter in OpenGOAL](/docs/installation/opengoal_launcher_jd1_ready_to_start.png)

Once you've reached this screen, you're all set up and ready to go! Just hit `PLAY` to start the game. The other controls are not something you'll need to play the game, as most of them are tools for developers, but do take note of the `SETTINGS AND SAVES` button if you want a link to your saves to move them or back them up, and of course the `UNINSTALL` button if you choose to do so down the line. The OpenGOAL launcher can also be uninstalled from the OpenGOAL installer used earlier in the instructions.

That's everything! At this point you should have a working copy of the game to play. Join us in the [discord](https://discord.gg/VZbXMHXzWv) or finding streams/streaming yourself on [Twitch](https://www.twitch.tv/directory/game/Jak%20and%20Daxter:%20The%20Precursor%20Legacy) to get involved in the community.

**ENJOY!**

## Linux

> NOTE: If you are here looking to set up OpenGOAL on your Steam Deck there is a [video guide for Steam Deck users](https://www.youtube.com/watch?v=Cv7mlCSHKxc&t=564s) that covers the process of installing and running OpenGOAL very thoroughly. The only change in this video is that we do now support other non black label versions of Jak and Daxter, so any disc should work!

To begin with you'll first need to create a `.iso` file from your copy of Jak and Daxter, reading the dics for its content. The [Windows ISO instructions](installation#creating-your-iso) have some example instructions using a Windows program called ImgBurn, which you'll need an alternative to, but the rest of the instructions are the same.

### Running via the Launcher

The pre-built Linux launcher should function identically to the [Windows steps above](installation#setting-up-the-launcher).

It is distributed as an AppImage, so you will need to make sure your environment is setup to run them. However, this is typically provided out of the box for most modern distros.

:::info
Linux support via the launcher is relatively new and there may be issues, please reach out to us so we can correct them!
:::

### Running via the GitHub Release

If the launcher is not working for you, or if you are using an environment where it's not suitable (ie. a Steamdeck) then you should use the release and the following steps

As there is currently no pre-built launcher for Linux you will need to instead fetch the latest release from our [GitHub repo](https://github.com/open-goal/jak-project/releases). Here you will need to download the latest `.tar.gz` file (eg `opengoal-linux-v0.1.29.tar.gz`) to get the tools for this setup.

If you have some technical experience, and would prefer to build this application from the source yourself, then take a look at the [project README instructions](https://github.com/open-goal/jak-project#setting-up-a-development-environment) instead. Support for this however is outside the scope of this document.

If you're continuing with the builds from the latest releases, extract the contents of the `.tar.gz` file to get a folder with a similar list of files to the below.

![Expected files for Linux users](/docs/installation/linux_files_list.png)

Once you have these files extracted, there are two main steps required. The first is to extract all of the assets from the `.iso` file you created earlier, using the `extractor` from the install above (eg `./extractor <path-to-iso>`). Once this extraction completes, you should be able to run `gk` from the same folder to start the game.

> NOTE: For Steam Deck users, you can add OpenGOAL to your Steam library at this point by pointing to the `gk` file in this folder. You will need to change the `File type` to `All Files` in order to see it!
>
> ![Add gk to add OpenGOAL to your Steam Library, filter by All Files](/docs/installation/steam_deck_add_to_library.png)

That's everything! At this point you should have a working copy of the game to play. Join us in the [discord](https://discord.gg/VZbXMHXzWv) or finding streams/streaming yourself on [Twitch](https://www.twitch.tv/directory/game/Jak%20and%20Daxter:%20The%20Precursor%20Legacy) to get involved in the community.

## MacOS

:::danger
We do not support macOS at this time. Unfortunately macOS does not currently support the version of OpenGL we use for this project, and we additionally do not support any ARM processors, meaning significant changes would be required.
:::
