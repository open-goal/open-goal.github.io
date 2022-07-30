---
sidebar_position: 1
---

# Subtitle Translations

OpenGOAL has added support for subtitles in Jak 1, a game that did not originally have subtitles.  In future games that do have subtitles we will similarly support translations to languages that didn't originally exist as well.

If you are interested in contributing subtitles, this document hopes to help get you started with an end-to-end example.

## Getting Setup

First off, if you are going to contribute subtitles you will need to eventually get the changes merged into our GitHub repository - https://github.com/open-goal/jak-project

Therefore, it can be assumed that you are working out of the project directory and _not_ with the release / launcher versions.  Working in this way will also provide the fastest testing cycle (you can update the subtitles without even restarting the game!)

You should setup the project using the instructions in the repository's README:
- Windows - https://github.com/open-goal/jak-project#windows
- Linux - https://github.com/open-goal/jak-project#linux

And if you are unfamiliar with GitHub and Git, here are some useful links:
- How to fork our repository and submit a PR - https://www.youtube.com/watch?v=yr6IzOGoMsQ
- How to use Git via a GUI to commit your changes - https://www.youtube.com/watch?v=RPagOAUx2SQ

If you have successfully followed the steps and the game is successfully running out of the project directory, we can proceed.

## Step 1 - What are you Contributing?

Are you adding a brand new language, or simply changing or adding to an existing language?

