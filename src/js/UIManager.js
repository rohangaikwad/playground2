const Utils = require('./utils/Utils');
const EditorHelper = require('./EditorHelper');

let hotReload = false;
let showFiles = true;
let showPreview = true;
let showEditor = true;

let appWidths = [
    'var(--switcher-width)',
    'var(--sidebar-width)',
    'minmax(0, 1fr)',
    'var(--preview-width)',
];

const appDiv = document.querySelector('.app');

module.exports = {
    init: function () {
        this.setAppHeight();
        this.onWindowResize();
        this.toggleSidebar();
        this.toggleEditor();
        this.togglePreview();
    },
    toggleSidebar: function () {
        let actionBtn = document.querySelector('.tool-switcher .action .files').closest('.action'); 
        actionBtn.addEventListener('click', () => {
            showFiles = !showFiles;

            if(showFiles) {
                actionBtn.classList.add('active');
                appWidths[1] = 'var(--sidebar-width)';
            } else {
                actionBtn.classList.remove('active');
                appWidths[1] = 0;
            }
            
            appDiv.style.gridTemplateColumns = appWidths.join(' ');
            EditorHelper.updateLayout();
        });
    },
    toggleEditor: function () {
        let actionBtn = document.querySelector('.tool-switcher .action .editor').closest('.action'); 
        actionBtn.addEventListener('click', () => {
            showEditor = !showEditor;

            if(showEditor) {
                actionBtn.classList.add('active');
                appWidths[2] = 'minmax(0, 1fr)';
            } else {
                actionBtn.classList.remove('active');
                appWidths[2] = 0;
            }
            
            appDiv.style.gridTemplateColumns = appWidths.join(' ');
            EditorHelper.updateLayout();
        });
    },
    togglePreview: function () {
        let actionBtn = document.querySelector('.tool-switcher .action .preview').closest('.action'); 
        actionBtn.addEventListener('click', () => {
            showPreview = !showPreview;

            if(showPreview) {
                actionBtn.classList.add('active');
                appWidths[3] = Utils.getPropValue('--preview-width');
            } else {
                actionBtn.classList.remove('active');
                appWidths[3] = 0;
            }
            
            appDiv.style.gridTemplateColumns = appWidths.join(' ');
            EditorHelper.updateLayout();
        });
    },
    onWindowResize: function() {
        window.addEventListener('resize', () => {
            this.setAppHeight();
        })

        // handle mobile tablet
        // show only one window at a time.
    },
    toggleHotReloading: function() {

    },
    setAppHeight: function() {
        Utils.setPropValue('--app-height', `${window.innerHeight}px`);
    }
}