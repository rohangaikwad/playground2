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