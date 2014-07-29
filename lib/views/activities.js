var _               = require('underscore'),
    domify          = require('domify'),
    AmpersandView   = require('ampersand-view');

module.exports = AmpersandView.extend({

    template: _.template(`
        <div class="content">
            <ul class="table-view">
                <% collection.forEach(function (activity) { %>
                    <li class="table-view-cell media">
                        <a class="navigate-right">
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
    `),

    render: function () {
        this.renderWithTemplate(this);
        console.log(this.collection);
        return this;
    }
});
