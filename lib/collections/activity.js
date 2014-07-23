var AmpersandCollection = require('ampersand-collection'),
    restMixins          = require('ampersand-collection-rest-mixin'),
    localSyncFactory    = require('../mixins/ampersand-sync-localstorage');


module.exports = AmpersandCollection.extend(restMixins, {
    sync: localSyncFactory('activities')
});
