// Code derived from Rachet
// Licensed under the MIT license
// https://github.com/twbs/ratchet/blob/master/LICENSE

var isScrolling,
    target;

var findTarget = function(target) {
    var i;
    var toggles = document.querySelectorAll('a');

    for (; target && target !== document; target = target.parentNode) {
        for (i = toggles.length; i--;) {
            if (toggles[i] === target) {
                return target;
            }
        }
    }
};


var getTarget = function(e) {
    var target = findTarget(e.target);

    if (!target ||
        e.which > 1 ||
        e.metaKey ||
        e.ctrlKey ||
        isScrolling ||
        location.protocol !== target.protocol ||
        location.host !== target.host ||
        !target.hash && /#/.test(target.href)
       ) {
        return;
    }

    return target;
};

window.addEventListener('touchstart', function() {
    isScrolling = false;
});
window.addEventListener('touchmove', function() {
    isScrolling = true;
});
window.addEventListener('click', function(e) {
    var t = getTarget(e);
    if(t) target = t;
});

module.exports = function () {
    return target;
};
