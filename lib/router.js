var AmpersandRouter     = require('ampersand-router'),
    ViewSwitcher        = require('ampersand-view-switcher'),
    TitleView           = require('./views/title'),
    HomeView            = require('./views/home'),
    TrackView           = require('./views/track'),
    ActivityCollection  = require('./collections/activity'),
    activities          = new ActivityCollection();

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
        this.view.set(new TrackView({ collection: activities }).render());
    },

    activities: function () {


    }

});
