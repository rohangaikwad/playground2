let FileManager = require('./FileManager');

let editor = null;

module.exports = {
    editor: function () { return editor; },
    create: function (targetElem, options) {
        
        editor = monaco.editor.create(targetElem, options);
        editor.onDidChangeModelContent(function (e) {
            let file = FileManager.getActiveFile();
            if(file != null) file.contents = editor.getValue();
        });

        this.remeasureFonts();
        window.addEventListener('resize', () => editor.layout());
    },
    getValue: function () { return editor.getValue() },
    setValue: function (value) { editor.setValue(value) },
    changeLanguage: function (language) { monaco.editor.setModelLanguage(editor.getModel(), language) },
    remeasureFonts: function () { setTimeout(() => monaco.editor.remeasureFonts(), 1500) },
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
            this.setValue(file.contents);
        }
    },
    unloadAll: function () {
        debugger;
        FileManager.setActiveFile('');
        this.setValue('');
        this.changeLanguage('html');
    }
}