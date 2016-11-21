/*global _, $, underscore*/
define(['jquery', 'settings', 'position'], function ($, settings, Position) {
    var DataProcessing = {
        variables: {
            current: 0
        },
        // Получение данных с вебсервиса
        init: function (url, callback) {
            var self = this;
            if (settings.FROMWS) {
                this.getDataFromWs(url, callback);
            } else {
                self.getDataFromWsJson(url, callback);
            }
                /*if (this.variables.current < 40) {
                    settings.speedDropping = 40;
                    settings.timeout.actions = 1000;
                    settings.timeout.superAction = 1000;
                    setTimeout(function () {
                        console.log('проход № ' + self.variables.current);
                        self.getDataFromWsJson(url, callback);
                        self.variables.current++;
                    }, 1000)
                } else {
                    settings.speedDropping = 65;
                    settings.timeout.actions = 3500;
                    settings.timeout.superAction = 3500;
                    console.log('Запускаем сервис');
                    self.getDataFromWsJson(url, callback);
                }
*/
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
                })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err + "," + jqxhr.responseText);
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

    return DataProcessing;
});
