// jshint maxparams:9
define(['jquery', 'app', 'settings', 'data-processing', 'utils', 'coin-set'], function ($, app, settings, process, utils, cset) {
    var appView;
    appView = {
        pretenders: {
            currentPretenders: [],
            currentCoins: [],
            prevPretenders: []
        },

        superAction: {
            currentAction: {},
            newAction: {}
        },
        actionType: {
            currentAction: true,
            superAction: false
        },

        colors: {
            1: 'green',
            2: 'yellow',
            3: 'red',
            4: 'blue'
        },

        init: function (curStep, isSequence) {
            var self = this;
            settings.step = !curStep ? 0 : curStep;
            if (isSequence) {
                this.preloadData(function () {
                    self.sequence();
                });
            }
        },

        preloadData: function (callback) {
            var isPreloaded = false;
            var self = this;
            var counterSuperAction = 0;
            var counterActions = 0;
            var path = 'data/preloader/';
            var urlPreffixSuperAction = path + 'pl_sws';
            var urlPreffixActions = path + 'pl_ws';
            var urlPostfix = '.json';
            var url = '';

            var preloadSuperActionInterval = setInterval(function () {
                if (counterActions >= settings.coinsTotal) {
                    PostPreLoading();
                    if (isPreloaded) {
                        clearInterval(preloadSuperActionInterval);
                    }
                }
                else {
                    counterSuperAction++;
                }
                if (!isPreloaded) {
                    url = urlPreffixSuperAction + counterSuperAction + urlPostfix;
                    processPreload(url, self.actionType.superAction);
                }
            }, settings.timeout.preloadSuperAction);

            var preloadActionsInterval = setInterval(function () {
                if (counterActions >= settings.coinsTotal) {
                    PostPreLoading();
                    if (isPreloaded) {
                        clearInterval(preloadActionsInterval);
                    }
                } else {
                    counterActions++;
                }

                if (!isPreloaded) {
                    url = urlPreffixActions + counterActions + urlPostfix;
                    processPreload(url, self.actionType.currentAction);
                }
            }, settings.timeout.preloadSuperAction);

            function processPreload(url, actionType) {
                process.init(url, function (resp) {
                    self.render(resp, actionType);
                });
            }

            function PostPreLoading() {
                if (counterActions >= settings.coinsTotal && counterSuperAction >= settings.coinsTotal && !isPreloaded) {
                    self.startRealApp(callback);
                }
                isPreloaded = true;
            }
        },

        startRealApp: function (callback) {
            $('.preloader').fadeOut();
            if (callback && typeof(callback) === "function") {
                callback();
            }

        },

        initData: function (actionType) {
            var self = this;
            var urlCurrentActions;
            var urlSuperAction;
            if (!settings.FROMWS) {
                if (settings.step === 0) {
                    settings.step++;
                }
                urlCurrentActions = 'data/nws' + settings.step + '.json';
                urlSuperAction = 'data/nsws' + settings.step + '.json';
            } else {
                urlCurrentActions = settings.url.getCurrentActions;
                urlSuperAction = settings.url.getSuperAction;
            }

            if (actionType === this.actionType.currentAction) {
                process.init(urlCurrentActions, function (resp) {
                    //console.log('Данные акции...');
                    self.render(resp, actionType);
                });
            } else {
                process.init(urlSuperAction, function (resp) {
                    //console.log('Данные суперакции...');
                    self.render(resp, actionType);
                });
            }
        },
        // todo написать функцию поиска новых и старых позиций
        getCurrentPretenders: function (data) {
            return data;
        },

        render: function (data, actionType) {
            var self = this;
            var newPretenders;
            if (actionType === this.actionType.currentAction) {
                // Обрабатываем текущую акцию
                if (this.pretenders.currentPretenders.length === 0) {
                    //console.log('Инициируем массив...');
                    this.pretenders.currentPretenders = data;
                    data.forEach(function (item, index) {
                            self.drawPretender(index + 1, item);
                        }
                    );
                }
                else {
                    newPretenders = this.getCurrentPretenders(data);
                    newPretenders.forEach(function (item, index) {
                        self.drawPretender(index + 1, item);
                    });
                    this.pretenders.currentPretenders = newPretenders;
                }
            }
            else {

                // обрабатываем суперакцию
                if (data.length === 1) {
                    data[0].currentCoin = data[0].currentDiscount;
                    if (data[0].currentCoin) {
                        data[0].currentCoin = Math.round(+data[0].currentCoin / (settings.superAction.maxDiscountPercent / 20));
                    }
                    self.drawPretender(4, data[0]);
                }
            }
        },

        drawDroppingCoinInGlass: function (options, callback) {
            var minImgId = 0;
            var colId = options.colId;
            var coinNum = options.coinNum;
            var currentGlass = options.currentGlass;
            var className = 'icon-';
            var newClass = '';
            var letter = this.colors[colId][0];
            var maxImgId;
            if (currentGlass && coinNum > 0 && coinNum <= 20) {
                var currentCoinArr = cset.coins[this.colors[colId]];
                var i = minImgId;
                maxImgId = currentCoinArr[coinNum - 1];
                var timerId = setInterval(function () {
                    newClass = className + letter + '_' + coinNum + '_' + i;
                    currentGlass.removeClass().addClass('changing-class');
                    currentGlass.addClass(newClass);
                    if (i === maxImgId - 1) {
                        clearInterval(timerId);
                        if (callback && typeof(callback) === "function") {
                            callback();
                        }
                    }
                    i++;
                }, settings.speedDropping);
            }
        },

        drawEmptyGlass: function (options) {
            var colId = options.colId;
            var currentGlass = options.currentGlass;
            var letter = this.colors[colId][0];
            var newClass = 'icon-' + letter + '_1_0';
            currentGlass.removeClass().addClass('changing-class');
            currentGlass.addClass(newClass);

        },

        drawPretender: function (colId, pretenderItem) {
            var curCoins = {id: pretenderItem.id, coins: pretenderItem.currentCoin, type: colId};
            var savedCoins = +utils.getCurrentCoinByUserIdAndColId(this.pretenders.currentCoins, pretenderItem.id, colId);

            var isDropCoin = (savedCoins !== pretenderItem.currentCoin);
            var currentColumn = $('.current-glass.col' + colId);
            var currentTitle = currentColumn.find('span.position-name');
            var currentCoins = currentColumn.find('img.coins');
            var currentCoinsForClass = currentColumn.find('div.changing-class');
            var currentRest = $('span.rest.col' + colId);
            var currentPercentDiscount = currentColumn.find('div.super-action-percent');
            var options = {
                colId: colId,
                currentCoins: currentCoins,
                coinNum: pretenderItem.currentCoin ? pretenderItem.currentCoin : 0,
                currentGlass: currentCoinsForClass
            };

            if (options && options.coinNum >= 0 && isDropCoin) {
                this.drawDroppingCoinInGlass(options, updateInfo);
                this.pretenders.currentCoins = _.without(this.pretenders.currentCoins, _.findWhere(this.pretenders.currentCoins, {
                    id: pretenderItem.id,
                    type: colId
                }));
                this.pretenders.currentCoins.push(curCoins);
            }
            else {
                if (pretenderItem.currentCoin === 0) {
                    this.drawEmptyGlass(options);
                }
                updateInfo();
            }
            function updateInfo() {
                currentTitle.html(pretenderItem.name);
                currentRest.html(pretenderItem.remainToDiscount);
                if (colId === 4) {
                    currentPercentDiscount.html(pretenderItem.currentDiscountSuperAction);
                }
            }
        },

        getColumnId: function (item) {
            var colId = $('[data-id=' + item.id + ']').attr('data-col-id');
            return item.id && item.id !== 0 && item.id !== '0' ? colId : 0;
        },
        
        sequence: function () {
            var self = this;
            this.initData(self.actionType.currentAction);
            this.initData(self.actionType.superAction);
            settings.intervalIds.currentActions = setInterval(function () {
                if (settings.step >= settings.maxStep) {
                    settings.step = 0;
                }
                settings.step += 1;
                self.initData(self.actionType.currentAction);
            }, settings.timeout.actions);

            settings.intervalIds.superAction = setInterval(function () {
                self.initData(self.actionType.superAction);
            }, settings.timeout.superAction);
        }
    };
    return appView;
});