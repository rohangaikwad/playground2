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

        if (tabList.length > 0) {
            tabIndex--;
            tabIndex = tabIndex > 0 ? tabIndex : 0;

            this.selectTab(tabList[tabIndex].id);
        }
    },
    closeAllTabs: function () {
        tabList = [];
        tabsElem.innerHTML = "";
    }
}