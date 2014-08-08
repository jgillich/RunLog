var AmpersandRouter     = require('ampersand-router'),
    ViewSwitcher        = require('ampersand-view-switcher'),
    TrackView           = require('./views/track'),
    ActivityCollection  = require('./collections/activity'),
    ActivitiesView      = require('./views/activities'),
    ActivityView        = require('./views/activity'),
    clickTarget         = require('./util/clickTarget');

module.exports = AmpersandRouter.extend({

    routes: {
        '': 'track',
        'track': 'track',
        'activities': 'activities',
        'activity/:id': 'activity'
    },

    initialize: function (options) {
        this.activities = new ActivityCollection();
        this.activities.fetch();

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
                oldContent.classList.add(clickTarget() && clickTarget().dataset.transition === 'slide-out' ? 'right' : 'left');
                oldContent.addEventListener('transitionend', cb);
            }
        });
    },

    track: function () {
        var trackView = new TrackView({ collection: this.activities });
        this.view.set(trackView.render());
        // https://github.com/Leaflet/Leaflet/issues/1220
        trackView.map.map.invalidateSize();
    },

    activities: function () {
        this.view.set(new ActivitiesView({ collection: this.activities }).render());
    },

    activity: function (id) {
        this.view.set(new ActivityView({ model: this.activities.get(id) }).render());
    }

});
