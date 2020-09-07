(self.webpackJsonp=self.webpackJsonp||[]).push([[43],{"./node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n// Allow for running under nodejs/requirejs in tests\r\nvar _monaco = (typeof monaco === 'undefined' ? self.monaco : monaco);\r\nvar EMPTY_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];\r\nvar conf = {\r\n    wordPattern: /(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\$\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\s]+)/g,\r\n    comments: {\r\n        blockComment: ['\x3c!--', '--\x3e']\r\n    },\r\n    brackets: [\r\n        ['\x3c!--', '--\x3e'],\r\n        ['<', '>'],\r\n        ['{', '}'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' }\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' },\r\n        { open: '<', close: '>' }\r\n    ],\r\n    onEnterRules: [\r\n        {\r\n            beforeText: new RegExp(\"<(?!(?:\" + EMPTY_ELEMENTS.join('|') + \"))(\\\\w[\\\\w\\\\d]*)([^/>]*(?!/)>)[^<]*$\", 'i'),\r\n            afterText: /^<\\/(\\w[\\w\\d]*)\\s*>$/i,\r\n            action: { indentAction: _monaco.languages.IndentAction.IndentOutdent }\r\n        },\r\n        {\r\n            beforeText: new RegExp(\"<(?!(?:\" + EMPTY_ELEMENTS.join('|') + \"))(\\\\w[\\\\w\\\\d]*)([^/>]*(?!/)>)[^<]*$\", 'i'),\r\n            action: { indentAction: _monaco.languages.IndentAction.Indent }\r\n        }\r\n    ],\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '',\r\n    // ignoreCase: true,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        root: [\r\n            [/@@/],\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.root' }],\r\n            [/<!DOCTYPE/, 'metatag.html', '@doctype'],\r\n            [/\x3c!--/, 'comment.html', '@comment'],\r\n            [/(<)(\\w+)(\\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\r\n            [/(<)(script)/, ['delimiter.html', { token: 'tag.html', next: '@script' }]],\r\n            [/(<)(style)/, ['delimiter.html', { token: 'tag.html', next: '@style' }]],\r\n            [/(<)([:\\w]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],\r\n            [/(<\\/)(\\w+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],\r\n            [/</, 'delimiter.html'],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/[^<@]+/],\r\n        ],\r\n        doctype: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.comment' }],\r\n            [/[^>]+/, 'metatag.content.html'],\r\n            [/>/, 'metatag.html', '@pop'],\r\n        ],\r\n        comment: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.comment' }],\r\n            [/--\x3e/, 'comment.html', '@pop'],\r\n            [/[^-]+/, 'comment.content.html'],\r\n            [/./, 'comment.content.html']\r\n        ],\r\n        otherTag: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.otherTag' }],\r\n            [/\\/?>/, 'delimiter.html', '@pop'],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/[ \\t\\r\\n]+/],\r\n        ],\r\n        // -- BEGIN <script> tags handling\r\n        // After <script\r\n        script: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.script' }],\r\n            [/type/, 'attribute.name', '@scriptAfterType'],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/(<\\/)(script\\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]\r\n        ],\r\n        // After <script ... type\r\n        scriptAfterType: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.scriptAfterType' }],\r\n            [/=/, 'delimiter', '@scriptAfterTypeEquals'],\r\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        // After <script ... type =\r\n        scriptAfterTypeEquals: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.scriptAfterTypeEquals' }],\r\n            [/\"([^\"]*)\"/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],\r\n            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],\r\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        // After <script ... type = $S2\r\n        scriptWithCustomType: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.scriptWithCustomType.$S2' }],\r\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.$S2', nextEmbedded: '$S2' }],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        scriptEmbedded: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInEmbeddedState.scriptEmbedded.$S2', nextEmbedded: '@pop' }],\r\n            [/<\\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]\r\n        ],\r\n        // -- END <script> tags handling\r\n        // -- BEGIN <style> tags handling\r\n        // After <style\r\n        style: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.style' }],\r\n            [/type/, 'attribute.name', '@styleAfterType'],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/(<\\/)(style\\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]\r\n        ],\r\n        // After <style ... type\r\n        styleAfterType: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.styleAfterType' }],\r\n            [/=/, 'delimiter', '@styleAfterTypeEquals'],\r\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        // After <style ... type =\r\n        styleAfterTypeEquals: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.styleAfterTypeEquals' }],\r\n            [/\"([^\"]*)\"/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],\r\n            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],\r\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        // After <style ... type = $S2\r\n        styleWithCustomType: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInSimpleState.styleWithCustomType.$S2' }],\r\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.$S2', nextEmbedded: '$S2' }],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        styleEmbedded: [\r\n            [/@[^@]/, { token: '@rematch', switchTo: '@razorInEmbeddedState.styleEmbedded.$S2', nextEmbedded: '@pop' }],\r\n            [/<\\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]\r\n        ],\r\n        // -- END <style> tags handling\r\n        razorInSimpleState: [\r\n            [/@\\*/, 'comment.cs', '@razorBlockCommentTopLevel'],\r\n            [/@[{(]/, 'metatag.cs', '@razorRootTopLevel'],\r\n            [/(@)(\\s*[\\w]+)/, ['metatag.cs', { token: 'identifier.cs', switchTo: '@$S2.$S3' }]],\r\n            [/[})]/, { token: 'metatag.cs', switchTo: '@$S2.$S3' }],\r\n            [/\\*@/, { token: 'comment.cs', switchTo: '@$S2.$S3' }],\r\n        ],\r\n        razorInEmbeddedState: [\r\n            [/@\\*/, 'comment.cs', '@razorBlockCommentTopLevel'],\r\n            [/@[{(]/, 'metatag.cs', '@razorRootTopLevel'],\r\n            [/(@)(\\s*[\\w]+)/, ['metatag.cs', { token: 'identifier.cs', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }]],\r\n            [/[})]/, { token: 'metatag.cs', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],\r\n            [/\\*@/, { token: 'comment.cs', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],\r\n        ],\r\n        razorBlockCommentTopLevel: [\r\n            [/\\*@/, '@rematch', '@pop'],\r\n            [/[^*]+/, 'comment.cs'],\r\n            [/./, 'comment.cs']\r\n        ],\r\n        razorBlockComment: [\r\n            [/\\*@/, 'comment.cs', '@pop'],\r\n            [/[^*]+/, 'comment.cs'],\r\n            [/./, 'comment.cs']\r\n        ],\r\n        razorRootTopLevel: [\r\n            [/\\{/, 'delimiter.bracket.cs', '@razorRoot'],\r\n            [/\\(/, 'delimiter.parenthesis.cs', '@razorRoot'],\r\n            [/[})]/, '@rematch', '@pop'],\r\n            { include: 'razorCommon' }\r\n        ],\r\n        razorRoot: [\r\n            [/\\{/, 'delimiter.bracket.cs', '@razorRoot'],\r\n            [/\\(/, 'delimiter.parenthesis.cs', '@razorRoot'],\r\n            [/\\}/, 'delimiter.bracket.cs', '@pop'],\r\n            [/\\)/, 'delimiter.parenthesis.cs', '@pop'],\r\n            { include: 'razorCommon' }\r\n        ],\r\n        razorCommon: [\r\n            [/[a-zA-Z_]\\w*/, {\r\n                    cases: {\r\n                        '@razorKeywords': { token: 'keyword.cs' },\r\n                        '@default': 'identifier.cs'\r\n                    }\r\n                }],\r\n            // brackets\r\n            [/[\\[\\]]/, 'delimiter.array.cs'],\r\n            // whitespace\r\n            [/[ \\t\\r\\n]+/],\r\n            // comments\r\n            [/\\/\\/.*$/, 'comment.cs'],\r\n            [/@\\*/, 'comment.cs', '@razorBlockComment'],\r\n            // strings\r\n            [/\"([^\"]*)\"/, 'string.cs'],\r\n            [/'([^']*)'/, 'string.cs'],\r\n            // simple html\r\n            [/(<)(\\w+)(\\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\r\n            [/(<)(\\w+)(>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\r\n            [/(<\\/)(\\w+)(>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\r\n            // delimiters\r\n            [/[\\+\\-\\*\\%\\&\\|\\^\\~\\!\\=\\<\\>\\/\\?\\;\\:\\.\\,]/, 'delimiter.cs'],\r\n            // numbers\r\n            [/\\d*\\d+[eE]([\\-+]?\\d+)?/, 'number.float.cs'],\r\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float.cs'],\r\n            [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex.cs'],\r\n            [/0[0-7']*[0-7]/, 'number.octal.cs'],\r\n            [/0[bB][0-1']*[0-1]/, 'number.binary.cs'],\r\n            [/\\d[\\d']*/, 'number.cs'],\r\n            [/\\d/, 'number.cs'],\r\n        ]\r\n    },\r\n    razorKeywords: [\r\n        'abstract', 'as', 'async', 'await', 'base', 'bool',\r\n        'break', 'by', 'byte', 'case',\r\n        'catch', 'char', 'checked', 'class',\r\n        'const', 'continue', 'decimal', 'default',\r\n        'delegate', 'do', 'double', 'descending',\r\n        'explicit', 'event', 'extern', 'else',\r\n        'enum', 'false', 'finally', 'fixed',\r\n        'float', 'for', 'foreach', 'from',\r\n        'goto', 'group', 'if', 'implicit',\r\n        'in', 'int', 'interface', 'internal',\r\n        'into', 'is', 'lock', 'long', 'nameof',\r\n        'new', 'null', 'namespace', 'object',\r\n        'operator', 'out', 'override', 'orderby',\r\n        'params', 'private', 'protected', 'public',\r\n        'readonly', 'ref', 'return', 'switch',\r\n        'struct', 'sbyte', 'sealed', 'short',\r\n        'sizeof', 'stackalloc', 'static', 'string',\r\n        'select', 'this', 'throw', 'true',\r\n        'try', 'typeof', 'uint', 'ulong',\r\n        'unchecked', 'unsafe', 'ushort', 'using',\r\n        'var', 'virtual', 'volatile', 'void', 'when',\r\n        'while', 'where', 'yield',\r\n        'model', 'inject' // Razor specific\r\n    ],\r\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.js?")}}]);