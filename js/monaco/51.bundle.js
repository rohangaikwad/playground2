(self.webpackJsonp=self.webpackJsonp||[]).push([[51],{"./node_modules/monaco-editor/esm/vs/basic-languages/scss/scss.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    wordPattern: /(#?-?\\d*\\.\\d\\w*%?)|([@$#!.:]?[\\w-?]+%?)|[@#!.]/g,\r\n    comments: {\r\n        blockComment: ['/*', '*/'],\r\n        lineComment: '//'\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}', notIn: ['string', 'comment'] },\r\n        { open: '[', close: ']', notIn: ['string', 'comment'] },\r\n        { open: '(', close: ')', notIn: ['string', 'comment'] },\r\n        { open: '\"', close: '\"', notIn: ['string', 'comment'] },\r\n        { open: '\\'', close: '\\'', notIn: ['string', 'comment'] },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' },\r\n    ],\r\n    folding: {\r\n        markers: {\r\n            start: new RegExp(\"^\\\\s*\\\\/\\\\*\\\\s*#region\\\\b\\\\s*(.*?)\\\\s*\\\\*\\\\/\"),\r\n            end: new RegExp(\"^\\\\s*\\\\/\\\\*\\\\s*#endregion\\\\b.*\\\\*\\\\/\")\r\n        }\r\n    }\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '.scss',\r\n    ws: '[ \\t\\n\\r\\f]*',\r\n    identifier: '-?-?([a-zA-Z]|(\\\\\\\\(([0-9a-fA-F]{1,6}\\\\s?)|[^[0-9a-fA-F])))([\\\\w\\\\-]|(\\\\\\\\(([0-9a-fA-F]{1,6}\\\\s?)|[^[0-9a-fA-F])))*',\r\n    brackets: [\r\n        { open: '{', close: '}', token: 'delimiter.curly' },\r\n        { open: '[', close: ']', token: 'delimiter.bracket' },\r\n        { open: '(', close: ')', token: 'delimiter.parenthesis' },\r\n        { open: '<', close: '>', token: 'delimiter.angle' }\r\n    ],\r\n    tokenizer: {\r\n        root: [\r\n            { include: '@selector' },\r\n        ],\r\n        selector: [\r\n            { include: '@comments' },\r\n            { include: '@import' },\r\n            { include: '@variabledeclaration' },\r\n            { include: '@warndebug' },\r\n            ['[@](include)', { token: 'keyword', next: '@includedeclaration' }],\r\n            ['[@](keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes)', { token: 'keyword', next: '@keyframedeclaration' }],\r\n            ['[@](page|content|font-face|-moz-document)', { token: 'keyword' }],\r\n            ['[@](charset|namespace)', { token: 'keyword', next: '@declarationbody' }],\r\n            ['[@](function)', { token: 'keyword', next: '@functiondeclaration' }],\r\n            ['[@](mixin)', { token: 'keyword', next: '@mixindeclaration' }],\r\n            ['url(\\\\-prefix)?\\\\(', { token: 'meta', next: '@urldeclaration' }],\r\n            { include: '@controlstatement' },\r\n            { include: '@selectorname' },\r\n            ['[&\\\\*]', 'tag'],\r\n            ['[>\\\\+,]', 'delimiter'],\r\n            ['\\\\[', { token: 'delimiter.bracket', next: '@selectorattribute' }],\r\n            ['{', { token: 'delimiter.curly', next: '@selectorbody' }],\r\n        ],\r\n        selectorbody: [\r\n            ['[*_]?@identifier@ws:(?=(\\\\s|\\\\d|[^{;}]*[;}]))', 'attribute.name', '@rulevalue'],\r\n            { include: '@selector' },\r\n            ['[@](extend)', { token: 'keyword', next: '@extendbody' }],\r\n            ['[@](return)', { token: 'keyword', next: '@declarationbody' }],\r\n            ['}', { token: 'delimiter.curly', next: '@pop' }],\r\n        ],\r\n        selectorname: [\r\n            ['#{', { token: 'meta', next: '@variableinterpolation' }],\r\n            ['(\\\\.|#(?=[^{])|%|(@identifier)|:)+', 'tag'],\r\n        ],\r\n        selectorattribute: [\r\n            { include: '@term' },\r\n            [']', { token: 'delimiter.bracket', next: '@pop' }],\r\n        ],\r\n        term: [\r\n            { include: '@comments' },\r\n            ['url(\\\\-prefix)?\\\\(', { token: 'meta', next: '@urldeclaration' }],\r\n            { include: '@functioninvocation' },\r\n            { include: '@numbers' },\r\n            { include: '@strings' },\r\n            { include: '@variablereference' },\r\n            ['(and\\\\b|or\\\\b|not\\\\b)', 'operator'],\r\n            { include: '@name' },\r\n            ['([<>=\\\\+\\\\-\\\\*\\\\/\\\\^\\\\|\\\\~,])', 'operator'],\r\n            [',', 'delimiter'],\r\n            ['!default', 'literal'],\r\n            ['\\\\(', { token: 'delimiter.parenthesis', next: '@parenthizedterm' }],\r\n        ],\r\n        rulevalue: [\r\n            { include: '@term' },\r\n            ['!important', 'literal'],\r\n            [';', 'delimiter', '@pop'],\r\n            ['{', { token: 'delimiter.curly', switchTo: '@nestedproperty' }],\r\n            ['(?=})', { token: '', next: '@pop' }],\r\n        ],\r\n        nestedproperty: [\r\n            ['[*_]?@identifier@ws:', 'attribute.name', '@rulevalue'],\r\n            { include: '@comments' },\r\n            ['}', { token: 'delimiter.curly', next: '@pop' }],\r\n        ],\r\n        warndebug: [\r\n            ['[@](warn|debug)', { token: 'keyword', next: '@declarationbody' }],\r\n        ],\r\n        import: [\r\n            ['[@](import)', { token: 'keyword', next: '@declarationbody' }],\r\n        ],\r\n        variabledeclaration: [\r\n            ['\\\\$@identifier@ws:', 'variable.decl', '@declarationbody'],\r\n        ],\r\n        urldeclaration: [\r\n            { include: '@strings' },\r\n            ['[^)\\r\\n]+', 'string'],\r\n            ['\\\\)', { token: 'meta', next: '@pop' }],\r\n        ],\r\n        parenthizedterm: [\r\n            { include: '@term' },\r\n            ['\\\\)', { token: 'delimiter.parenthesis', next: '@pop' }],\r\n        ],\r\n        declarationbody: [\r\n            { include: '@term' },\r\n            [';', 'delimiter', '@pop'],\r\n            ['(?=})', { token: '', next: '@pop' }],\r\n        ],\r\n        extendbody: [\r\n            { include: '@selectorname' },\r\n            ['!optional', 'literal'],\r\n            [';', 'delimiter', '@pop'],\r\n            ['(?=})', { token: '', next: '@pop' }],\r\n        ],\r\n        variablereference: [\r\n            ['\\\\$@identifier', 'variable.ref'],\r\n            ['\\\\.\\\\.\\\\.', 'operator'],\r\n            ['#{', { token: 'meta', next: '@variableinterpolation' }],\r\n        ],\r\n        variableinterpolation: [\r\n            { include: '@variablereference' },\r\n            ['}', { token: 'meta', next: '@pop' }],\r\n        ],\r\n        comments: [\r\n            ['\\\\/\\\\*', 'comment', '@comment'],\r\n            ['\\\\/\\\\/+.*', 'comment'],\r\n        ],\r\n        comment: [\r\n            ['\\\\*\\\\/', 'comment', '@pop'],\r\n            ['.', 'comment'],\r\n        ],\r\n        name: [\r\n            ['@identifier', 'attribute.value'],\r\n        ],\r\n        numbers: [\r\n            ['(\\\\d*\\\\.)?\\\\d+([eE][\\\\-+]?\\\\d+)?', { token: 'number', next: '@units' }],\r\n            ['#[0-9a-fA-F_]+(?!\\\\w)', 'number.hex'],\r\n        ],\r\n        units: [\r\n            ['(em|ex|ch|rem|vmin|vmax|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?', 'number', '@pop']\r\n        ],\r\n        functiondeclaration: [\r\n            ['@identifier@ws\\\\(', { token: 'meta', next: '@parameterdeclaration' }],\r\n            ['{', { token: 'delimiter.curly', switchTo: '@functionbody' }],\r\n        ],\r\n        mixindeclaration: [\r\n            // mixin with parameters\r\n            ['@identifier@ws\\\\(', { token: 'meta', next: '@parameterdeclaration' }],\r\n            // mixin without parameters\r\n            ['@identifier', 'meta'],\r\n            ['{', { token: 'delimiter.curly', switchTo: '@selectorbody' }],\r\n        ],\r\n        parameterdeclaration: [\r\n            ['\\\\$@identifier@ws:', 'variable.decl'],\r\n            ['\\\\.\\\\.\\\\.', 'operator'],\r\n            [',', 'delimiter'],\r\n            { include: '@term' },\r\n            ['\\\\)', { token: 'meta', next: '@pop' }],\r\n        ],\r\n        includedeclaration: [\r\n            { include: '@functioninvocation' },\r\n            ['@identifier', 'meta'],\r\n            [';', 'delimiter', '@pop'],\r\n            ['(?=})', { token: '', next: '@pop' }],\r\n            ['{', { token: 'delimiter.curly', switchTo: '@selectorbody' }],\r\n        ],\r\n        keyframedeclaration: [\r\n            ['@identifier', 'meta'],\r\n            ['{', { token: 'delimiter.curly', switchTo: '@keyframebody' }],\r\n        ],\r\n        keyframebody: [\r\n            { include: '@term' },\r\n            ['{', { token: 'delimiter.curly', next: '@selectorbody' }],\r\n            ['}', { token: 'delimiter.curly', next: '@pop' }],\r\n        ],\r\n        controlstatement: [\r\n            ['[@](if|else|for|while|each|media)', { token: 'keyword.flow', next: '@controlstatementdeclaration' }],\r\n        ],\r\n        controlstatementdeclaration: [\r\n            ['(in|from|through|if|to)\\\\b', { token: 'keyword.flow' }],\r\n            { include: '@term' },\r\n            ['{', { token: 'delimiter.curly', switchTo: '@selectorbody' }],\r\n        ],\r\n        functionbody: [\r\n            ['[@](return)', { token: 'keyword' }],\r\n            { include: '@variabledeclaration' },\r\n            { include: '@term' },\r\n            { include: '@controlstatement' },\r\n            [';', 'delimiter'],\r\n            ['}', { token: 'delimiter.curly', next: '@pop' }],\r\n        ],\r\n        functioninvocation: [\r\n            ['@identifier\\\\(', { token: 'meta', next: '@functionarguments' }],\r\n        ],\r\n        functionarguments: [\r\n            ['\\\\$@identifier@ws:', 'attribute.name'],\r\n            ['[,]', 'delimiter'],\r\n            { include: '@term' },\r\n            ['\\\\)', { token: 'meta', next: '@pop' }],\r\n        ],\r\n        strings: [\r\n            ['~?\"', { token: 'string.delimiter', next: '@stringenddoublequote' }],\r\n            ['~?\\'', { token: 'string.delimiter', next: '@stringendquote' }]\r\n        ],\r\n        stringenddoublequote: [\r\n            ['\\\\\\\\.', 'string'],\r\n            ['\"', { token: 'string.delimiter', next: '@pop' }],\r\n            ['.', 'string']\r\n        ],\r\n        stringendquote: [\r\n            ['\\\\\\\\.', 'string'],\r\n            ['\\'', { token: 'string.delimiter', next: '@pop' }],\r\n            ['.', 'string']\r\n        ]\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/scss/scss.js?")}}]);