:::info
If you adding to a language that already has subtitles (ie. English) [skip ahead](#edit-subtitles), otherwise continue in order!
:::

## Step 2 - Adding a Brand New Language

:::caution
Be aware that at the time of writing we use the original Jak 1 font, which has a very limited character set.  Your language might not be supported well by this font so you'll want to confirm this first.  Feel free to reach out for clarification if you are unsure.
:::

To add subtitles to a new language, we're going to have to do some slight source-code editing.

1. Make sure your subtitle language is supported.  We have several languages stubbed out, if yours is not in this list you will need to add it:
   1. Open `goal_src/{GAME_NAME}/pc/pckernel-h.gc` and look at the `pc-subtitle-lang` enum
   ![](/docs/subtitle-translations/supported-lang-list.png)
2. If your language is not in this list, add it with a clear name and unique ID.  For example `(latin 99)` (don't exceed the id value of `custom`)

:::info
If your language is in the list, skip to the next step!
:::

3. We now have to setup text entries for this new language.  First add it to the `game-text-id` enum in the respective `all-types.gc` file, for Jak 1 that is `decompiler/config/all-types.gc`
![](/docs/subtitle-translations/new-lang-all-types.png)
4. Add this same entry to the same enum in `goal_src/{GAME_NAME}/engine/ui/text-h.gc`
![](/docs/subtitle-translations/new-lang-text-h.png)
5. Lastly, add atleast the english text entry for this in `game/assets/{GAME_NAME}/jak1/text/game_text_en.gs`
![](/docs/subtitle-translations/new-lang-text-entry.png)
<!-- TODO - ref tests will likely fail -->

## Step 3 - Wiring up the Language

3. We can now wire up this new or currently stubbed out language to the game itself.  This requires a few changes:
    1. Add it to the `*subtitle-languages*` list in `goal_src/{GAME_NAME}/pc/progress-pc.gc`.  Maintain the order by the numeric ID (ie. `english` is `0` so it comes first).  If your language was brand new you should also add it to `*language-remap-info-pc*` in a similar fashion.
    ![](/docs/subtitle-translations/add-to-global.png)
    1. Add it to the built-in debug menu for completeness in `goal_src/{GAME_NAME}/engine/debug/default-menu.gc`
    ![](/docs/subtitle-translations/add-to-debug.png)
    1. Make sure a subtitle file exists for the language at the following location `game/assets/{GAME_NAME}/subtitle/game_subtitle_{LANG_CODE}.gd` with the following content (adjust the ID and file name accordingly):
    ![](/docs/subtitle-translations/make-subtitle-file.png)
    1. Finally, the last step is to point to this subtitle file in the subtitle project file at `game/assets/game_subtitle.gp`
    ![](/docs/subtitle-translations/add-to-project.png)
4. Let's recompile the game and boot it to make sure it's still working.  If you followed the setup instructions you should be familiar with this, but to recap:
   1. Open a terminal / command prompt and enter `task repl`
      1. Once the REPL loads, run `(mi)`
   2. When the `(mi)` completes, open a separate terminal and run `task boot-game`
   3. If everything boots up successfully, you should be able to see your new language in the menu, and selecting it shouldn't cause any errors!
   ![](/docs/subtitle-translations/game-new-lang-works.png)
   4. Since we added a test subtitle, go talk to the farmer and you should see your customized subtitle!
   ![](/docs/subtitle-translations/game-subtitle-test-works.png)

## Step 4 - Adding and Editing Subtitles {#edit-subtitles}

It's recommended to use the built-in subtitle editor for atleast the following reasons:
- Let's you easily reload the subtitles while the game is running
- Let's you arbitrarily play cutscenes and hints back quickly (remember in debug mode you can skip/end cutscenes with "Triangle")
- Let's you select a base language so you know what is yet to be translated
- Handles converting the characters to Jak's character set automatically.

:::caution
Be aware of these limitations before proceeding too far
:::

1. Subtitles should be done in all uppercase (Jak 1's font does not have a lower-case character set)
2. Subtitles should be limited to 2 lines on the default 4x3 resolution
   1. We have a way to automatically check for outliers, but keeping this in mind in-advance will help reduce work for you!

With that out of the way, let's demonstrate using the editor with an end-to-end example.

### Using the Editor and Connecting the REPL

You can open the editor via the top-bar, `Tools` > `Subtitle Editor`

![](/docs/subtitle-translations/editor-open-it.png)

You'll notice a few things about this screenshot

By default, we have the english subtitle editor file selected for editing (id `0`), we'll want to change this to our language.
![](/docs/subtitle-translations/editor-change-edit-language.png)

Under `REPL Options` you can see that it's not connected and has instructions to connect.  Follow the instructions and then click the button and it should succeed

![](/docs/subtitle-translations/editor-connect-repl.png)

- Note that this tool is a little rough around the edges so if it can't connect you may need to restart the game/repl/both!

Under `All Cutscenes` you'll see we only have `village1` as an option, and under that option, everything except `farmer-introduction` is greyed out.

![](/docs/subtitle-translations/editor-all-cutscenes.png)

- This is because it's the only subtitle we've setup.  The greyed out options are subtitles that are defined in the base language (see above, it's set to english).  This let's us keep track of what we havn't done yet and copy those existing definitions into our new language for editing.  Let's do that next.

### Copying Subtitles from a Base Language

Let's forget about the farmer and use Keira's intro cutscene `assistant-introduction-blue-eco-switch`.  First, click the `Copy from Base Language` button

![](/docs/subtitle-translations/editor-copy-from-base.png)

The scene should no longer be greyed out.  Let's demonstrate how to commit these changes and see them in action:
1. Click the `Save Changes` button at the top  
  ![](/docs/subtitle-translations/editor-save-changes.png)
  - If you go look at your `game_subtitle_*.gd` file, you should see the new changes!
2. Click `Play Scene` on the cutscene, it should play and you should see the subtitles.

Anytime you want to commit changes from the editor to the actual game, you just need to click `Save Changes` (and the REPL has to be connected!)

Great! So now let's try editing the subtitles, Click the `Select as Current` button to select the cutscene for editing, this unlocks all potential editing features for it.

### Editing Subtitles

![](/docs/subtitle-translations/editor-cutscene-breakdown.png)

A brief overview on the options.
- The `frame number` is the frame inside the cutscene where the line will show up, if you are playing in debug mode you'll see the frame number on the top left while it's playing.
- `Speaker` is the text displayed to explain who is talking if `Offscreen` is `true`
- `Text` is the content of the subtitle
- `Offscreen` is a true or false value for if `Speaker` should be displayed

And the color coding:
- A `Clear Screen` entry is greyed out, and will clear the subtitles from the screen at that frame
- A yellow entry is one that is marked as `offscreen`
- The currently selected cutscene is rendered as cyan

So let's change Daxter's opening line.  Open the first entry and replace the text with something

![](/docs/subtitle-translations/editor-change-text.png)

Now `Save Changes` just like before, and `Play Scene` to see the changes

![](/docs/subtitle-translations/editor-view-new-changes.png)

:::tip
At this time, there is no `Remove Entry` feature.  So you will have to delete the line from the `game_subtitle_*.gd` file manually for now if needed!
:::

At this point, it's just rinse-and-repeat until you've finished your changes.

### Step 5 - Submitting your Pull Request

This is not the place to explain how to use git/github, see the links above if you are a beginner at this or reach out in the discord.

However, once you are happy with your changes submit a pull request with them so they can be reviewed and added to the game for everyone to use!
