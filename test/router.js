var test = require('tape');

test('render track', function (t) {
    setTimeout(function () {
        t.equal(document.querySelectorAll('.content').length, 1, 'content exists');
        t.equal(document.querySelectorAll('#map').length, 1, 'map exists');
        t.end();
    }, 0);
});
