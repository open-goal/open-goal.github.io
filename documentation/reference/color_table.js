import React from 'react';

// \s*;;.*\s+\(new 'static 'char-color\s+:color\s+\(new 'static 'array rgba 4\s+\(static-rgba #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2})\)\s+\(static-rgba #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2})\)\s+\(static-rgba #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2})\)\s+\(static-rgba #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2}) #x([0-9a-fA-F]{2})\)\s+\)\s+\)
//     { 'name': "default", 'colors': [ 0x$1$2$3$4, 0x$5$6$7$8, 0x$9$10$11$12, 0x$13$14$15$16 ] },\n
const colorTables = {
  'jak1': [
    { 'name': "default",                'colors': [ 0x70787080, 0x70787080, 0x30383080, 0x30383080] },
    { 'name': "white",                  'colors': [ 0x80808080, 0x80808080, 0x60606080, 0x60606080 ] },
    { 'name': "transparent",            'colors': [ 0x80808040, 0x80808040, 0x60606040, 0x60606040 ] },
    { 'name': "red",                    'colors': [ 0x80602080, 0x80602080, 0x60000080, 0x60000080 ] },
    { 'name': "orange",                 'colors': [ 0x80640080, 0x80640080, 0x80000080, 0x80000080 ] },
    { 'name': "yellow",                 'colors': [ 0x80800080, 0x80800080, 0x28280080, 0x28280080 ] },
    { 'name': "green",                  'colors': [ 0x20802080, 0x20802080, 0x00300080, 0x00300080 ] },
    { 'name': "blue",                   'colors': [ 0x40408080, 0x40408080, 0x00006080, 0x00006080 ] },
    { 'name': "cyan",                   'colors': [ 0x00808080, 0x00808080, 0x00205080, 0x00205080 ] },
    { 'name': "pink",                   'colors': [ 0x80408080, 0x80408080, 0x30003080, 0x30003080 ] },
    { 'name': "menu-selected",          'colors': [ 0x60808080, 0x60808080, 0x00406080, 0x00406080 ] },
    { 'name': "menu-selected-parent",   'colors': [ 0x40606080, 0x40606080, 0x00204080, 0x00204080 ] },
    { 'name': "menu",                   'colors': [ 0x80808080, 0x80808080, 0x50505080, 0x50505080 ] },
    { 'name': "menu-parent",            'colors': [ 0x50505080, 0x50505080, 0x28282880, 0x28282880 ] },
    { 'name': "menu-func-bad",          'colors': [ 0x80540080, 0x80540080, 0x60000080, 0x60000080 ] },
    { 'name': "menu-flag-on",           'colors': [ 0x70803080, 0x70803080, 0x00600080, 0x00600080 ] },
    { 'name': "menu-flag-on-parent",    'colors': [ 0x48580880, 0x48581080, 0x00380080, 0x00380080 ] },
    { 'name': "menu-flag-off",          'colors': [ 0x58605880, 0x58605880, 0x30403080, 0x30403080 ] },
    { 'name': "menu-flag-off-parent",   'colors': [ 0x40484080, 0x40484080, 0x18281880, 0x18281880 ] },
    { 'name': "menu-invalid",           'colors': [ 0x30203080, 0x30203080, 0x30203080, 0x30203080 ] },
    { 'name': "flat-yellow",            'colors': [ 0x80794880, 0x80794880, 0x80794880, 0x80794880 ] },
    { 'name': "progress-memcard",       'colors': [ 0x205e7880, 0x205e7880, 0x807d4f80, 0x807d4f80 ] },
    { 'name': "pad-back",               'colors': [ 0x1d1d1d80, 0x1d1d1d80, 0x1d1d1d80, 0x1d1d1d80 ] },
    { 'name': "pad-shine",              'colors': [ 0x40404080, 0x40404080, 0x40404080, 0x40404080 ] },
    { 'name': "pad-square",             'colors': [ 0x7a4d6580, 0x7a4d6580, 0x7a4d6580, 0x7a4d6580 ] },
    { 'name': "pad-circle",             'colors': [ 0x7a343480, 0x7a343480, 0x7a343480, 0x7a343480 ] },
    { 'name': "pad-triangle",           'colors': [ 0x10654c80, 0x10654c80, 0x10654c80, 0x10654c80 ] },
    { 'name': "pad-x",                  'colors': [ 0x464a7880, 0x464a7880, 0x464a7880, 0x464a7880 ] },
    { 'name': "progress-blue",          'colors': [ 0x577e8080, 0x577e8080, 0x29637980, 0x29637080 ] },
    { 'name': "progress-yellow",        'colors': [ 0x7f7b3380, 0x7f7b3380, 0x76401480, 0x76401480 ] },
    { 'name': "progress-selected",      'colors': [ 0x79790280, 0x79790280, 0x1b512080, 0x1b512080 ] },
    { 'name': "progress-percent",       'colors': [ 0x47687a80, 0x47687a80, 0x003c4f80, 0x003c4f80 ] },
    { 'name': "credits",                'colors': [ 0x70787080, 0x70787080, 0x30383080, 0x30383080 ] },
    { 'name': "red-reverse",            'colors': [ 0x60000080, 0x60000080, 0x80602080, 0x80602080 ] },
    { 'name': "red-obverse",            'colors': [ 0x80602080, 0x80602080, 0x60000080, 0x60000080 ] }
  ],
  'jak2': [
    { 'name': "default",                    'colors': [ 0x70787080, 0x70787080, 0x70787080, 0x70787080 ] },
    { 'name': "white",                      'colors': [ 0x80808080, 0x80808080, 0x80808080, 0x80808080 ] },
    { 'name': "transparent",                'colors': [ 0x80808040, 0x80808040, 0x80808040, 0x80808040 ] },
    { 'name': "red",                        'colors': [ 0x80200080, 0x80200080, 0x80200080, 0x80200080 ] },
    { 'name': "orange",                     'colors': [ 0x80640080, 0x80640080, 0x80640080, 0x80640080 ] },
    { 'name': "yellow",                     'colors': [ 0x80800080, 0x80800080, 0x80800080, 0x80800080 ] },
    { 'name': "green",                      'colors': [ 0x20802080, 0x20802080, 0x20802080, 0x20802080 ] },
    { 'name': "blue",                       'colors': [ 0x00208080, 0x00208080, 0x00208080, 0x00208080 ] },
    { 'name': "cyan",                       'colors': [ 0x00808080, 0x00808080, 0x00808080, 0x00808080 ] },
    { 'name': "pink",                       'colors': [ 0x80408080, 0x80408080, 0x80408080, 0x80408080 ] },
    { 'name': "menu-selected",              'colors': [ 0x60808080, 0x60808080, 0x60808080, 0x60808080 ] },
    { 'name': "menu-selected-parent",       'colors': [ 0x40606080, 0x40606080, 0x40606080, 0x40606080 ] },
    { 'name': "menu",                       'colors': [ 0x80808080, 0x80808080, 0x80808080, 0x80808080 ] },
    { 'name': "menu-parent",                'colors': [ 0x50505080, 0x50505080, 0x50505080, 0x50505080 ] },
    { 'name': "menu-func-bad",              'colors': [ 0x80540080, 0x80540080, 0x80540080, 0x80540080 ] },
    { 'name': "menu-flag-on",               'colors': [ 0x70803080, 0x70803080, 0x70803080, 0x70803080 ] },
    { 'name': "menu-flag-on-parent",        'colors': [ 0x48581080, 0x48581080, 0x48581080, 0x48581080 ] },
    { 'name': "menu-flag-off",              'colors': [ 0x58605880, 0x58605880, 0x58605880, 0x58605880 ] },
    { 'name': "menu-flag-off-parent",       'colors': [ 0x40484080, 0x40484080, 0x40484080, 0x40484080 ] },
    { 'name': "menu-invalid",               'colors': [ 0x30203080, 0x30203080, 0x30203080, 0x30203080 ] },
    { 'name': "flat-yellow",                'colors': [ 0x80794880, 0x80794880, 0x80794880, 0x80794880 ] },
    { 'name': "font-color-21",              'colors': [ 0x205e7880, 0x205e7880, 0x205e7880, 0x205e7880 ] },
    { 'name': "pad-back",                   'colors': [ 0x1d1d1d80, 0x1d1d1d80, 0x1d1d1d80, 0x1d1d1d80 ] },
    { 'name': "pad-shine",                  'colors': [ 0x40404080, 0x40404080, 0x40404080, 0x40404080 ] },
    { 'name': "pad-square",                 'colors': [ 0x7a4d6580, 0x7a4d6580, 0x7a4d6580, 0x7a4d6580 ] },
    { 'name': "pad-circle",                 'colors': [ 0x7a343480, 0x7a343480, 0x7a343480, 0x7a343480 ] },
    { 'name': "pad-triangle",               'colors': [ 0x10654c80, 0x10654c80, 0x10654c80, 0x10654c80 ] },
    { 'name': "pad-x",                      'colors': [ 0x464a7880, 0x464a7880, 0x464a7880, 0x464a7880 ] },
    { 'name': "progress-old-blue",          'colors': [ 0x577e8080, 0x577e8080, 0x577e8080, 0x577e8080 ] },
    { 'name': "progress-old-yellow",        'colors': [ 0x7f7b3380, 0x7f7b3380, 0x7f7b3380, 0x7f7b3380 ] },
    { 'name': "progress-old-selected",      'colors': [ 0x79790280, 0x79790280, 0x79790280, 0x79790280 ] },
    { 'name': "progress-old-percent",       'colors': [ 0x47687a80, 0x47687a80, 0x47687a80, 0x47687a80 ] },
    { 'name': "progress",                   'colors': [ 0x40808080, 0x40808080, 0x40808080, 0x40808080 ] },
    { 'name': "progress-selected",          'colors': [ 0x40808080, 0x40808080, 0x40808080, 0x40808080 ] },
    { 'name': "progress-force-selected",    'colors': [ 0x80808080, 0x80808080, 0x80808080, 0x80808080 ] },
    { 'name': "progress-option-off",        'colors': [ 0x20404060, 0x20404060, 0x20404060, 0x20404060 ] },
    { 'name': "font-color-36",              'colors': [ 0x70787080, 0x70787080, 0x70787080, 0x70787080 ] },
    { 'name': "credits-staff-title1",       'colors': [ 0x60000080, 0x60000080, 0x60000080, 0x60000080 ] },
    { 'name': "credits-staff-title2",       'colors': [ 0x80602080, 0x80602080, 0x80602080, 0x80602080 ] },
    { 'name': "font-color-39",              'colors': [ 0x00000180, 0x00000180, 0x00000180, 0x00000180 ] }
  ]
}

function jakRgbaToCssRgba(val) {
  var a = (val >>> 0) & 0xFF,
      b = (val >>> 8) & 0xFF,
      g = (val >>> 16) & 0xFF,
      r = (val >>> 24) & 0xFF;
  a = a / 128;
  b = Math.floor(b * 2 * a);
  g = Math.floor(g * 2 * a);
  r = Math.floor(r * 2 * a);
  return "rgba(" + [r, g, b, 1].join(",") + ")";
}

export default function ColorTable({game}) {
  return(<div class="language-table container">
  <tr><th>Index</th><th>Name</th><th>Color</th></tr>
  { colorTables[game].map( (color, index) => {
    return(<tr><td>{index}</td>
               <td><code>{color.name}</code></td>
               <td class="no-pad jak-4vert-font-color" style={{"--color1": jakRgbaToCssRgba(color.colors[0]),
                                                               "--color2": jakRgbaToCssRgba(color.colors[1]),
                                                               "--color3": jakRgbaToCssRgba(color.colors[2]),
                                                               "--color4": jakRgbaToCssRgba(color.colors[3])
                                                               }}></td>
               </tr>)
    }) }
  </div>)
}

