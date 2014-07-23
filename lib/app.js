document.addEventListener('DOMContentLoaded', function(event) {

    var Router  = require('./router'),
        router = new Router();

    router.history.start();

});
