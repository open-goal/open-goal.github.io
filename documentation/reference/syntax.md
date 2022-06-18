---
sidebar_position: 3
---

# OpenGOAL Syntax & Examples

## The Basics

### Atoms

An "atom" in Lisp is a form that can't be broken down into smaller forms. For example `1234` is an atom, but `(1234 5678)` is not.  OpenGOAL supports the following atoms:

### Integers

All integers are by default `int`, a signed 64-bit integer. You can use:
- decimal: Like `123` or `-232`. The allowable range is `INT64_MIN` to `INT64_MAX`.
- hex: Like `#x123`. The allowable range is `0` to `UINT64_MAX`. Values over `INT64_MAX` will wrap around.
- binary: Like `#b10101010`. The range is the same as hex.
- character:
  - Most can be written like `#\c` for the character `c`.
  - Space is `#\\s`
  - New Line is `#\\n`
  - Tab is `#\\t`

GOAL has some weird behavior when it comes to integers. It may seem complicated to describe, but it really makes the implementation simpler - the integer types are designed around the available MIPS instructions.

Integers that are used as local variables (defined with `let`), function arguments, function return values, and intermediate values when combining these are called "register integers", as the values will be stored in CPU registers.

Integers that are stored in memory as a field of a `structure`/`basic`, an element in an array, or accessed through a `pointer` are "memory integers", as the values will need to be loaded/stored from memory to access them.

The "register integer" types are `int` and `uint`. They are 64-bit and mostly work exactly like you'd expect. Multiplication, division, and mod, are a little weird and are documented separately.

The "memory integer" types are `int8`, `int16`, `int32`, `int64`, `uint8`, `uint16`, `uint32`, and `uint64`.

Conversions between these types are completely automatic - as soon as you access a "memory integer", it will be converted to a "register integer", and trying to store a "register integer" will automatically convert it to the appropriate "memory integer". It (should be) impossible to accidentally get this wrong.

#### Side Note

- It's not clear what types `(new 'static 'integer)` or `(new 'stack 'integer)` are, though I would assume both are memory.
- If there aren't enough hardware registers, "register integers" can be spilled to stack, but keep their "register integer" types. This process should be impossible to notice, so you don't have to worry about it.

### String

A string generates a static string constant. Currently the "const" of this string "constant" isn't enforced. Creating two identical string constants creates two different string objects, which is different from GOAL and should be fixed at some point.

The string data is in quotes, like in C. The following escapes are supported:
- Newline: `\n`
- Tab: `\t`
- The `\` character: `\\`
- The `"` character: `\"`
- Any character: `\cXX` where `XX` is the hex number for the character.

### Float

Any number constant with a decimal in it. The trailing and leading zeros and negative sign is flexible, so you can do any of these:
- `1.`, `1.0`, `01.`, `01.0`
- `.1`, `0.1`, `.10`, `0.10`
- `-.1`, `-0.1`, `-.10`, `-0.10`

Like string, it creates a static floating point constant. In later games the float was inlined instead of being a static constant.

### Symbol

Use `symbol-name` to get the value of a symbol and `'symbol-name` to get the symbol object.

### Comments

Use `;` for line comments and `#|` and `|#` for block comments.

## Compiling a list

When the compiler encounters a list like `(a b c)` it attempts to parse in multiple ways in this order:
1. A compiler form
2. A GOOS macro
3. An enum (not yet implemented)
4. A function or method call

## Compiling an integer

Integers can be specified as
- decimal: `1` or `-1234` (range of `INT64_MIN` to `INT64_MAX`)
- hex: `#x123`, `#xbeef` (range of `0` to `UINT64_MAX`)
- binary: `#b101010` (range of `0` to `UINT64_MAX`)

All integers are converted to the signed "integer in variable" type called `int`, regardless of how they are specified.
Integer "constant"s are not stored in memory but instead are generated by code, so there's no way to modify them.

## Compiling a string

