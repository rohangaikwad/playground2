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