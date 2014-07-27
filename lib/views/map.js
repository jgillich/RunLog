var _                   = require('underscore'),
    AmpersandView       = require('ampersand-view'),
    leaflet             = require('leaflet');

module.exports = AmpersandView.extend({

    watchPosition: function () {
        navigator.geolocation.clearWatch(this.watchId);

        this.watchId = navigator.geolocation.watchPosition(function (pos) {

            var latlng = [pos.coords.latitude, pos.coords.longitude],
                lastLatLng = this.parent.model.checkpoints[this.parent.model.checkpoints.length - 1];

            this.map.setView(latlng);
            this.marker.setLatLng(latlng);

            if(this.parent.model.start && (!lastLatLng || leaflet.latLng(lastLatLng).distanceTo(latlng) > 10)) {

                if(!this.line) {
                    this.line = leaflet.polyline([latlng], { color: '#5CB85C' }).addTo(this.map);
                } else {
                    this.line.addLatLng(latlng);
                }

                // is there a better way? just push doesn't work
                this.parent.model.set('checkpoints', this.parent.model.checkpoints.concat([latlng]));
                this.parent.model.trigger('change:checkpoints');

            }

        }.bind(this), null, {
           enableHighAccuracy: true
        });
    },


    render: function () {

        this.map = leaflet.map(this.el, {
            attributionControl: false,
            zoomControl: false
        }).setView([51.505, -0.09], 13);

        leaflet.tileLayer('//api.tiles.mapbox.com/v4/jgillich.j17b1kfe/{z}/{x}/{y}.jpg90?access_token=pk.eyJ1IjoiamdpbGxpY2giLCJhIjoibE0zdGo2OCJ9.3I2fTYfVf91jX8X7YzeAWA').addTo(this.map);

        this.el.style.height = '100%';
        this.map.invalidateSize();

        navigator.geolocation.getCurrentPosition(function(pos) {
            var latlng = [pos.coords.latitude, pos.coords.longitude];

            this.map.setView(latlng, 16);
            this.marker =  leaflet.circleMarker(latlng, {
                    color: '#428BCA',
                    fillColor: '#428BCA',
                    fillOpacity: 0.7,
                    weight: 2,
                    opacity: 0.9,
                    radius: 5
                }).addTo(this.map);

            this.watchPosition();
        }.bind(this));

        return this;
    },

    remove: function () {
        navigator.geolocation.clearWatch(this.watchId);
        AmpersandView.prototype.remove.apply(this, arguments);
    }

});