A string constant can be specified by just putting it in quotes. Like `"this is a string constant"`.
There is an escape code `\` for string:
- `\n` newline
- `\t` tab character
- `\\` the `\` character
- `\"` the `"` character
- `\cXX` where `XX` is a two character hex number: insert this character.
- Any other character following a `\` is an error.

OpenGOAL stores strings in the same segment of the function which uses the string. I believe GOAL does the same.

In GOAL, string constants are pooled per object file (or perhaps per segment)- if the same string appears twice, it is only included once. OpenGOAL currently does not pool strings. If any code is found that modifies a string "constant", or if repeated strings take up too much memory, string pooling will be added.

For now I will assume that string constants are never modified.

## Compiling a float

A floating point constant is distinguished from an integer by a decimal point. Leading/trailing zeros are optional. Examples of floats: `1.0, 1., .1, -.1, -0.2`.  Floats are stored in memory, so it may be possible to modify a float constant. For now I will assume that float constants are never modified. It is unknown if they are pooled like strings.

Trivia: Jak 2 realized that it's faster to store floats inline in the code.

## Compiling a symbol

A `symbol` appearing in code is compiled by trying each of these in the following order
1. Is it `none`? (see section on `none`)
2. Try `mlet` symbols
3. Try "lexical" variables (defined in `let`)
4. Try global constants
5. Try global variables (includes named functions and all types)

## The Special `none` type

Anything which doesn't return anything has a return type of `none`, indicating the return value can't be used.  This is similar to C's `void`.

## GOAL Structs vs. C Structs

There is one significant difference between C and GOAL when it comes to structs/classes - GOAL variables can only be references to structs.

As an example, consider a GOAL type `my-type` and a C type `my_type`.  In C/C++, a variable of type `my_type` represents an entire copy of a `my_type` object, and a `my_type*` is like a reference to an existing `my_type` object.  In GOAL, an object of `my-type` is a reference to an existing `my-type` object, like a C `my_type*`.  There is no equivalent to a C/C++ `my_type`.

As a result you cannot pass or return a structure by value.

Another way to explain this is that GOAL structures (including `pair`) always have reference semantics.  All other GOAL types have value semantics.

## Pointers

GOAL pointers work a lot like C/C++ pointers, but have some slight differences:
- A C `int32_t*` is a GOAL `(pointer int32)`
- A C `void*` is a GOAL `pointer`
- In C, if `x` is a `int32_t*`, `x + 1` is equivalent to `uintptr_t(x) + sizeof(int32_t)`.  In GOAL, all pointer math is done in units of bytes.
- In C, you can't do pointer math on a `void*`. In GOAL you can, and all math is done in units of bytes.

In both C and GOAL, there is a connection between arrays and pointers.  A GOAL array field will have a pointer-to-element type, and a pointer can be accessed as an array.

One confusing thing is that a `(pointer int32)` is a C `int32_t*`, but a `(pointer my-structure-type)` is a C `my_structure_type**`, because a GOAL `my-structure-type` is like a C `my_structure_type*`.

## Inline Arrays

One limitation of the system above is that an array of `my_structure_type` is actually an array of references to structures (C `object*[]`).  It would be more efficient if instead we had an array of structures, laid out together in memory (C `object[]`).

GOAL has a "inline array" to represent this.  A GOAL `(inline-array thing)` is like a C `thing[]`. The inline-array can only be used on structure types, as these are the only reference types.

## Fields in Structs

For a field with a reference type (structure/basic)
- `(data thing)` is like C `Thing* data;`
- `(data thing :inline #t)` is like C `Thing data;`
- `(data thing 12)` is like C `Thing* data[12];`. The field has `(pointer thing)` type.
- `(data thing 12 :inline #t)` is like `Thing data[12];`. The field has `(inline-array thing)` type

For a field with a value type (integer, etc)
- `(data int32)` is like C `int32_t data;`
- `(data int32 12)` is like `int32_t data[12];`. The field has `(array int32)` type.

Using the `:inline #t` option on a value type is not allowed.

## Dynamic Structs

GOAL structure can be dynamically sized, which means their size isn't determined at compile time. Instead the user should implement `asize-of` to return the actual size.

This works by having the structure end in an array of unknown size at compile time. In a dynamic structure definition, the last field of the struct should be an array with an unspecified size. To create this, add a `:dynamic #t` option to the field and do not specify an array size.  This can be an array of value types, an array of reference types, or an inline-array of reference types.

### Unknown

Is the `size` of a dynamic struct:
- size assuming the dynamic array has 0 elements (I think it's this)
- size assuming the dynamic array doesn't

These can differ by padding for alignment.


## How To Create GOAL Objects - `new`

GOAL has several different ways to create objects, all using the `new` form.

### Heap Allocated Objects

A new object can be allocated on a heap with `(new 'global 'obj-type [new-method-arguments])`.
This simply calls the `new` method of the given type. You can also replace `'global` with `'debug` to allocate on the debug heap.
Currently these are the only two heaps supported, in the future you will be able to call the new method with other arguments
to allow you to do an "in place new" or allocate on a different heap.

This will only work on structures and basics. If you want a heap allocated float/integer/pointer, create an array of size 1.
This will work on dynamically sized items.

### Heap Allocated Arrays

You can construct a heap array with `(new 'global 'inline-array 'obj-type count)` or `(new 'global 'array 'obj-type count)`.
These objects are not initialized. Note that the `array` version creates a `(pointer obj-type)` plain array,
__not__ a GOAL `array` type fancy array.  In the future this may change because it is confusing.

Because these objects are uninitialized, you cannot provide constructor arguments.
You cannot use this on dynamically sized member types. However, the array size can be determined at runtime.

### Static Objects

You can create a static object with `(new 'static 'obj-type [field-def]...)`. It can be a structure, basic, bitfield, array, boxed array, or inline array.
Each field def looks like `:field-name field-value`. The `field-value` is evaluated at compile time. Fields
can be integers, floats, symbols, pairs, strings, or other statics. These field values may come from macros or GOAL constants.

For bitfields, there is an exception, and fields can be set to expression that are not known at compile time.  The compiler will generate the appropriate code to combine the values known at compile time and run time. This exception does not apply to a bitfield inside of another `(new 'static ...)`.

Fields which aren't explicitly initialized are zeroed, except for the type field of basics, which is properly initialized to the correct type.

This does not work on dynamically sized structures.

### Stack Allocated Arrays

Currently only arrays of integers, floats, or pointers can be stack allocated.
For example, use `(new 'stack ''array 'int32 1)` to get a `(pointer int32)`. Unlike heap allocated arrays, these stack arrays
must have a size that can be determined at compile time.  The objects are uninitialized.

### Stack Allocated Structures

Works like heap allocated, the objects are initialized with the constructor. The constructor must support "stack mode". Using `object-new` supports stack mode so usually you don't have to worry about this.  The structure's memory will be memset to 0 with `object-new` automatically.

### Defining a `new` Method

TODO

## Array Spacing

In general, all GOAL objects are 16-byte aligned and the boxing system requires this.  All heap memory allocations are 16-byte aligned too, so this is usually not an issue.

## Truth

Everything is true except for `#f`. This means `0` is true, and `'()` is true.
The value of `#f` can be used like `nullptr`, at least for any `basic` object.  It's unclear if `#f` can/should be used as a null for other types, including `structure`s or numbers or pointers.

Technical note: the hex number `0x147d24` is considered false in Jak 1 NTSC due to where the symbol table happened to be allocated.  However, checking numbers for true/false shouldn't be done, you should use `(zero? x)` instead.

## Empty Pair

TODO