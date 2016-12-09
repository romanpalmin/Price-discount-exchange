// jshint maxparams:9
define(['underscore', 'settings', 'position', 'const', 'jquery'], function (underscore, settings, position, constants, $) {
    return {
        generateEmpty: function () {
            return new position({
                Name: 'Нет данных',
                ImageUrl: '/images/empty.jpg',
                RemainToDiscount: +0,
                CurrentDiscount: +0,
                TotalItemsSold: +0,
                id: '0'
            });
        },

        getPretenders: function (data) {
            var pretenders = underscore.where(data, {isLeader: false});
            var count = pretenders.length;
            for (var i = count; i < constants.NUMBERS_OF_PRETENDER; i++) {
                pretenders.push(this.generateEmpty(false));
            }
            return pretenders;
        },

        getLeader: function (data) {
            var leader = underscore.where(data, {isLeader: true})[0];
            if (!leader || leader.id === 0) {
                leader = this.generateEmpty(true);
            }
            return leader;
        },

        getCurrentCoinByUserIdAndColId: function (array, userId, colId) {
            var res = _.where(array, {id: userId, type: colId});
            return res.length === 1 ? res[0].coins : 0;
        },

        preloadImages: function () {
            var callback;
            var images;
            var count;
            var selector = '.preload-img';
            var img = $(selector);
            var imgPath = 'css/images/sprites/';
            if (typeof arguments[arguments.length - 1] == 'function') {
                callback = arguments[arguments.length - 1];
            } else {
                callback = false;
            }
            if (typeof arguments[0] == 'object') {
                images = arguments[0];
                count = images.length;
            } else {
                images = arguments;
                count = images.length - 1;
            }
            var not_loaded = count;
            for (var i = 0; i < count; i++) {
                img.on('load', function () {
                    if (--not_loaded < 1 && typeof callback == 'function') {
                        img.css('display', 'none');
                        callback();
                    }
                }).attr('src', imgPath + images[i]);
            }
        }

    }
});