(self.webpackJsonp=self.webpackJsonp||[]).push([[0],{"./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: '//',\r\n        blockComment: ['/*', '*/'],\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '[', close: ']' },\r\n        { open: '{', close: '}' },\r\n        { open: '(', close: ')' },\r\n        { open: '\\'', close: '\\'', notIn: ['string', 'comment'] },\r\n        { open: '\"', close: '\"', notIn: ['string'] },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' },\r\n    ],\r\n    folding: {\r\n        markers: {\r\n            start: new RegExp(\"^\\\\s*#pragma\\\\s+region\\\\b\"),\r\n            end: new RegExp(\"^\\\\s*#pragma\\\\s+endregion\\\\b\")\r\n        }\r\n    }\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '.cpp',\r\n    brackets: [\r\n        { token: 'delimiter.curly', open: '{', close: '}' },\r\n        { token: 'delimiter.parenthesis', open: '(', close: ')' },\r\n        { token: 'delimiter.square', open: '[', close: ']' },\r\n        { token: 'delimiter.angle', open: '<', close: '>' }\r\n    ],\r\n    keywords: [\r\n        'abstract',\r\n        'amp',\r\n        'array',\r\n        'auto',\r\n        'bool',\r\n        'break',\r\n        'case',\r\n        'catch',\r\n        'char',\r\n        'class',\r\n        'const',\r\n        'constexpr',\r\n        'const_cast',\r\n        'continue',\r\n        'cpu',\r\n        'decltype',\r\n        'default',\r\n        'delegate',\r\n        'delete',\r\n        'do',\r\n        'double',\r\n        'dynamic_cast',\r\n        'each',\r\n        'else',\r\n        'enum',\r\n        'event',\r\n        'explicit',\r\n        'export',\r\n        'extern',\r\n        'false',\r\n        'final',\r\n        'finally',\r\n        'float',\r\n        'for',\r\n        'friend',\r\n        'gcnew',\r\n        'generic',\r\n        'goto',\r\n        'if',\r\n        'in',\r\n        'initonly',\r\n        'inline',\r\n        'int',\r\n        'interface',\r\n        'interior_ptr',\r\n        'internal',\r\n        'literal',\r\n        'long',\r\n        'mutable',\r\n        'namespace',\r\n        'new',\r\n        'noexcept',\r\n        'nullptr',\r\n        '__nullptr',\r\n        'operator',\r\n        'override',\r\n        'partial',\r\n        'pascal',\r\n        'pin_ptr',\r\n        'private',\r\n        'property',\r\n        'protected',\r\n        'public',\r\n        'ref',\r\n        'register',\r\n        'reinterpret_cast',\r\n        'restrict',\r\n        'return',\r\n        'safe_cast',\r\n        'sealed',\r\n        'short',\r\n        'signed',\r\n        'sizeof',\r\n        'static',\r\n        'static_assert',\r\n        'static_cast',\r\n        'struct',\r\n        'switch',\r\n        'template',\r\n        'this',\r\n        'thread_local',\r\n        'throw',\r\n        'tile_static',\r\n        'true',\r\n        'try',\r\n        'typedef',\r\n        'typeid',\r\n        'typename',\r\n        'union',\r\n        'unsigned',\r\n        'using',\r\n        'virtual',\r\n        'void',\r\n        'volatile',\r\n        'wchar_t',\r\n        'where',\r\n        'while',\r\n        '_asm',\r\n        '_based',\r\n        '_cdecl',\r\n        '_declspec',\r\n        '_fastcall',\r\n        '_if_exists',\r\n        '_if_not_exists',\r\n        '_inline',\r\n        '_multiple_inheritance',\r\n        '_pascal',\r\n        '_single_inheritance',\r\n        '_stdcall',\r\n        '_virtual_inheritance',\r\n        '_w64',\r\n        '__abstract',\r\n        '__alignof',\r\n        '__asm',\r\n        '__assume',\r\n        '__based',\r\n        '__box',\r\n        '__builtin_alignof',\r\n        '__cdecl',\r\n        '__clrcall',\r\n        '__declspec',\r\n        '__delegate',\r\n        '__event',\r\n        '__except',\r\n        '__fastcall',\r\n        '__finally',\r\n        '__forceinline',\r\n        '__gc',\r\n        '__hook',\r\n        '__identifier',\r\n        '__if_exists',\r\n        '__if_not_exists',\r\n        '__inline',\r\n        '__int128',\r\n        '__int16',\r\n        '__int32',\r\n        '__int64',\r\n        '__int8',\r\n        '__interface',\r\n        '__leave',\r\n        '__m128',\r\n        '__m128d',\r\n        '__m128i',\r\n        '__m256',\r\n        '__m256d',\r\n        '__m256i',\r\n        '__m64',\r\n        '__multiple_inheritance',\r\n        '__newslot',\r\n        '__nogc',\r\n        '__noop',\r\n        '__nounwind',\r\n        '__novtordisp',\r\n        '__pascal',\r\n        '__pin',\r\n        '__pragma',\r\n        '__property',\r\n        '__ptr32',\r\n        '__ptr64',\r\n        '__raise',\r\n        '__restrict',\r\n        '__resume',\r\n        '__sealed',\r\n        '__single_inheritance',\r\n        '__stdcall',\r\n        '__super',\r\n        '__thiscall',\r\n        '__try',\r\n        '__try_cast',\r\n        '__typeof',\r\n        '__unaligned',\r\n        '__unhook',\r\n        '__uuidof',\r\n        '__value',\r\n        '__virtual_inheritance',\r\n        '__w64',\r\n        '__wchar_t'\r\n    ],\r\n    operators: [\r\n        '=', '>', '<', '!', '~', '?', ':',\r\n        '==', '<=', '>=', '!=', '&&', '||', '++', '--',\r\n        '+', '-', '*', '/', '&', '|', '^', '%', '<<',\r\n        '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',\r\n        '^=', '%=', '<<=', '>>=', '>>>='\r\n    ],\r\n    // we include these common regular expressions\r\n    symbols: /[=><!~?:&|+\\-*\\/\\^%]+/,\r\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\r\n    integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,\r\n    floatsuffix: /[fFlL]?/,\r\n    encoding: /u|u8|U|L/,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        root: [\r\n            // C++ 11 Raw String\r\n            [/@encoding?R\\\"(?:([^ ()\\\\\\t]*))\\(/, { token: 'string.raw.begin', next: '@raw.$1' }],\r\n            // identifiers and keywords\r\n            [/[a-zA-Z_]\\w*/, {\r\n                    cases: {\r\n                        '@keywords': { token: 'keyword.$0' },\r\n                        '@default': 'identifier'\r\n                    }\r\n                }],\r\n            // whitespace\r\n            { include: '@whitespace' },\r\n            // [[ attributes ]].\r\n            [/\\[\\[.*\\]\\]/, 'annotation'],\r\n            [/^\\s*#include/, { token: 'keyword.directive.include', next: '@include' }],\r\n            // Preprocessor directive\r\n            [/^\\s*#\\s*\\w+/, 'keyword'],\r\n            // delimiters and operators\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [/[<>](?!@symbols)/, '@brackets'],\r\n            [/@symbols/, {\r\n                    cases: {\r\n                        '@operators': 'delimiter',\r\n                        '@default': ''\r\n                    }\r\n                }],\r\n            // numbers\r\n            [/\\d*\\d+[eE]([\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\r\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\r\n            [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'],\r\n            [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'],\r\n            [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'],\r\n            [/\\d[\\d']*\\d(@integersuffix)/, 'number'],\r\n            [/\\d(@integersuffix)/, 'number'],\r\n            // delimiter: after number because of .\\d floats\r\n            [/[;,.]/, 'delimiter'],\r\n            // strings\r\n            [/\"([^\"\\\\]|\\\\.)*$/, 'string.invalid'],\r\n            [/\"/, 'string', '@string'],\r\n            // characters\r\n            [/'[^\\\\']'/, 'string'],\r\n            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],\r\n            [/'/, 'string.invalid']\r\n        ],\r\n        whitespace: [\r\n            [/[ \\t\\r\\n]+/, ''],\r\n            [/\\/\\*\\*(?!\\/)/, 'comment.doc', '@doccomment'],\r\n            [/\\/\\*/, 'comment', '@comment'],\r\n            [/\\/\\/.*$/, 'comment'],\r\n        ],\r\n        comment: [\r\n            [/[^\\/*]+/, 'comment'],\r\n            [/\\*\\//, 'comment', '@pop'],\r\n            [/[\\/*]/, 'comment']\r\n        ],\r\n        //Identical copy of comment above, except for the addition of .doc\r\n        doccomment: [\r\n            [/[^\\/*]+/, 'comment.doc'],\r\n            [/\\*\\//, 'comment.doc', '@pop'],\r\n            [/[\\/*]/, 'comment.doc']\r\n        ],\r\n        string: [\r\n            [/[^\\\\\"]+/, 'string'],\r\n            [/@escapes/, 'string.escape'],\r\n            [/\\\\./, 'string.escape.invalid'],\r\n            [/\"/, 'string', '@pop']\r\n        ],\r\n        raw: [\r\n            [/(.*)(\\))(?:([^ ()\\\\\\t]*))(\\\")/, {\r\n                    cases: {\r\n                        '$3==$S2': ['string.raw', 'string.raw.end', 'string.raw.end', { token: 'string.raw.end', next: '@pop' }],\r\n                        '@default': ['string.raw', 'string.raw', 'string.raw', 'string.raw']\r\n                    }\r\n                }\r\n            ],\r\n            [/.*/, 'string.raw']\r\n        ],\r\n        include: [\r\n            [/(\\s*)(<)([^<>]*)(>)/, ['', 'keyword.directive.include.begin', 'string.include.identifier', { token: 'keyword.directive.include.end', next: '@pop' }]],\r\n            [/(\\s*)(\")([^\"]*)(\")/, ['', 'keyword.directive.include.begin', 'string.include.identifier', { token: 'keyword.directive.include.end', next: '@pop' }]]\r\n        ]\r\n    },\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.js?")}}]);