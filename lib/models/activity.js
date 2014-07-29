var AmpersandModel = require('ampersand-model'),
    localSyncFactory = require('../mixins/ampersand-sync-localstorage');

module.exports = AmpersandModel.extend({
    sync: localSyncFactory('activities'),
    props: {
        start: 'date',
        end: 'date',
        checkpoints: { type: 'array', default: () => [] }
    },
    parse: function (attrs) {
        attrs.start = new Date(attrs.start);
        attrs.end = new Date(attrs.end);
        return attrs;
    }
});
