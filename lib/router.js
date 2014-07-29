var AmpersandRouter     = require('ampersand-router'),
    ViewSwitcher        = require('ampersand-view-switcher'),
    TitleView           = require('./views/title'),
    TrackView           = require('./views/track'),
    ActivityCollection  = require('./collections/activity'),
    ActivitiesView      = require('./views/activities'),
    activities          = new ActivityCollection();

activities.fetch();

module.exports = AmpersandRouter.extend({

    routes: {
        '': 'track',
        'track': 'track',
        'activities': 'activities'

    },

    initialize: function (options) {

        var title = new TitleView().render();
        document.body.appendChild(title.el);


        this.view = new ViewSwitcher(document.body.appendChild(document.createElement('div')), {
            show: function (newView, oldView) {
                document.body.scrollTop = 0;
            }
        });
    },

    track: function () {
        var trackView = new TrackView({ collection: activities });
        this.view.set(trackView.render());
        // https://github.com/Leaflet/Leaflet/issues/1220
        trackView.map.map.invalidateSize();

    },

    activities: function () {
        this.view.set(new ActivitiesView({ collection: activities }).render());

    }

});
