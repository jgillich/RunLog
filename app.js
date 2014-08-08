require('string.prototype.contains');

document.addEventListener('DOMContentLoaded', function() {

    var Router  = require('./lib/router'),
        router  = new Router();

    router.history.start();

});
