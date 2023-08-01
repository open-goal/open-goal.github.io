---
sidebar_position: 0
---

# Getting Started

The decompiler is the bread and butter of the OpenGOAL project, it is the first step to getting the game's original code ported to new platforms.

Our decompiler is written from scratch to specifically handle the original MIPS that the GOAL compiler would have emitted. As such, it is not perfect and bugs/features are added as _required_ to accomplish our goals.

Here we'll briefly go over a high level overview of all the inputs to the decompiler you need to be aware of, though in general this is easy way to explain the general process. Decompiling is very much reverse engineering, which is essentially just very technnical puzzle solving -- each puzzle is slightly different but there are some patterns you will pick up on with practice.

## In-Depth Walkthrough Video

If you'd like to see an indepth walkthrough of the process of decompiling a fairly complicated file, check out the following video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/LL51WvPZG5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The Decompiler's Inputs

:::tip

You can find all of the decompiler's inputs in the `./decompiler/config` directory.

:::

### `all-types.gc`

Each game has an `all-types.gc` file. This is one big monolithic file with every symbol, function, and type in the entire game. The decompiler has it's own independent TypeSystem which it initializes using this file. This is the source of truth that it uses to resolve many things. Let's look at an example function defined in this file.

```opengoal
;; (define-extern vector-dot function)
```

When the decompiler encounters the function `vector-dot` it will have no clue what it is (`;` is the comment character in OpenGOAL). It is your job to uncomment this function and give it a definition, so that the decompiler can actually process the function when it encounters it.

```opengoal
(define-extern vector-dot (function vector vector float))
```

How do we know that's the definition -- as mentioned before such is the puzzle of decompiling. Generally the way to figure this out is to find usages (search through the entire game's disassembly) or look at the function definition itself.

```opengoal_ir
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; .function vector-dot-vu
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  ;stack: total 0x00, fp? 0 ra? 0 ep? 1
;;  v0-0: float  a0-0: vector a1-0: vector
B0:
L12:
    lqc2 vf1, 0(a0)           ;; [  0] (set! vf1 (l.vf arg0)) [a0: vector ] -> []
    lqc2 vf2, 0(a1)           ;; [  1] (set! vf2 (l.vf arg1)) [a1: vector ] -> []
    vmul.xyzw vf1, vf1, vf2   ;; [  2] (.vmul.xyzw vf1 vf1 vf2) [] -> []
    vaddy.x vf1, vf1, vf1     ;; [  3] (.vaddy.x vf1 vf1 vf1) [] -> []
    vaddz.x vf1, vf1, vf1     ;; [  4] (.vaddz.x vf1 vf1 vf1) [] -> []
    qmfc2.i v0, vf1           ;; [  5] (.qmfc2.i v0-0 vf1) [] -> [v0: float ]
    jr ra
    daddu sp, sp, r0

    sll r0, r0, 0
    sll r0, r0, 0
    sll r0, r0, 0
```

:::tip

Keep in mind that GOAL's calling convention is a0 - a1 - a2 - a3 - t0 - t1 - t2 - t3

:::

This is an easy one, we can see that 2 `vector`s come in as arguments. We know they are vectors because they are loaded into the PS2's vector registers, they are 128-bit registers of 4 32-bit floats.

This process is similar to all other things in `all-types`, whether it be methods, states or types the general process is finalizing the definition by looking at the decompiler's IR output.

:::tip

Functions and types are easy to search for as they use symbol names, but what about methods that don't? Be prepared to get used to using regexes quite liberally.

Recall that methods atleast have an `id` you can use and the type name they belong to is referenced as part of the load

:::

### `type_casts.json`

The first of many cast files, of which this is probably the one you will end up using the most.

A cast takes the following form:

```json
"(method 0 process)": [
  [11, "a0", "int"],
  [[12, 45], "v0", "process"]
]
```

The key is equal to the value next to the `.function` in the IR file output. Here you can see both types of cast definitions, each references the register we are casting, and the type we want to cast it to -- but what about the first arg?

The first arg is the Operation Number, which you can see in `[]s` after each line of MIPs in the IR file. You can either do a single operation cast, or a range.

:::caution
In the case of the range, remember that it is `[inclusive, exclusive]`!
:::

### `stack_structions.json`

The next cast file is used when you need to tell the decompiler the type of something on the stack. The format is very similar:

```json
"matrix-rotate-zyx!": [
  [16, "matrix"],
  [80, "matrix"]
]
```

The key once again is the value next to the `.function` in the IR file. This time, each entry is `[<STACK_OFFSET>, <TYPE>]` instead though. There is no alternate format.

Stack usages are very obvious in the IR files and usually look like so (`sp` is the stack pointer register):

```opengoal_ir
    or s4, a0, r0             ;; [  0] (set! arg0 arg0) [a0: matrix ] -> [s4: matrix ]
    or s3, a1, r0             ;; [  1] (set! arg1 arg1) [a1: vector ] -> [s3: vector ]
    daddiu gp, sp, 16         ;; [  2] (set! gp-0 (+ sp-0 16)) [sp: <uninitialized> ] -> [gp: matrix ]
```

:::tip
The big jump from 16 to 80 is because a `matrix` is a 64 byte type (it has 4 vectors, each 16 bytes)
:::

### `label_types.json`

Labels are often static data contained within the file, for example numeric constants, or initialization data for a structure. Like most assembly languages, labels are in a format `L<NUMBER>`

