(self.webpackJsonp=self.webpackJsonp||[]).push([[42],{"./node_modules/monaco-editor/esm/vs/basic-languages/r/r.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: '#'\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n    ]\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '.r',\r\n    roxygen: [\r\n        '@param',\r\n        '@return',\r\n        '@name',\r\n        '@rdname',\r\n        '@examples',\r\n        '@include',\r\n        '@docType',\r\n        '@S3method',\r\n        '@TODO',\r\n        '@aliases',\r\n        '@alias',\r\n        '@assignee',\r\n        '@author',\r\n        '@callGraphDepth',\r\n        '@callGraph',\r\n        '@callGraphPrimitives',\r\n        '@concept',\r\n        '@exportClass',\r\n        '@exportMethod',\r\n        '@exportPattern',\r\n        '@export',\r\n        '@formals',\r\n        '@format',\r\n        '@importClassesFrom',\r\n        '@importFrom',\r\n        '@importMethodsFrom',\r\n        '@import',\r\n        '@keywords',\r\n        '@method',\r\n        '@nord',\r\n        '@note',\r\n        '@references',\r\n        '@seealso',\r\n        '@setClass',\r\n        '@slot',\r\n        '@source',\r\n        '@title',\r\n        '@usage'\r\n    ],\r\n    constants: [\r\n        'NULL',\r\n        'FALSE',\r\n        'TRUE',\r\n        'NA',\r\n        'Inf',\r\n        'NaN ',\r\n        'NA_integer_',\r\n        'NA_real_',\r\n        'NA_complex_',\r\n        'NA_character_ ',\r\n        'T',\r\n        'F',\r\n        'LETTERS',\r\n        'letters',\r\n        'month.abb',\r\n        'month.name',\r\n        'pi',\r\n        'R.version.string'\r\n    ],\r\n    keywords: [\r\n        'break',\r\n        'next',\r\n        'return',\r\n        'if',\r\n        'else',\r\n        'for',\r\n        'in',\r\n        'repeat',\r\n        'while',\r\n        'array',\r\n        'category',\r\n        'character',\r\n        'complex',\r\n        'double',\r\n        'function',\r\n        'integer',\r\n        'list',\r\n        'logical',\r\n        'matrix',\r\n        'numeric',\r\n        'vector',\r\n        'data.frame',\r\n        'factor',\r\n        'library',\r\n        'require',\r\n        'attach',\r\n        'detach',\r\n        'source'\r\n    ],\r\n    special: [\r\n        '\\\\n',\r\n        '\\\\r',\r\n        '\\\\t',\r\n        '\\\\b',\r\n        '\\\\a',\r\n        '\\\\f',\r\n        '\\\\v',\r\n        '\\\\\\'',\r\n        '\\\\\"',\r\n        '\\\\\\\\'\r\n    ],\r\n    brackets: [\r\n        { open: '{', close: '}', token: 'delimiter.curly' },\r\n        { open: '[', close: ']', token: 'delimiter.bracket' },\r\n        { open: '(', close: ')', token: 'delimiter.parenthesis' }\r\n    ],\r\n    tokenizer: {\r\n        root: [\r\n            { include: '@numbers' },\r\n            { include: '@strings' },\r\n            [/[{}\\[\\]()]/, '@brackets'],\r\n            { include: '@operators' },\r\n            [/#'/, 'comment.doc', '@roxygen'],\r\n            [/(^#.*$)/, 'comment'],\r\n            [/\\s+/, 'white'],\r\n            [/[,:;]/, 'delimiter'],\r\n            [/@[a-zA-Z]\\w*/, 'tag'],\r\n            [/[a-zA-Z]\\w*/, {\r\n                    cases: {\r\n                        '@keywords': 'keyword',\r\n                        '@constants': 'constant',\r\n                        '@default': 'identifier'\r\n                    }\r\n                }]\r\n        ],\r\n        // Recognize Roxygen comments\r\n        roxygen: [\r\n            [/@\\w+/, {\r\n                    cases: {\r\n                        '@roxygen': 'tag',\r\n                        '@eos': { token: 'comment.doc', next: '@pop' },\r\n                        '@default': 'comment.doc'\r\n                    }\r\n                }],\r\n            [/\\s+/, {\r\n                    cases: {\r\n                        '@eos': { token: 'comment.doc', next: '@pop' },\r\n                        '@default': 'comment.doc'\r\n                    }\r\n                }],\r\n            [/.*/, { token: 'comment.doc', next: '@pop' }]\r\n        ],\r\n        // Recognize positives, negatives, decimals, imaginaries, and scientific notation\r\n        numbers: [\r\n            [/0[xX][0-9a-fA-F]+/, 'number.hex'],\r\n            [/-?(\\d*\\.)?\\d+([eE][+\\-]?\\d+)?/, 'number']\r\n        ],\r\n        // Recognize operators\r\n        operators: [\r\n            [/<{1,2}-/, 'operator'],\r\n            [/->{1,2}/, 'operator'],\r\n            [/%[^%\\s]+%/, 'operator'],\r\n            [/\\*\\*/, 'operator'],\r\n            [/%%/, 'operator'],\r\n            [/&&/, 'operator'],\r\n            [/\\|\\|/, 'operator'],\r\n            [/<</, 'operator'],\r\n            [/>>/, 'operator'],\r\n            [/[-+=&|!<>^~*/:$]/, 'operator']\r\n        ],\r\n        // Recognize strings, including those broken across lines\r\n        strings: [\r\n            [/'/, 'string.escape', '@stringBody'],\r\n            [/\"/, 'string.escape', '@dblStringBody']\r\n        ],\r\n        stringBody: [\r\n            [/\\\\./, {\r\n                    cases: {\r\n                        '@special': 'string',\r\n                        '@default': 'error-token'\r\n                    }\r\n                }],\r\n            [/'/, 'string.escape', '@popall'],\r\n            [/./, 'string'],\r\n        ],\r\n        dblStringBody: [\r\n            [/\\\\./, {\r\n                    cases: {\r\n                        '@special': 'string',\r\n                        '@default': 'error-token'\r\n                    }\r\n                }],\r\n            [/\"/, 'string.escape', '@popall'],\r\n            [/./, 'string'],\r\n        ]\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/r/r.js?")}}]);