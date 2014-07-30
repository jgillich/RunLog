var _               = require('underscore'),
    AmpersandView   = require('ampersand-view');

module.exports = AmpersandView.extend({

    template: _.template(`
        <div>
            <header class="bar bar-nav">
                <a class="icon icon-left-nav pull-left" href="#activities"></a>
                <h1 class="title">RunLog</h1>
            </header>
            <div class="content">
                <%= model.started %>
            </div>
        </div>
    `)
});