var _               = require('underscore'),
    AmpersandView   = require('ampersand-view'),
    leaflet         = require('leaflet');

module.exports = AmpersandView.extend({

    template: _.template(`
        <div>
            <header class="bar bar-nav">
                <a class="icon icon-left-nav pull-left" href="#track" data-transition="slide-out"></a>
                <h1 class="title">RunLog</h1>
            </header>
            <div class="content">
                <ul class="table-view">
                    <% collection.forEach(function (activity) { %>
                        <li class="table-view-cell media">
                            <a class="navigate-right" href="#activity/<%= activity.id %>" data-transition="slide-in">
                              <img class="media-object pull-left" src="http://placehold.it/42x42">
                              <div class="media-body">
                                <%= activity.start.toDateString() %>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet.</p>
                              </div>
                            </a>
                        </li>
                    <% }); %>
                </ul>
            </div>
        </div>
    `)
});
