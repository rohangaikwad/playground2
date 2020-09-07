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

((window) => {
    window.monacoWrapper = {
        create: (domElem, value, language, theme, options) => {
            return monaco.editor.create(domElem, {
                value: value,//['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
                language: language,//'javascript',
                theme: theme,//'vs-dark'
                ...options
            });
        }
    }
})(window)

//window.monacoWrapper.create(document.getElementById("container"), `console.log("hi")`, 'javascript', 'vs-dark');
