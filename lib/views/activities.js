var AmpersandView = require('ampersand-view');
var domthingify = require('domthingify');

module.exports = AmpersandView.extend({
    title: 'My Title',
    template: domthingify(`
        <div class="content">
            {{ title }}
        </div>
   `)
});
