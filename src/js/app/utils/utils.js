define(['underscore', 'settings'], function (underscore, settings) {
    var utils = {
        generateEmpty: function (isLeader) {
            return new app.Position({
                Name: 'Нет позиции',
                ImageUrl: '/images/empty.jpg',
                RemainToDiscount: 0,
                CurrentDiscount: 0,
                isLeader: isLeader,
                id: '0'
            });
        },

        getPretenders: function (data) {
            var pretenders = underscore.where(data, {isLeader: false});
            var count = pretenders.length;
            for (var i = count; i < settings.NUMBERS_OF_PRETENDER; i++) {
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

        preloadImages(sources, callback){
            var counter = 0;
            var sprites = [];
            var img = {};

            function onLoad() {
                counter++;
                if (counter === sources.length) {
                    callback(sprites);
                }
            }

            for (var i = 0; i < sources.length; i++) {
                img = new Image();
                img.onload = img.onerror = onLoad;
                img.src = sources[i];
                sprites.push(img);
            }
        }
    };

    return utils;
});