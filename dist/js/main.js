if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            //console.log('service worked registered');
            //console.log(reg);
        })
        .catch(err => console.log(err));
}


const regexScript = new RegExp(/<script.*src.*=.*("|')(?!\w*(?:http|www)).*\.js('|").*<\/script>/, 'gi');
const regexScriptSrc = new RegExp(/(?<=src.*=.*('|"))(.*)(?=('|"))/, 'gi');
const regexLink = new RegExp(/<link.*href.*=.*("|')(?!\w*(?:http|www)).*\.css('|")[^>]*>/, 'gi');
const regexLinkHref = new RegExp(/(?<=href.*=.*('|"))(.*)(?=('|"))/, 'gi');
const regexDir = new RegExp(/^(\.|\/)\/?/g);


let iframe = document.querySelector('iframe');
const buildIframeHtml = (htmlFileID) => {
    let htmlFile = files.filter(file => file.id == htmlFileID)[0];
    if (htmlFile.type != "html") {
        console.log(`${htmlFile.name} is not a valid HTML file`);
        return;
    }

    let html = injectCssJs(htmlFileID, htmlFile.contents);
    iframe.setAttribute('srcdoc', html);
}


const injectCssJs = (htmlFileID, html) => {
    //extract JS files
    let jsScripts = html.match(regexScript);
    jsScripts.forEach(script => {
        let srcUrl = script.match(regexScriptSrc)[0];
        let contents = getContents(srcUrl, htmlFileID);
        if (contents) {
            html = html.replace(script, `<script>${contents}</script>`);
        } else {
            let noScript = script.replace('src', 'src-not-found');
            html = html.replace(script, noScript);
        }
    });

    let linkFiles = html.match(regexLink);
    linkFiles.forEach(link => {
        let srcUrl = link.match(regexLinkHref)[0];
        let contents = getContents(srcUrl, htmlFileID);
        if (contents) {
            html = html.replace(link, `<style>${contents}</style>`);
        } else {
            let noLink = link.replace('href', 'href-not-found');
            html = html.replace(link, noLink);
        }
    });

    return html;
}

const getContents = (srcUrl, htmlFileID) => {
    let htmlFile = files.filter(file => file.id == htmlFileID)[0];

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

    let requiredFile = files.filter(file => file.path == srcUrl);
    return requiredFile.length ? requiredFile[0].contents : null;
}


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






const allowedFileTypes = ["html", "css", "js", "scss"];
let files = [
    {
        id: 'file_0',
        name: "index.html",
        path: "index.html",
        type: "html",
        contents: `<!DOCTYPE html>\n<html>\n<head>\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n\t<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />\n\t<link rel="stylesheet" href="/css/style.css">\n</head>\n<body>\n\t<h1>Hello</h1>\n\t<script src="./js/main.js"></script>\n</body>\n</html>`
    },
    {
        id: 'file_1',
        name: "style.scss",
        path: "css/style.scss",
        type: "scss",
        contents: `* { box-sizing: border-box; }`
    },
    {
        id: 'file_2',
        name: "main.js",
        path: "js/main.js",
        type: "js",
        contents: `console.log('hello world')`
    },
    {
        id: 'file_3',
        name: "js",
        path: "js",
        type: "folder",
        files: []
    },
    {
        id: 'file_4',
        name: "css",
        path: "css",
        type: "folder",
        files: []
    },
    {
        id: 'file_6',
        name: "fonts",
        path: "css/fonts",
        type: "folder",
        files: []
    },
    {
        id: 'file_7',
        name: "icons.css",
        path: "css/fonts/icons.css",
        type: "css",
        contents: `.if { font-family: 'IconFont'; }`
    }
]

let renderFileTree = () => {

    let tree = [];
    buildTree("", files, tree);
    console.log(tree);

    //build file tree html
    let fileTreeDomElem = document.querySelector('[data-type="files"]');
    if (tree.length > 0) {
        let treeRootElem = document.createElement('ul');
        buildTreeHTML(treeRootElem, tree);
        fileTreeDomElem.appendChild(treeRootElem);
    } else {
        fileTreeDomElem.innerHTML = `<button>Add a new file.</button>`
    }
}

let buildTreeHTML = (rootElem, tree) => {
    tree.forEach(item => {
        let iType = item.type;

        let listItem = document.createElement('li');
        listItem.classList.add(iType); 
        if(iType != "folder") listItem.classList.add('file');
        if(iType == "folder") listItem.classList.add('expanded'); // expand folders by default

        let span = document.createElement('span');
        span.innerHTML = item.name;
        span.id = item.id;
        listItem.appendChild(span);

        if(iType == "folder") {
            let ul = document.createElement('ul');
            buildTreeHTML(ul, item.files);
            listItem.appendChild(ul);

            span.addEventListener('click', () => {
                let hasClass = span.closest('li.folder').classList.contains('expanded');

                if(hasClass) {
                    span.closest('li.folder').classList.remove('expanded');
                } else {
                    span.closest('li.folder').classList.add('expanded');
                }
            });
        } else {

            span.addEventListener('click', () => {
                let file = files.filter(file => file.path == item.path)[0];
                let tabExists = tabList.includes(t => t.path == file.path);
    
                if(!tabExists) {
                    tabList.forEach(t => t.active = false);
    
                    let _file = {...file, active: true }
                    tabList.push(_file);
                }
            });            
        }

        rootElem.appendChild(listItem);
    })
}


let sortAlphabetically = (arr, key) => {
    arr.sort((a, b) => {
        if (a[key] < b[key]) { return -1; }
        if (a[key] > b[key]) { return 1; }
        return 0;
    })
}
let buildTree = (root, fileList, tree) => {

    // filter folders
    let folders = fileList.filter(f => f.type == "folder");

    // get root folders
    let rootFolders = folders.filter(f => {
        let path = f.path.replace(root, "");

        let discard = path.match(/^(\.\/|\/)/g);
        if (discard != null) path = path.replace(discard[0], '');

        return f.name == path;
    });
    sortAlphabetically(rootFolders, 'name');    
    tree.push(...rootFolders);

    // recursively search for sub directories/files
    tree.forEach(folder => {
        let _files = fileList.filter(f => f.path.indexOf(`${folder.path}/`) == 0);
        if (_files.length > 0) {
            buildTree(folder.path, _files, folder.files);
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
    sortAlphabetically(rootFiles, 'name');
    tree.push(...rootFiles);
}

renderFileTree();

let tabList = [];




let options = {
    wordWrap: "on",
    fontFamily: "Cascadia Code, Consolas, Courier New, monospace"
}
// let editor = monacoWrapper.create(document.getElementById("ide-container"), files[0].contents, 'html', 'synth', options);
// setTimeout(() => {
//     monaco.editor.remeasureFonts();
// }, 1000)
// window.addEventListener('resize', () => {
//     editor.layout();    
// })

// pip embedded video
// different editors to preserve undo redo history
// destroy editors
// handle anchor tags - page navigation/
// base64
// placeholder images
// diff check

//buildIframeHtml('file_0');