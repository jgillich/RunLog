var test = require('tape');

test('render track', function (t) {
    location.hash = '#track';
    setTimeout(function () {
        t.ok(document.querySelector('.content') !== null, 'content exists');
        t.ok(document.querySelector('#map') !== null, 'map exists');
        t.end();
    }, 0);
});
