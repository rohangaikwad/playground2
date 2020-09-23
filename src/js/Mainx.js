const TreeManagement = require('./TreeManagement');
const IframeManager = require('./IframeManager');
const FileManager = require('./FileManager');
const ToolsManager = require('./ToolsManager');
const TabsManager = require('./TabsManager');
const UIManager = require('./UIManager');


let createNewProject = () => {

    UIManager.init();
    
    FileManager.init();
    let file = FileManager.getDefaultFile();

    TreeManagement.renderFileTree(document.querySelector('[data-type="files"]'));

    ToolsManager.init();

    TabsManager.init();
    TabsManager.addTab(file.id);

    IframeManager.buildIframeHtml(file.id);
}

createNewProject();