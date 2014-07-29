var AmpersandCollection = require('ampersand-collection'),
    restMixins          = require('ampersand-collection-rest-mixin'),
    localSyncFactory    = require('../mixins/ampersand-sync-localstorage'),
    ActivityModel       = require('../models/activity');


module.exports = AmpersandCollection.extend(restMixins, {
    sync: localSyncFactory('activities'),
    model: ActivityModel
});