```json
"profile": [
  ["L14", "profile-work"]
],

"math": [
  ["L103", "(pointer float)", 32],
  ["L102", "(pointer float)", 32]
],
```

:::caution
The key for label types is not the text after `.function`! Labels are per-file so the key is the file/object name, and not a particular symbol name
:::

Here you can see two variations. The one should hopefully be self-explanatory, we are specifying the type for a given label. The second is similar, but since it is a pointer array, we are specifying the number of elements, aka the length, of said array. You can easily figure this out by navigating the label and counting the bytes and dividing by the size of type.

```opengoal_ir
L103:
    .word 0x3f800000
    .word 0x3f82cd80
    .word 0x3f85aac0
    ...
```

:::danger
If you are used to other assembly languages, like x86 -- you may think a `word` is 16-bits, this is not the case in MIPS! A `word` in MIPS is 32-bits.

In this case there are 32 words, aka 128 bytes. Each float is 4 bytes, so we have a 32 float array!
:::

### `anonymous_function_types.jsonc`

Lambdas don't show up too much in GOAL code, atleast not in Jak 1, and often times they are associated with a `state` and will automatically mostly resolve/name themselves (for more info see [this article](./decompiling_states)).

But they do come up from time to time, and as the name implies they are functions with no name. Therefore we need a cast file to define the type, just like how we would normally do in `all-types.gc`

```json
"gkernel": [
  [33, "(function process symbol)"],
  [31, "(function process symbol)"],
  [29, "(function process symbol)"],
  [26, "(function process symbol)"],
  [23, "(function process symbol)"],
  [17, "(function process symbol)"]
],
```

There is nothing crazy about this definition, the number is the `id` of the anonymous function, which is shown in the IR outut and the string value is the signature definition.

### `var_names.jsonc`

This file is mostly used to give better names to variables so the resulting decompiled output is nicer. But they are sometimes required to progress the decompiler around `inline-array`s or other problematic types like `handle`s.

```json
"flatten-joint-control-to-spr": {
  "vars": {
    "a1-0": ["a1-0", "(inline-array vector)"],
    "a1-1": ["a1-1", "(inline-array vector)"],
    "a1-2": ["a1-2", "(inline-array vector)"],
    "s5-0": "nb-channels",
    "s4-0": "upl-idx",
    "s3-0": "ch"
  }
},
```

The first 3 casts are casting only with the intent to fix a type-analysis issue around `inline-arrays`. You can see that they make no attempt to change the name. The last 3 however are just improving the readability.

:::tip
Changing names via `var-names.jsonc` and the decompiler is preferred! If we ever have to re-decompile the file, all your nice naming changes will be preserved!
:::

### `hacks.jsonc`

The last file which is probably used the least is the hacks file. This is a bit of a catch all, but the most relevant sections are `asm_functions_by_name` and `blocks_ending_in_asm_branch`.

GOAL allowed for easily intermixing inline assembly with the code -- good for them, bad for us! Inline-assembly is used because the developers wanted to deviate from the typical compiler, which means that very often our decompiler gets stuck.

`asm_functions_by_name` can be used to mark functions as such so they will be effectively skipped.

`blocks_ending_in_asm_branch` can be used to try to get the decompiler to process the function anyway. TODO - a good explanation on this!

## Decompiling a File

Typically, you want to decompile a single file at a time, if for no other reason than it's much faster to execute.

To do so, you want to go into the decompiler config file -- in the cast of Jak 2 NTSC that is `jak2_ntsc_v1.jsonc` and add your file(s) to `allowed_objects`. The file names correspond to their names in the `goal_src/<GAME NAME>` folders.

You need to build the project as normal, and then you can run the following commands.

:::info
Using Jak 2 NTSC as an example here.

Additionally, this is doing everything semi-manually using the CLI, there are editor tools that you can choose to use to simplify or automate some steps.
:::

```bash
# you only have to run these two commands once to persist the settings
task set-game-jak2
task set-decomp-ntscv1

task decomp
```

You should then see several files show up in your `decompiler_out/jak2/` folder.

- `*_disasm.gc` - this is the OpenGOAL code the decompiler generates, if the file isn't handled properly this will likely be empty or full of errors
- `*_ir2.asm` - the intermediate representation file of annotated MIPs assembly. This is where you will be spending 99% of your time.

## Testing and Compiling

So if you've successfully decompiled a file (resolved all errors, etc), the next step is to see if it compiles by adding it to our reference tests. Every build to the repository we re-decompile and compile every file we've ever done as a regression test.

You would take your `*_disasm.gc` file and copy it into it's respective folder in `./test/decompiler/reference/jak2/**` where the folder structure must match the goal_src folder structure. You also need to replace `_disasm` with `_REF` in the file name.

You can then see if the tests pass by running:

```bash
task offline-tests
```

If everything passes, you can copy the contents into it's respective `goal_src` file.

:::danger
When copying into the `goal_src` file, place the contents _under_ the `;; decomp begins` comment if the file is finished. If it is not, please place it above.

This is crucial for us automatically tracking progress as well as everything under `;; decomp begins` can be automatically updated by scripts if needed!
:::

You will likely want to then make sure the game can build by opening a REPL and running `(mi)`. Sometimes, you may need to add some forward declarations while other files are still in progress. Once again -- add these _before_ `;; decomp begins`.
