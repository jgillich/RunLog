var _               = require('underscore'),
    AmpersandView   = require('ampersand-view'),
    leaflet         = require('leaflet'),
    MapView         = require('./map'),
    ActivityModel   = require('../models/activity');

module.exports = AmpersandView.extend({

    initialize: function () {
        this.model = new ActivityModel();
    },

    events: {
        'click .start': 'start',
        'click .stop': 'stop'
    },

    template: `
        <div>
            <div class="content">
                <div id="map"></div>
            </div>
            <div class="bar bar-standard bar-footer bar-footer-secondary">

                <ul class="table-view">
                  <li class="table-view-cell">Time <span class="pull-right time">0</li>
                  <li class="table-view-cell">Distance <span class="pull-right distance">0.0</span></li>
                </ul>
            <div class="bar bar-standard bar-footer">
                <button class="btn btn-positive btn-block start">Go</button>
                <button class="btn btn-negative btn-block stop">Stop</button>
            </div>
        </div>
    `,

    subviews: {
        map: {
            container: '#map',
            constructor: MapView
        }
    },

    render: function () {
        this.renderWithTemplate(this);
        this.el.querySelector('.stop').style.display = 'none';
        return this;
    },

    start: function () {
        var checkpointIndex = 1;

        this.model.set('checkpoints', []);
        this.model.set('start', new Date());

        this.el.querySelector('.start').style.display = 'none';
        this.el.querySelector('.stop').style.display = 'inline';

        this.intervalId = setInterval(function () {
            this.el.querySelector('.time').innerHTML = parseInt((new Date().getTime() - this.model.start.getTime()) / 1000, 10);
        }.bind(this), 1000);

        this.model.on('change:checkpoints', function () {
            var distance = 0;
            for(; checkpointIndex < this.model.checkpoints.length ; checkpointIndex++) {
                distance += leaflet.latLng(this.model.checkpoints[checkpointIndex - 1]).distanceTo(this.model.checkpoints[checkpointIndex]);
            }
            this.el.querySelector('.distance').textContent = (parseFloat(this.el.querySelector('.distance').textContent) + (distance / 1000)).toFixed(2);
        }.bind(this));
    },

    stop: function () {
        clearInterval(this.intervalId);
        this.model.off('change:checkpoints');

        this.model.set('stop', new Date());

        this.el.querySelector('.start').style.display = 'inline';
        this.el.querySelector('.stop').style.display = 'none';

        this.el.querySelector('.time').innerHTML = '0';
        this.el.querySelector('.distance').innerHTML = '0.0';

        this.collection.add(this.model);
        this.model.save();

        this.model = new ActivityModel();
    },

    remove: function () {
        clearInterval(this.intervalId);
        AmpersandView.prototype.remove.call(this);
    }
});


