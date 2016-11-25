/*global _, $, underscore*/
define(['jquery', 'settings', 'position', 'utils'], function ($, settings, Position, utils) {
    return {
        // Получение данных с вебсервиса
        init: function (url, callback) {
            if (settings.FROMWS) {
                this.getDataFromWs(url, callback);
            } else {
                this.getDataFromWsJson(url, callback);
            }
        },

        getDataFromWsJson: function (url, callback) {
            var self = this;
            $.ajax({

                headers: {
                    'password': settings.PASSWORD,
                    'login': settings.USERNAME
                },
                charset: 'ISO',
                method: 'GET',
                url: url,
                contentType: "text/plain",
                dataType: 'json'
            })
                .done(function (resp) {
                    if (resp.length > 0) {
                        self.getData(resp, callback);
                    }
                })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err + "," + jqxhr.responseText);
                });
        },

        getDataFromWs: function (url, callback) {
            var self = this;
            $.ajax({
                method: 'GET',
                beforeSend: function (request) {
                    request.setRequestHeader("username", settings.USERNAME);
                    request.setRequestHeader("password", settings.PASSWORD);
                },
                url: url,
                contentType: "text/plain",
                dataType: 'json'
            })
                .done(function (resp) {
                    if (resp.length > 0) {
                        self.getData(resp, callback);
                    }
                    else {
                        self.getData([utils.generateEmpty()], callback);
                    }
                })
                .fail(function (jqxhr) {
                    console.log('Статус ошибки: ' + jqxhr.status);
                    console.log('Сообщение ошибки: ' + jqxhr.responseText);
                });
        },

        getData: function (data, callback) {
            var retData = [];
            var self = this;
            var arrLength = data.length;
            if (data.length <= 0) {
                return;
            }
            data.forEach(function (item) {
                var mappingItem = self.mapItem(item);
                mappingItem.isSuperAction = false;
                retData.push(mappingItem);
                arrLength--;
                if (arrLength <= 0 && callback && typeof(callback) === "function") {
                    callback(retData);
                }
            });
        },

        mapItem: function (obj) {
            return new Position(obj);
        }
    };
});
