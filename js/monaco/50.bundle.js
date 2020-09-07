(self.webpackJsonp=self.webpackJsonp||[]).push([[50],{"./node_modules/monaco-editor/esm/vs/basic-languages/scheme/scheme.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: ';',\r\n        blockComment: ['#|', '|#'],\r\n    },\r\n    brackets: [['(', ')'], ['{', '}'], ['[', ']']],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n    ],\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    ignoreCase: true,\r\n    tokenPostfix: '.scheme',\r\n    brackets: [\r\n        { open: '(', close: ')', token: 'delimiter.parenthesis' },\r\n        { open: '{', close: '}', token: 'delimiter.curly' },\r\n        { open: '[', close: ']', token: 'delimiter.square' },\r\n    ],\r\n    keywords: [\r\n        'case',\r\n        'do',\r\n        'let',\r\n        'loop',\r\n        'if',\r\n        'else',\r\n        'when',\r\n        'cons',\r\n        'car',\r\n        'cdr',\r\n        'cond',\r\n        'lambda',\r\n        'lambda*',\r\n        'syntax-rules',\r\n        'format',\r\n        'set!',\r\n        'quote',\r\n        'eval',\r\n        'append',\r\n        'list',\r\n        'list?',\r\n        'member?',\r\n        'load',\r\n    ],\r\n    constants: ['#t', '#f'],\r\n    operators: ['eq?', 'eqv?', 'equal?', 'and', 'or', 'not', 'null?'],\r\n    tokenizer: {\r\n        root: [\r\n            [/#[xXoObB][0-9a-fA-F]+/, 'number.hex'],\r\n            [/[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?/, 'number.float'],\r\n            [\r\n                /(?:\\b(?:(define|define-syntax|define-macro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)/,\r\n                ['keyword', 'white', 'variable'],\r\n            ],\r\n            { include: '@whitespace' },\r\n            { include: '@strings' },\r\n            [\r\n                /[a-zA-Z_#][a-zA-Z0-9_\\-\\?\\!\\*]*/,\r\n                {\r\n                    cases: {\r\n                        '@keywords': 'keyword',\r\n                        '@constants': 'constant',\r\n                        '@operators': 'operators',\r\n                        '@default': 'identifier',\r\n                    },\r\n                },\r\n            ],\r\n        ],\r\n        comment: [\r\n            [/[^\\|#]+/, 'comment'],\r\n            [/#\\|/, 'comment', '@push'],\r\n            [/\\|#/, 'comment', '@pop'],\r\n            [/[\\|#]/, 'comment'],\r\n        ],\r\n        whitespace: [\r\n            [/[ \\t\\r\\n]+/, 'white'],\r\n            [/#\\|/, 'comment', '@comment'],\r\n            [/;.*$/, 'comment'],\r\n        ],\r\n        strings: [\r\n            [/\"$/, 'string', '@popall'],\r\n            [/\"(?=.)/, 'string', '@multiLineString'],\r\n        ],\r\n        multiLineString: [\r\n            [/[^\\\\\"]+$/, 'string', '@popall'],\r\n            [/[^\\\\\"]+/, 'string'],\r\n            [/\\\\./, 'string.escape'],\r\n            [/\"/, 'string', '@popall'],\r\n            [/\\\\$/, 'string']\r\n        ],\r\n    },\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/scheme/scheme.js?")}}]);