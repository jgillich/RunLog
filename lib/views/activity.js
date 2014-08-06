var _               = require('underscore'),
    AmpersandView   = require('ampersand-view');

module.exports = AmpersandView.extend({

    template: _.template(`
        <div>
            <header class="bar bar-nav">
                <a class="icon icon-left-nav pull-left" href="#activities" data-transition="slide-out"></a>
                <h1 class="title">RunLog</h1>
            </header>
            <div class="content">
                <ul class="table-view">
                    <li class="table-view-cell">Start <span class="push-right"><%= model.start.toDateString() %></span></li>
                </ul>

            </div>
        </div>
    `)
});
