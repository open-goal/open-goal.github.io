"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[529],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return m}});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),d=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},c=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),f=d(a),m=i,p=f["".concat(s,".").concat(m)]||f[m]||h[m]||o;return a?n.createElement(p,l(l({ref:t},c),{},{components:a})):n.createElement(p,l({ref:t},c))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=a.length,l=new Array(o);l[0]=f;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:i,l[1]=r;for(var d=2;d<o;d++)l[d]=a[d];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}f.displayName="MDXCreateElement"},68912:function(e,t,a){a.r(t),a.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return r},metadata:function(){return d},toc:function(){return h}});var n=a(87462),i=a(63366),o=(a(67294),a(3905)),l=["components"],r={sidebar_position:7},s="Object File Formats",d={unversionedId:"reference/object_file_formats",id:"reference/object_file_formats",title:"Object File Formats",description:"CGO/DGO Files",source:"@site/documentation/reference/object_file_formats.md",sourceDirName:"reference",slug:"/reference/object_file_formats",permalink:"/docs/reference/object_file_formats",draft:!1,editUrl:"https://github.com/open-goal/open-goal.github.io/tree/master/documentation/reference/object_file_formats.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"docsSidebar",previous:{title:"GOOS",permalink:"/docs/reference/goos"},next:{title:"Process and State",permalink:"/docs/reference/process_and_state"}},c={},h=[{value:"CGO/DGO Files",id:"cgodgo-files",level:2},{value:"The V3 format",id:"the-v3-format",level:3},{value:"The V4 format",id:"the-v4-format",level:3},{value:"The Plan",id:"the-plan",level:3},{value:"CGO files",id:"cgo-files",level:3},{value:"CGO/DGO Loading Process",id:"cgodgo-loading-process",level:3},{value:"V3 max size",id:"v3-max-size",level:4}],f={toc:h};function m(e){var t=e.components,a=(0,i.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},f,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"object-file-formats"},"Object File Formats"),(0,o.kt)("h2",{id:"cgodgo-files"},"CGO/DGO Files"),(0,o.kt)("p",null,"The CGO/DGO file format is exactly the same - the only difference is the name of the file.  The DGO name indicates that the file contains all the data for a level. The engine will load these files into a level heap, which can then be cleared and replaced with a different level."),(0,o.kt)("p",null,"I suspect that the DGO file name came first, as a package containing all the data in the level which can be loaded very quickly.  Names in the code all say ",(0,o.kt)("inlineCode",{parentName:"p"},"dgo"),", and the ",(0,o.kt)("inlineCode",{parentName:"p"},"MakeFileName")," system shows that both CGO and DGO files are stored in the ",(0,o.kt)("inlineCode",{parentName:"p"},"game/dgo")," folder.  Probably the engine and kernel were packed into a CGO file after the file format was created for loading levels."),(0,o.kt)("p",null,"Each CGO/DGO file contains a bunch of individual object files.  Each file has a name.  There are some duplicate names - sometimes the two files with the same names are very different (example, code for an enemy, art for an enemy), and other times they are very similar (tiny differences in code/data). The files come in two versions, v4 and v3, and both CGOs and DGOs contain both versions.  If an object file has code in it, it is always a v3.  It is possible to have a v3 file with just data, but usually the data is pretty small. The v4 files tend to have a lot of data in them.  My theory is that the compiler creates v3 files out of GOAL source code files, and that other tools for creating things like textures/levels/art-groups generate v4 objects.  There are a number of optimizations in the loading process for v4 objects that are better suited for larger files.  To stay at 60 fps always, a v3 object must be smaller than around 750 kB. A v4 object does not have this limitation."),(0,o.kt)("h3",{id:"the-v3-format"},"The V3 format"),(0,o.kt)("p",null,"The v3 format is divided into three segments:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Main: this contains all of the functions/data that will be used by the game."),(0,o.kt)("li",{parentName:"ol"},"Debug: this is only loaded in debug mode, and is always stored on a separate ",(0,o.kt)("inlineCode",{parentName:"li"},"kdebugheap"),"."),(0,o.kt)("li",{parentName:"ol"},"Top Level: this contains some initialization code to add functions/variables to the symbol table, and any user-written initialization.  It runs once, immediately after the object is loaded, then is thrown away.")),(0,o.kt)("p",null,"Each segment also has linking data, which tells the linker how to link references to symbols, types, and memory (possibly in a different segment)."),(0,o.kt)("p",null,"This format will be different between the PC and PS2 versions, as linking data for x86-64 will need to look different from MIPS."),(0,o.kt)("p",null,"Each segment can contain functions and data. The top-level segment must start with a function which will be run to initialize the object.  All the data here goes through the GOAL compiler and type system."),(0,o.kt)("h3",{id:"the-v4-format"},"The V4 format"),(0,o.kt)("p",null,"The V4 format contains just data. Like v3, the data is GOAL objects, but was probably generated by a tool that wasn't the compiler. A V4 object has no segments, but must start with a ",(0,o.kt)("inlineCode",{parentName:"p"},"basic")," object.  After being linked, the ",(0,o.kt)("inlineCode",{parentName:"p"},"relocate")," method of this ",(0,o.kt)("inlineCode",{parentName:"p"},"basic")," will be called, which should do any additional linking required for the specific object."),(0,o.kt)("p",null,"Because this is just data, there's no reason for the PC version to change this format. This means we can also check the"),(0,o.kt)("p",null,"Note: you may see references to v2 format in the code. I believe v4 format is identical to v2, except the linking data is stored at the end, to enable a \"don't copy the last object\" optimization. The game's code uses the ",(0,o.kt)("inlineCode",{parentName:"p"},"work_v2")," function on v4 objects as a result, and some of my comments may refer to v2, when I really mean v4.  I believe there are no v2 objects in any games."),(0,o.kt)("h3",{id:"the-plan"},"The Plan"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Create a library for generating obj files in V3/V4 format",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"V4 should match game exactly. Doesn't support code."),(0,o.kt)("li",{parentName:"ul"},"V3 is our own thing. Must support code.")))),(0,o.kt)("p",null,"We'll eventually create tools which use the library in V4 mode to generate object files for rebuilding levels and textures.  We may need to wait until more about these formats is understood before trying this."),(0,o.kt)("p",null,"The compiler will use the library in V3 mode to generate object files for each ",(0,o.kt)("inlineCode",{parentName:"p"},"gc")," (GOAL source code) file."),(0,o.kt)("h3",{id:"cgo-files"},"CGO files"),(0,o.kt)("p",null,"The only CGO files read are ",(0,o.kt)("inlineCode",{parentName:"p"},"KERNEL.CGO")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"GAME.CGO"),"."),(0,o.kt)("p",null," The ",(0,o.kt)("inlineCode",{parentName:"p"},"KERNEL.CGO")," file contains the GOAL kernel and some very basic libraries (",(0,o.kt)("inlineCode",{parentName:"p"},"gcommon"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"gstring"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"gstate"),", ...). I believe that ",(0,o.kt)("inlineCode",{parentName:"p"},"KERNEL")," was always loaded on boot during development, as its required for the Listener to function."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"GAME.CGO")," file combines the contents of the ",(0,o.kt)("inlineCode",{parentName:"p"},"ENGINE"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"COMMON")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"ART")," CGO files.  ",(0,o.kt)("inlineCode",{parentName:"p"},"ENGINE")," contains the game engine code, ",(0,o.kt)("inlineCode",{parentName:"p"},"COMMON")," contains level-specific code (outside of the game engine) that is always loaded.  If code is used in basically all the levels, it makes sense to put in in ",(0,o.kt)("inlineCode",{parentName:"p"},"COMMON"),", so it doesn't have to be loaded for each currently active level.  The ",(0,o.kt)("inlineCode",{parentName:"p"},"ART")," CGO contains common art/textures/models, like Jak and his animations."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"JUNGLE.CGO"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"MAINCAVE.CGO"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"SUNKEN.CGO")," file contains some copies of files used in the jungle, cave, LPC levels. Some are a tiny bit different. I believe it is unused."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"L1.CGO")," file contains basically all the level-specific code/Jak animations and some textures.  It doesn't seem to contain any 3D models.  It's unused, but I'm still interested in understanding its format, as the Jak 1 demos have this file."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"RACERP.CGO")," file contains (I think) everything needed for the Zoomer. Unused. The same data appears in the levels as needed, maybe with some slight differences."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"VILLAGEP.CGO")," file contains common code shared in village levels, which isn't much (oracle, warp gate). Unused. The same data appears in the levels as needed."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"WATER-AN.CGO")," file contains some small code/data for water animations. Unused. The same data appears in the levels as needed."),(0,o.kt)("h3",{id:"cgodgo-loading-process"},"CGO/DGO Loading Process"),(0,o.kt)("p",null,'A CGO/DGO file is loaded onto a "heap", which is just a chunk of contiguous memory.  The loading process is designed to be fast, and also able to fill the entire heap, and allow each object to allocate memory after it is loaded.  The process works like this:'),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Two temporary buffers are allocated at the end of the heap. These are sized so that they can fit the largest object file, not including the last object file."),(0,o.kt)("li",{parentName:"ol"},"The IOP begins loading, and is permitted to load the first two object files to the two temporary buffers"),(0,o.kt)("li",{parentName:"ol"},"The main CPU waits for the first object file to be loaded."),(0,o.kt)("li",{parentName:"ol"},'While the second object file being loaded, the first object is "linked". The first step to linking is to copy the object file data from the temporary buffer to the bottom of the heap, kicking out all the other data in the process. The linking data is checked to see if it is in the top of the heap, and is moved there if it isn\'t already. The run-once initialization code is copied to another temporary allocation on top of the heap and the debug data is copied to the debug heap.'),(0,o.kt)("li",{parentName:"ol"},"Still, while the second object file is being loaded, the linker runs on the first object file."),(0,o.kt)("li",{parentName:"ol"},"Still, while the second object file is being loaded, the second object's initialization code is run (located in top of the heap). The second object may allocate from this heap, and will get valid memory without creating gaps in the heap."),(0,o.kt)("li",{parentName:"ol"},"Memory allocated from the top during linking is freed."),(0,o.kt)("li",{parentName:"ol"},"The IOP is allowed to load into the first buffer again."),(0,o.kt)("li",{parentName:"ol"},"The main CPU waits for the second object to be loaded, if the IOP hasn't finished yet."),(0,o.kt)("li",{parentName:"ol"},"This double-buffering pattern continues - while one object is loaded into a buffer, the other one will be copied to the bottom of the heap, linked, and initialized. When the second to last object is loaded, the IOP will wait an extra time until the main CPU has finished linking it until loading the last object (one additional wait) because the last object has a special case."),(0,o.kt)("li",{parentName:"ol"},"The last object will be loaded directly onto the bottom of the heap, as there may not be enough memory to use the temporary buffers and load the last object. The temporary buffers are freed."),(0,o.kt)("li",{parentName:"ol"},"If the last object is a v3, its linking data will be moved to the top-level, and the object data will be moved to fill in the gap left behind. If the last object is a v2, the main data will be at the beginning of the object data, so there is an optimization that will avoid copying the object data to save time, if the data is already close to being in the right place.")),(0,o.kt)("p",null,"Generally the last file in a level DGO will be the largest v4 object.  You can only have one file larger than a temporary buffer, and it must come last. The last file also doesn't have to be copied after being loaded into memory if it is a v4."),(0,o.kt)("h4",{id:"v3-max-size"},"V3 max size"),(0,o.kt)("p",null,"A V3 object is copied all at once with a single ",(0,o.kt)("inlineCode",{parentName:"p"},"ultimate-memcpy"),".  Usually linking gets to run for around 3 to 5% of a total frame. The ",(0,o.kt)("inlineCode",{parentName:"p"},"ultimate-memcpy")," routine does a to/from scratchpad transfer. In practice, mem/spr transfers are around 1800 MB/sec, and the data has to be copied twice, so the effective bandwidth is 900 MB/sec."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"900 MB / second * (0.04 * 0.0167 seconds) = 601 kilobytes")),(0,o.kt)("p",null,"This estimate is backed up by the the chunk size of the v4 copy routine, which copies one chunk per frame.  It picks 524 kB as the maximum amount that's safe to copy per frame."))}m.isMDXComponent=!0}}]);