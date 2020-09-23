let FileManager = require('./FileManager');
const IframeManager = require('./IframeManager');

let editor = null;
let newCodeChanges = true; 

module.exports = {
    editor: function () { return editor; },
    create: function (targetElem, options) {
        
        editor = monaco.editor.create(targetElem, options);
        editor.onDidChangeModelContent((e) => {
            let file = FileManager.getActiveFile();
            if(file != null) file.contents = editor.getValue();
            this.editorCodeChanged();
        });

        this.remeasureFonts();
        window.addEventListener('resize', () => {
            this.updateLayout();
        });
    },
    editorCodeChanged: function() {
        console.log('Editor contents changed | New code: ', newCodeChanges);
        if(newCodeChanges) {
            // reload Iframe
            IframeManager.reload(false);
        } else {
            newCodeChanges = true;
        }
    },
    updateLayout: function () {
        let appHeight = document.querySelector('.app').offsetHeight;
        document.querySelector('#ide-container > .monaco-editor').style.height = `${appHeight - 100}px`;
        editor.layout();
    },
    getValue: function () {
        return editor.getValue();
    },
    setValue: function (value, isNewCode) {
        newCodeChanges = isNewCode;
        editor.setValue(value);
    },
    changeLanguage: function (language) {
        monaco.editor.setModelLanguage(editor.getModel(), language);
    },
    remeasureFonts: function () {
        setTimeout(() => monaco.editor.remeasureFonts(), 1500);
    },
    loadFile: function (data) {
        FileManager.setActiveFile(data.id);
        
        let file = FileManager.getActiveFile();
        if(editor == null) {
            this.create(document.getElementById('ide-container'), {
                value: file.contents,
                language: file.type,
                theme: 'synth',
                wordWrap: 'on',
                fontFamily: 'Cascadia Code, Consolas, Courier New, monospace'
            })
        } else {
            this.changeLanguage(file.type);
            this.setValue(file.contents, false);
        }
    },
    unloadAll: function () {
        FileManager.setActiveFile('');
        this.setValue('', false);
        this.changeLanguage('html');
    }
}