var AmpersandRouter     = require('ampersand-router'),
    ViewSwitcher        = require('ampersand-view-switcher'),
    TrackView           = require('./views/track'),
    ActivityCollection  = require('./collections/activity'),
    ActivitiesView      = require('./views/activities'),
    ActivityView        = require('./views/activity'),
    activities          = new ActivityCollection();

activities.fetch();

module.exports = AmpersandRouter.extend({

    routes: {
        '': 'track',
        'track': 'track',
        'activities': 'activities',
        'activity/:id': 'activity'

    },

    initialize: function (options) {

        this.on('route', function(page) {
            console.log(page);
        });

        this.view = new ViewSwitcher(document.body.appendChild(document.createElement('div')), {

            show: function (newView, oldView, cb) {
                document.body.scrollTop = 0;
            },

            hide: function (oldView, newView, cb) {
                var oldContent;

                if(oldView.el.classList.contains('content')) {
                    oldContent = oldView.el;
                } else {
                    oldContent = oldView.el.querySelector('.content');

                    // ratchet doesn't support animating footers, remove them first for better a better animation
                    Array.prototype.forEach.call(oldView.el.querySelectorAll('.bar-footer'), function (footer) {
                        footer.parentNode.removeChild(footer);
                    });
                }

                oldContent.classList.add('sliding');
                oldContent.classList.add(location.search.contains('out') ? 'sliding-out' : 'sliding-in');
                oldContent.classList.add('left');
                oldContent.addEventListener('transitionend', cb);
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
        window.a = activities;
        this.view.set(new ActivitiesView({ collection: activities }).render());

    },

    activity: function (id) {
        this.view.set(new ActivityView({ model: activities.get(id) }).render());

    }

});
