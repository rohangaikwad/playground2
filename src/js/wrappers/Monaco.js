import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
        let workerPath = './js/monaco';
		if (label === 'json') {
			return `${workerPath}/json.worker.bundle.js`;
		}
		if (label === 'css') {
			return `${workerPath}/css.worker.bundle.js`;
		}
		if (label === 'html') {
			return `${workerPath}/html.worker.bundle.js`;
		}
		if (label === 'typescript' || label === 'javascript') {
			return `${workerPath}/ts.worker.bundle.js`;
		}
		return `${workerPath}/editor.worker.bundle.js`;
	}
};

// import * as synthwave from './../json/synthwave-color-theme.json';
// console.log(synthwave.default);
// monaco.editor.defineTheme('synthwave', synthwave.default);

// import * as monokai from './../json/Monokai.json';
// monaco.editor.defineTheme('monokai', monokai.default);

monaco.editor.defineTheme('synth', {
    base: 'vs-dark', // can also be vs-dark or hc-black
    inherit: true, // can also be false to completely replace the builtin rules
    rules: [
        { token: '', background: '262335' },
        { token: 'comment', foreground: '848BBD', fontStyle: 'italic' },
        { token: 'number', foreground: '2EE2FA' },
        { token: 'type', foreground: 'FE4450' }, // regexp
        { token: 'regexp', foreground: 'F97E72' },
        { token: 'keyword', foreground: 'FEDE5D' }, // const let
        { token: 'delimiter', foreground: 'BBBBBB' }, // bracket [] comma
        { token: 'delimiter.html', foreground: '36F9F6', fontStyle: 'bold' }, // bracket [] comma
        { token: 'identifier', foreground: '2EE2FA' }, // variable name
        { token: 'string', foreground: 'FF8B39' },
        { token: 'tag', foreground: '72F1B8' },
        { token: 'metatag.html', foreground: '72F1B8' },
        { token: 'metatag.content.html', foreground: 'FEDE5D', fontStyle: 'bold' },
        { token: 'attribute.name', foreground: 'FEDE5D', fontStyle: 'bold' },
        { token: 'attribute.value', foreground: 'FF8B39' }
    ],
    colors: {
        "editor.background": '#272234',
        "editor.foreground": '#ffffff'
    }
});

// ((window) => {
//     window.monacoWrapper = {
//         create: (domElem, value, language, theme, options) => {
//             return monaco.editor.create(domElem, {
//                 value: value,//['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
//                 language: language,//'javascript',
//                 theme: theme,//'vs-dark'
//                 ...options
//             });
//         }
//     }
// })(window)

//window.monacoWrapper.create(document.getElementById("container"), `console.log("hi")`, 'javascript', 'vs-dark');
