(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./FileManager":2}],2:[function(require,module,exports){
const allowedFileTypes = ["html", "css", "js"];

let activeFile = "";
let files = [];
let tree = [];
let defaultProjectFiles = [
    {
        id: 'file_1',
        name: "css",
        path: "css",
        type: "folder",
        files: []
    },
    {
        id: 'file_2',
        name: "js",
        path: "js",
        type: "folder",
        files: []
    },
    {
        id: 'file_3',
        name: "index.html",
        path: "index.html",
        type: "html",
        contents: `<!DOCTYPE html>\n<html>\n<head>\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n\t<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />\n\t<link rel="stylesheet" href="/css/style.css">\n</head>\n<body>\n\t<h1>Hello</h1>\n\t<script src="./js/main.js"></script>\n</body>\n</html>`,
        default: true
    },
    {
        id: 'file_4',
        name: "style.css",
        path: "css/style.css",
        type: "css",
        contents: `* { box-sizing: border-box; }`
    },
    {
        id: 'file_5',
        name: "main.js",
        path: "js/main.js",
        type: "js",
        contents: `console.log('hello world')`
    }
]

module.exports = {
    files: function () {
        return files;
    },
    tree: () => tree,
    init: function() {
        files = [...defaultProjectFiles];
    },
    getDefaultFile: function() {
        return this.files().filter(file => file.default)[0];
    },
    getActiveFile: function() {
        let fileIndex = files.findIndex(file => file.id == activeFile);
        return fileIndex > -1 ? files[fileIndex] : null;
    },
    setActiveFile: function(file_id) {
        activeFile = file_id;
    },
    getFileByID: function (file_id) {
        let file = files.filter(file => file.id == file_id);
        return file.length > 0 ? { ...file[0] } : null;
    }
}
},{}],3:[function(require,module,exports){
const FileManager = require('./FileManager');

const regexScript = new RegExp(/<script.*src.*=.*("|')(?!\w*(?:http|www)).*\.js('|").*<\/script>/, 'gi');
//const regexScriptSrc = new RegExp(/(?<=src.*=.*('|"))(.*)(?=('|"))/, 'gi');
const regexLink = new RegExp(/<link.*href.*=.*("|')(?!\w*(?:http|www)).*\.css('|")[^>]*>/, 'gi');
//const regexLinkHref = new RegExp(/(?<=href.*=.*('|"))(.*)(?=('|"))/, 'gi');
const regexDir = new RegExp(/^(\.|\/)\/?/, 'g');

let activeIframeID = "";
let iframe = document.querySelector('#preview .browser iframe');

module.exports = {
    buildIframeHtml: function (htmlFileID, iframeElem = iframe) {
        let htmlFile = FileManager.files().filter(file => file.id == htmlFileID)[0];
        if (htmlFile.type != "html") {
            console.log(`${htmlFile.name} is not a valid HTML file`);
            return;
        }
    
        let html = this.injectCssJs(htmlFileID, htmlFile.contents);
        iframeElem.setAttribute('srcdoc', html);
    },    
    
    injectCssJs: function (htmlFileID, htmlCode) {
        //extract JS files
        let jsScripts = htmlCode.match(regexScript);
        jsScripts.forEach(script => {
            let tempElem = document.createElement('div');
            tempElem.innerHTML = script;
            let srcUrl = tempElem.firstChild.getAttribute('src');
            let contents = this.getContents(srcUrl, htmlFileID);
            if (contents) {
                htmlCode = htmlCode.replace(script, `<script>${contents}</script>`);
            } else {
                let noScript = script.replace('src', 'src-not-found');
                htmlCode = htmlCode.replace(script, noScript);
            }
        });
    
        let linkFiles = htmlCode.match(regexLink);
        linkFiles.forEach(link => {
            let tempElem = document.createElement('div');
            tempElem.innerHTML = link;
            let srcUrl = tempElem.firstChild.getAttribute('href');
            let contents = this.getContents(srcUrl, htmlFileID);
            if (contents) {
                htmlCode = htmlCode.replace(link, `<style>${contents}</style>`);
            } else {
                let noLink = link.replace('href', 'href-not-found');
                htmlCode = htmlCode.replace(link, noLink);
            }
        });
    
        return htmlCode;
    },
    
    getContents: function (srcUrl, htmlFileID) {
        activeIframeID = htmlFileID;

        let htmlFile = FileManager.files().filter(file => file.id == htmlFileID)[0];
    
        let discard = srcUrl.match(/^(\.\/|\/)/g);
        if (discard != null) srcUrl = srcUrl.replace(discard[0], '');
    
    
        let directories = null;
        let dirPath = htmlFile.path.replace(htmlFile.name, '');
        if (dirPath.length > 0) {
            directories = dirPath.split("/");
            directories.pop(); // remove the empty array element
            directories.reverse(); // this will help you remove/pop the closest parent directory first
        }
    
        //match parent directories ../../
        if (directories != null) {
            let parentDirectories = srcUrl.match(/\.\./g) || [];
            let parentDirLength = parentDirectories.length;
            srcUrl = srcUrl.replace(/\.\.\//g, '');
    
            for (i = 0; i < parentDirLength && directories.length > 0; i++) {
                directories.pop();
            }
            if (directories.length > 0) {
                srcUrl = `${directories.join("/")}/${srcUrl}`;
            };
        }
    
        let requiredFile = FileManager.files().filter(file => file.path == srcUrl);
        return requiredFile.length ? requiredFile[0].contents : null;
    },

    reload: function () {
        this.buildIframeHtml(activeIframeID);
    }
}
},{"./FileManager":2}],4:[function(require,module,exports){
const TreeManagement = require('./TreeManagement');
const IframeManager = require('./IframeManager');
const FileManager = require('./FileManager');
const EditorHelper = require('./EditorHelper');
const ToolsManager = require('./ToolsManager');
const TabsManager = require('./TabsManager');
const Preview = require('./Preview');


let createNewProject = () => {

    FileManager.init();
    let file = FileManager.getDefaultFile();

    TreeManagement.renderFileTree(document.querySelector('[data-type="files"]'));

    ToolsManager.init();

    TabsManager.init();
    TabsManager.addTab(file.id);

    IframeManager.buildIframeHtml(file.id);

    Preview.init();
}

createNewProject();
},{"./EditorHelper":1,"./FileManager":2,"./IframeManager":3,"./Preview":5,"./TabsManager":6,"./ToolsManager":7,"./TreeManagement":8}],5:[function(require,module,exports){
let IframeManager = require('./IframeManager');
module.exports = {
    init: function() {
        document.querySelector('#preview .navigation .refresh').addEventListener('click', () => this.reload());
    },
    reload: function() {
        IframeManager.reload();
    }
}
},{"./IframeManager":3}],6:[function(require,module,exports){
let FileManager = require('./FileManager');
let EditorHelper = require('./EditorHelper');

let tabsElem = document.querySelector('.ide-window .tabs');
let tabList = []

module.exports = {
    init: function () {
        this.closeAllTabs();
    },
    getTabList: function () {
        return tabList;
    },
    deselectAllTabs: function () {
        tabList.forEach((tab, i) => {
            tabList[i]["active"] = false;
        });
        document.querySelectorAll(`.tabs > .tab`).forEach(elem => elem.classList.remove('active'));
    },
    selectTab: function (file_id) {
        FileManager.setActiveFile(file_id);
        
        this.deselectAllTabs();

        let tabIndex = tabList.findIndex(tab => tab.id == file_id);
        let tab = tabList[tabIndex];
        tab.active = true;

        EditorHelper.loadFile(tab);

        let tabElem = document.querySelector(`.tab[data-id="${file_id}"]`);
        tabElem.classList.add('active');
    },
    addTab: function (file_id) {
        let tabExists = tabList.some(tab => tab.id == file_id);

        // check if tab already created
        if (tabExists) {
            let tab = tabList.filter(tab => tab.id == file_id)[0];

            // make the tab active if it isn't
            if (!tab.active) this.selectTab(file_id);
        } else {
            let file = FileManager.getFileByID(file_id);
            tabList.push(file);

            let _tabElement = this.buildTabHTML(file);
            tabsElem.appendChild(_tabElement);

            this.selectTab(file_id);
        }
    },
    buildTabHTML: function (data) {
        let tab = document.createElement('div');
        tab.className = "tab";
        tab.setAttribute('data-type', data.type);
        tab.setAttribute('data-id', `${data.id}`);

        let tabName = document.createElement('span');
        tabName.className = "name";
        tabName.setAttribute('data-type', data.type);
        tabName.innerText = data.name;
        tabName.addEventListener('click', () => this.selectTab(data.id));

        let closeBtn = document.createElement('span');
        closeBtn.className = "close-tab codicon";
        closeBtn.addEventListener('click', () => this.closeTab(data.id));

        tab.appendChild(tabName);
        tab.appendChild(closeBtn);

        return tab;
    },
    closeTab: function (file_id) {
        let tabIndex = tabList.findIndex(tab => tab.id == file_id);
        tabList.splice(tabIndex, 1);

        let tabElem = document.querySelector(`.tab[data-id="${file_id}"]`);
        tabElem.parentNode.removeChild(tabElem);

        let length = tabList.length;
        if (length > 0) {
            tabIndex = tabIndex >= length ? length - 1 : tabIndex;
            this.selectTab(tabList[tabIndex].id);
        } else {
            EditorHelper.unloadAll();
        }
    },
    closeAllTabs: function () {
    }
}
},{"./EditorHelper":1,"./FileManager":2}],7:[function(require,module,exports){
module.exports = {
    init: function () {        
        this.selectTool('files'); // default tool
        document.querySelector('.tool-switcher .action .files').addEventListener('click', () => {
            this.selectTool('files');
        });
    },
    selectTool: function (tool) {
        let targetElem = document.querySelector('.sidebar[data-sidebar]');
        targetElem.setAttribute('data-sidebar', tool);
    }
}
},{}],8:[function(require,module,exports){
const Utils = require('./utils/Utils.js');
const FileManager = require('./FileManager');
const TabsManager = require('./TabsManager');

module.exports = {
    buildTree: function (root, fileList, tree) {
        // filter folders
        let folders = fileList.filter(f => f.type == "folder");

        // get root folders
        let rootFolders = folders.filter(f => {
            let path = f.path.replace(root, "");

            let discard = path.match(/^(\.\/|\/)/g);
            if (discard != null) path = path.replace(discard[0], '');

            return f.name == path;
        });
        Utils.sortAlphabetically(rootFolders, 'name');
        tree.push(...rootFolders);

        // recursively search for sub directories/files
        tree.forEach(folder => {
            let _files = fileList.filter(f => f.path.indexOf(`${folder.path}/`) == 0);
            if (_files.length > 0) {
                this.buildTree(folder.path, _files, folder.files);
            }
        });


        // filter files
        let files = fileList.filter(f => f.type != "folder");
        let rootFiles = files.filter(f => {
            let path = f.path.replace(root, "");

            let discard = path.match(/^(\.\/|\/)/g);
            if (discard != null) path = path.replace(discard[0], '');

            return f.name == path;
        });
        Utils.sortAlphabetically(rootFiles, 'name');
        tree.push(...rootFiles);
    },


    generateTreeHTML: function (rootElem, tree) {
        tree.forEach(item => {
            let iType = item.type;

            let listItem = document.createElement('li');
            listItem.classList.add(iType);
            if (iType != "folder") listItem.classList.add('file');
            if (iType == "folder") listItem.classList.add('expanded'); // expand folders by default

            let span = document.createElement('span');
            span.innerHTML = item.name;
            span.id = item.id;
            listItem.appendChild(span);

            if (iType == "folder") {
                let ul = document.createElement('ul');
                this.generateTreeHTML(ul, item.files);
                listItem.appendChild(ul);

                span.addEventListener('click', () => {
                    let hasClass = span.closest('li.folder').classList.contains('expanded');

                    if (hasClass) {
                        span.closest('li.folder').classList.remove('expanded');
                    } else {
                        span.closest('li.folder').classList.add('expanded');
                    }
                });
            } else {

                // file click handler
                span.addEventListener('click', () => {
                    let file = FileManager.files().filter(file => file.path == item.path)[0];
                    //let tabExists = TabsManager.getTabList().includes(t => t.path == file.path);

                    TabsManager.addTab(file.id)
                });
            }

            rootElem.appendChild(listItem);
        })
    },


    renderFileTree: function (renderTarget) {
        let tree = [];
        this.buildTree("", [...FileManager.files()], tree);
    
        //build file tree html
        //let fileTreeDomElem = document.querySelector('[data-type="files"]');
        if (tree.length > 0) {
            let treeRootElem = document.createElement('ul');
            this.generateTreeHTML(treeRootElem, tree);
            renderTarget.appendChild(treeRootElem);
        } else {
            renderTarget.innerHTML = `<button>Add a new file.</button>`
        }
    }
}
},{"./FileManager":2,"./TabsManager":6,"./utils/Utils.js":9}],9:[function(require,module,exports){
module.exports = {
    sortAlphabetically: (arr, key) => {
        arr.sort((a, b) => {
            if (a[key] < b[key]) { return -1; }
            if (a[key] > b[key]) { return 1; }
            return 0;
        })
    }
}
},{}]},{},[4]);
