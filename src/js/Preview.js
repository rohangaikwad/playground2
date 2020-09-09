let IframeManager = require('./IframeManager');
module.exports = {
    init: function() {
        document.querySelector('#preview .navigation .refresh').addEventListener('click', () => this.reload());
    },
    reload: function() {
        IframeManager.reload();
    }
}