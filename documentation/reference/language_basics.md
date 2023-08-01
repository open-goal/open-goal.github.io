---
sidebar_position: 0
description: Basic overview of the language's main features and abilities
---

# Language basics

OpenGOAL is a compiled language. Source code is stored in `.gc` files. Each `.gc` file is compiled into a `.o` file. These `.o` files are then loaded by the game. When they are loaded, it has the effect of running every "top level" expression in the file. Usually these are function, type, and method declarations, but you can also use this for initialization code. For example, it is common to first define types, functions, and methods, then set up global instances.

There are effectively three different "languages":

1. **OpenGOAL** - the normal compiled language.
2. **OpenGOAL compiler commands** - simple commands to run the compiler, listener, and debugger. These run in the compiler only.
3. **GOOS** macro language. This is used in OpenGOAL macros and runs at compile-time. These macros generate OpenGOAL compiler commands or OpenGOAL source which is then processed. These run in the compiler only.

The OpenGOAL language uses a LISP syntax, but on the inside is closer to C or C++. There is no protection against use-after-free or other common pointer bugs.

Unlike a C/C++ compiler, the OpenGOAL compiler has a state. It remembers functions/methods/types/macros/constants/enums/etc defined in previous files.

TODO
