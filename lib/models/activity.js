var AmpersandModel = require('ampersand-model'),
    localSyncFactory = require('../mixins/ampersand-sync-localstorage');

module.exports = AmpersandModel.extend({
    sync: localSyncFactory('activity'),
    props: {
        start: 'date',
        end: 'date',
        checkpoints: { type: 'array', default: function () { return []; } }
    },
});
