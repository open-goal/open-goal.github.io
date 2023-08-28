---
sidebar_position: 1
---

# Text Translations

The following document describes how to contribute text translations and the current limitations around them.

## TLDR

:::tip
Here's a brief rundown of the key points for translating text.
:::

- Jak's font is very limiting, keep this in mind when translating strings or for evaluating if your language is a good candidate. [#supported-characters](#supported-characters)
- Crowdin:
  - Only the custom strings we have added are able to be translated via [Crowdin](https://crowdin.com/project/opengoal)
  - The strings are keyed by their text-id. If it's not obvious what the context is, you can reference the text-id and where it is used in the code
    - [Jak 1](https://github.com/open-goal/jak-project/blob/master/goal_src/jak1/engine/ui/text-h.gc)
    - As time passes, hopefully translators will add this context into Crowdin so it becomes more obvious.
- If you need to modify original strings, you will need to submit a PR with your changes.
  - This page will eventually have a more throughout walkthrough of doing so, like the subtitle page.
  - Until then, check out an existing example https://github.com/open-goal/jak-project/pull/2141

## Crowdin

We've chosen Crowdin as our provider for hopefully simplifying the translation process. If you are interesting in moderating / becoming a proof reader for a specific language, reach out in the Discord and we can make that happen.

You will need to provide your Crowdin username to do so, and you should probably have already contributed to some degree (which makes it even easier to elevate your privledges)

## Supported Characters

First off, the fonts included in the the games are quite limiting, they do not support the entire unicode character set (not even close). Therefore if your language isn't compatible, adding support for it is outside the scope of this guide.

### Jak 1

Jak 1's font supports the following characters from a translation string:

- __**Uppercase**__ alphabetical characters (A through Z)
- 0-9
- Space
- The following ASCII special characters
  - `' ! ( ) + - , . / : = < > * % ? "`
  - `<TIL>` Represents `~`
- Other Special Characters
  - ``ˇ ` ¨ º ¡ ¿ Æ Œ Ç ß ™ 、Å Ø``
- Accents
  - Tildes
    - `Ñ Ã Õ`
  - Acute
    - `Á É Í Ó Ú`
  - Double Acute
    - `Ő Ű`
  - Circumflex
    - `Â Ê Î Ô Û`
  - Grave
    - `À È Ì Ò Ù`
  - Umlaut
    - `Ä Ë Ï Ö ö Ü`
- Japanese Characters (All katakana and hiragana used in modern Japanese writing)
  - Punctuation
    - `・ ゛ ゜ ー 『 』`
  - Kanji
    - `海 界 学 岩 旧 空 撃 賢 湖 口 行 合 士 寺 山 者 所 書 小 沼 上 城 場 出 闇 遺 黄 屋 下 家 火 花 青 宝 石 赤 跡 川 戦 村 隊 台 長 鳥 艇 洞 道 発 飛 噴 池 中 塔 島 部 砲 産 眷 力 緑 岸 像 谷 心 森 水 船 世`
  - Hiragana
    - `ぁ あ ぃ い ぅ う ぇ え ぉ お か き く け こ さ し す せ そ た ち っ つ て と な に ぬ ね の は ひ ふ へ ほ ま み む め も ゃ や ゅ ゆ ょ よ ら り る れ ろ ゎ わ を ん`
    - Dakuten
      - `が ぎ ぐ げ ご ざ じ ず ぜ ぞ だ ぢ づ で ど ば び ぶ べ ぼ`
    - Handakuten
      - `ぱ ぴ ぷ ぺ ぽ`
  - Katakana
    - `ァ ア ィ イ ゥ ウ ェ エ ォ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ッ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ャ ヤ ュ ユ ョ ヨ ラ リ ル レ ロ ヮ ワ ヲ ン`
    - Dakuten
      - `ヴ ガ ギ グ ゲ ゴ ザ ジ ズ ゼ ゾ ダ ヂ ヅ デ ド バ ビ ブ ベ ボ`
    - Handakuten
      - `パ ピ プ ペ ポ`
- PS2 Buttons
  - `<PAD_X>` (PlayStation X button)
  - `<PAD_TRIANGLE>` (PlayStation Triangle button)
  - `<PAD_CIRCLE>` (PlayStation Square button)
  - `<PAD_SQUARE>` (PlayStation Circle button)

## Modifying Existing Translations

There are two ways to modify and contribute translations.

The first is to do it via [Crowdin](https://crowdin.com/project/opengoal) which has every custom string we have added to the games

- Pros
  - Keeps track of what isn't already translated
  - Zero knowledge of Git/Github required
- Cons
  - You are unable to see what the string would look like in game
  - Can only translate strings that have been added

As you are translating via Crowdin, if it is not obvious whatthe string is or where it is used you can cross reference the key with the text-id enum found here https://github.com/open-goal/jak-project/blob/master/goal_src/jak1/engine/ui/text-h.gc

![](./img/crowdin-context.png)

The second is to modify the files and submit a PR via github https://github.com/open-goal/jak-project/tree/master/game/assets/jak1/text

- Pros
  - Can add a new language
  - Translate any text-id string you want
  - Test it out in the game if needed
- Cons
  - Requires submitting a PR
  - Requires familiarity with setting up the game and REPL

### Adding a brand new language

If you want to add a brand new language or locale to the game you will have to go down the PR route and it is a bit more involved.

> TODO - do a better write-up about this here

Until this section is more fleshed out, check out the following existing documentation / examples for how to do so:

- [Relevant section in subtitle docs, very similar](/docs/contributing/subtitle-translations#step-2---adding-a-brand-new-language)
- An example PR adding Hungarian - https://github.com/open-goal/jak-project/pull/2141

### Translate a Base Game String

As stated above, Crowdin only includes new custom strings we have added in OpenGOAL (for example, `Graphics Settings`)

So translating a base game string requires submitting a PR, similar to what you'd have to do to add a brand new language. Base game strings are separated into another file from the custom strings. You can see an example of this with some [existing languages](https://github.com/open-goal/jak-project/blob/ae3b76e465261f65f5605a2911bf8d7378746413/game/assets/jak1/game_text.gp#L17-L18)

All of the game's text ids can be found here https://github.com/open-goal/jak-project/blob/master/goal_src/jak1/engine/ui/text-h.gc

So for example if you wanted to translate the prompt for trading orbs:

```opengoal
(press-to-trade-money #x11a)
```

You would add the following to the relevant game text file:

```json
{
  ...
  "11a": "MY TRANSLATED STRING",
  ...
}
```
