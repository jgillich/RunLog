var AmpersandModel = require('ampersand-model'),
    localSyncFactory = require('../mixins/ampersand-sync-localstorage');

module.exports = AmpersandModel.extend({
    sync: localSyncFactory('activities'),
    props: {
        id: 'string',
        start: 'date',
        stop: 'date',
        distance: 'number',
        checkpoints: { type: 'array', default: () => [] }
    },
    parse: function (attrs) {
        attrs.start = new Date(attrs.start);
        attrs.stop = new Date(attrs.stop);
        return attrs;
    }
});
