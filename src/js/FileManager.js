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
        contents: `<!DOCTYPE html>\n<html>\n<head>\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n\t<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />\n\t<link rel="stylesheet" href="css/style.css">\n</head>\n<body>\n\t<h1>Hello</h1>\n\t<script src="js/main.js"></script>\n</body>\n</html>`,
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
        type: "javascript",
        contents: `console.log('hello world');`
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