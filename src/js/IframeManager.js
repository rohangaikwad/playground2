const FileManager = require('./FileManager');

const regexScript = new RegExp(/<script.*src.*=.*("|')(?!\w*(?:http|www)).*\.js('|").*<\/script>/, 'gi');
const regexScriptSrc = new RegExp(/(?<=src.*=.*('|"))(.*)(?=('|"))/, 'gi');
const regexLink = new RegExp(/<link.*href.*=.*("|')(?!\w*(?:http|www)).*\.css('|")[^>]*>/, 'gi');
const regexLinkHref = new RegExp(/(?<=href.*=.*('|"))(.*)(?=('|"))/, 'gi');
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
            let srcUrl = script.match(regexScriptSrc)[0];
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
            let srcUrl = link.match(regexLinkHref)[0];
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