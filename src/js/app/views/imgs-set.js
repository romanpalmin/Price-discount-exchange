define([], function () {
    var dir = 'images/sprites/';
    var preffix = 'sprite-';
    var letters = ['blue', 'green', 'yellow', 'red'];
    var resultImgs = [];
    letters.forEach(function (item) {
        var currentImgUrl = '';
        for (var i = 1; i <= 20; i++) {
            currentImgUrl = dir + item + '/' + preffix + item[0] + '-' + i + '.png';
            resultImgs.push(currentImgUrl);
        }
    });
    return resultImgs;
});