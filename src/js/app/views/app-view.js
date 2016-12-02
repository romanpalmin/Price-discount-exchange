// jshint maxparams:9
define(['jquery', 'app', 'settings', 'data-processing', 'utils', 'coin-set', 'const', "underscore"], function ($, app, settings, process, utils, cset, constants, _) {
    var appView;
    appView = {
        isPreloader: false,
        blocks: {
            preloader: {
                div: '.preloader',
                percent: '.preloading-percent'
            }
        },

        pretenders: {
            currentPretenders: [],
            currentCoinsInGlass: [],
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

        intervalIds: {
            action: 0,
            superaction: 1
        },

        colors: {
            1: 'green',
            2: 'yellow',
            3: 'red',
            4: 'blue'
        },

        spinners: {
            col1: false,
            col2: false,
            col3: false,
            col4: false
        },

        destroy: {
            col1: false,
            col2: false,
            col3: false,
            col4: false
        },

        burst: {
            col1: false,
            col2: false,
            col3: false,
            col4: false
        },

        falling: {
            col1: true,
            col2: true,
            col3: true,
            col4: true
        },

        currentCoinsInGlass: {
            col1: 0,
            col2: 0,
            col3: 0,
            col4: 0
        },

        step: 0,

        init: function (curStep, isSequence) {
            var self = this;
            //settings.steps.step = 
            this.step = !curStep ? settings.steps.startStep : curStep;
            if (isSequence) {
                if (settings.hasPreload) {
                    this.preloadData(function () {
                        self.sequence();
                    });
                }
                else {
                    self.sequence();
                }
            }
        },

        preloadData: function (callback) {
            this.isPreloader = true;
            var isPreloaded = false;
            var self = this;
            var counterSuperAction = 0;
            var counterActions = 0;
            var path = 'data/preloader/';
            var urlPreffixSuperAction = path + 'pl_sws';
            var urlPreffixActions = path + 'pl_ws';
            var urlPostfix = '.json';
            var url = '';
            var currentPreloadPercent = 0;
            $(self.blocks.preloader.div).fadeIn('fast');


            var preloadSuperActionInterval = setInterval(function () {
                if (counterActions >= settings.preloadTimes) {
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
                currentPreloadPercent += parseInt(100/23);
                if (currentPreloadPercent > 100) {
                    currentPreloadPercent = 100;
                }
                if (counterActions >= settings.preloadTimes) {
                    PostPreLoading();
                    if (isPreloaded) {
                        clearInterval(preloadActionsInterval);
                    }
                } else {
                    $(self.blocks.preloader.percent).html(currentPreloadPercent);
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
                if (counterActions === settings.preloadTimes && counterSuperAction === settings.preloadTimes && !isPreloaded) {
                    self.startRealApp(callback);
                }
                isPreloaded = true;
            }
        },

        startRealApp: function (callback) {
            var self = this;
            self.isPreloader = false;
            $('.current-glass.col4').find('div.super-action-percent').css('top', constants.GLASSBOTTOM);
            if (callback && typeof(callback) === "function") {
                callback();
            }
            setTimeout(function () {
                $(self.blocks.preloader.div).fadeOut('slow');
            }, settings.timeout.pauseBeforeShowReal);

        },

        initData: function (actionType) {
            var self = this;
            var urlCurrentActions;
            var urlSuperAction;
            if (!settings.fromWs) {
                if (this.step === settings.steps.startStep) {
                    this.step++;
                }
                urlCurrentActions = 'data/nws' + this.step + '.json';
                urlSuperAction = 'data/nsws' + this.step + '.json';
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
                    self.drawPretender(4, data[0]);
                }
            }
        },

        drawDroppingCoinInGlass: function (options, callback) {
            var minImgId = 1;
            var self = this;
            var colId = options.colId;
            var coinNum = options.coinNum;
            var currentGlass = options.currentGlass;
            var isExplosive = options.isExplosive;
            var className = 'icon-';
            var newClass = '';
            var letter = this.colors[colId][0];
            var maxImgId;
            var discount = 20;
            var currentCol = 'col' + colId;

            if (currentGlass && coinNum > 0 && coinNum <= 20) {
                var currentCoinArr = cset.coins[this.colors[colId]];
                var i = minImgId;
                maxImgId = currentCoinArr[coinNum - 1];
                var timerId = setInterval(function () {
                    newClass = className + 'f-' + letter + '-' + coinNum + '-' + i;

                    if (self.falling[currentCol]) {
                        currentGlass.removeClass().addClass('changing-class');
                        currentGlass.addClass(newClass);
                    }
                    if (i === maxImgId - 1) {
                        clearInterval(timerId);
                        if (callback && typeof(callback) === "function") {
                            callback();
                        }
                    }
                    i++;
                }, settings.timeout.speedDropping);
            }
            // проверяем, не пора ли туглить стаканы и крутилку скидки для акций
            if (colId !== 4) {
                self.currentCoinsInGlass[currentCol] = coinNum;
                if (isExplosive) {
                    // стартуем взрыв через showDiscountCoinAfterFilling/1000 секунд после падения
                    setTimeout(function () {
                        startBurst();
                    }, settings.timeout.showDiscountCoinAfterFilling);
                }
                else {
                    self.spinners[currentCol] = false;
                }
            }

            function startBurst() {
                var burstIndex = 1;
                self.falling[currentCol] = false;
                self.burst[currentCol] = true;
                var burstInterval = setInterval(function () {
                    newClass = className + 'b-' + letter + '-' + discount + '-' + burstIndex;
                    currentGlass.removeClass().addClass('changing-class').addClass(newClass);

                    if (burstIndex === constants.FRAMES_IN_BURST) {
                        startSpinner();
                        self.burst[currentCol] = false;
                        clearInterval(burstInterval);
                    }
                    burstIndex++;
                }, settings.timeout.speedDropping);

            }

            function startSpinner() {
                var spinnerIndex = 1;
                var spinnerMax = constants.FRAMES_IN_SPINNER;
                self.spinners[currentCol] = true;
                var spinnerTimer = setInterval(function () {
                    newClass = className + 's-' + letter + '-' + discount + '-' + spinnerIndex;
                    currentGlass.removeClass().addClass('changing-class').addClass(newClass);
                    if (!self.burst[currentCol] && !self.spinners[currentCol]) {
                        if (spinnerIndex === 14) {
                            self.spinners[currentCol] = false;
                            startDestroy();
                            clearInterval(spinnerTimer);
                        }
                    }
                    spinnerIndex++;
                    if (spinnerIndex > spinnerMax) {
                        spinnerIndex = 1;
                    }
                }, settings.timeout.speedDropping);
            }

            function startDestroy() {
                var destroyIndex = 1;
                var arrayOfFallingFrames = cset.coins[self.colors[colId]];
                var lastIndex = arrayOfFallingFrames[arrayOfFallingFrames.length - 1];
                var stepIndex = self.currentCoinsInGlass[currentCol];
                self.destroy['col' + colId] = true;
                var destroyMax = constants.FRAMES_IN_DESTROY;
                if (stepIndex === 0){
                    stepIndex = 1;
                    lastIndex = 1;
                }
                var destroyTimer = setInterval(function () {
                    if (!self.spinners[currentCol]) {
                        newClass = className + 'd-' + letter + '-' + discount + '-' + destroyIndex;
                        currentGlass.removeClass().addClass('changing-class').addClass(newClass);
                    }
                    destroyIndex++;
                    if (destroyIndex === destroyMax) {
                        // получаем и устанавливаем последний кадр анимации падения для отображения реального состояния
                        newClass = className + 'f-' + letter + '-' + stepIndex + '-' + lastIndex;
                        currentGlass.removeClass().addClass('changing-class').addClass(newClass);

                        // включаем падение и выключаем
                        self.destroy['col' + colId] = false;
                        self.falling[currentCol] = true;
                        clearInterval(destroyTimer);
                    }

                }, settings.timeout.speedDropping);
            }
        },

        drawEmptyGlass: function (options) {
            var colId = options.colId;
            this.spinners['col' + colId] = false; // сброс крутилки
            var currentGlass = options.currentGlass;
            var letter = this.colors[colId][0];
            var newClass = 'icon-f-' + letter + '-1-1';
            currentGlass.removeClass().addClass('changing-class');
            currentGlass.addClass(newClass);

        },

        drawPretender: function (colId, pretenderItem) {
            var curCoins = {id: pretenderItem.id, coins: pretenderItem.currentCoin, type: colId};
            var savedCoins = +utils.getCurrentCoinByUserIdAndColId(this.pretenders.currentCoinsInGlass, pretenderItem.id, colId);

            var isDropCoin = (savedCoins !== pretenderItem.currentCoin);
            var currentColumn = $('.current-glass.col' + colId);
            var currentTitle = currentColumn.find('span.position-name');
            var currentCoins = currentColumn.find('img.coins');
            var currentCoinsForClass = currentColumn.find('div.changing-class');
            var currentRest = $('span.rest.col' + colId);
            var currentPercentDiscount = currentColumn.find('div.super-action-percent');
            var currentLogo = currentColumn.find('img.position-logo');

            var options = {
                colId: colId,
                currentCoinsInGlass: currentCoins,
                coinNum: pretenderItem.currentCoin ? pretenderItem.currentCoin : 0,
                currentGlass: currentCoinsForClass,
                isExplosive: pretenderItem.isExplosive
            };
            if (options && options.coinNum >= 0 && isDropCoin) {
                this.drawDroppingCoinInGlass(options, updateInfo);
                this.pretenders.currentCoinsInGlass = _.without(this.pretenders.currentCoinsInGlass, _.findWhere(this.pretenders.currentCoinsInGlass, {
                    id: pretenderItem.id,
                    type: colId
                }));
                this.pretenders.currentCoinsInGlass.push(curCoins);
            }
            else {
                if (pretenderItem.currentCoin === 0) {
                    this.drawEmptyGlass(options);
                }
                updateInfo();
            }
            function updateInfo() {
                if (options && options.coinNum >= 0 && isDropCoin) {
                    currentPercentDiscount.css('top', constants.GLASSBOTTOM - constants.COINHEIGHT * options.coinNum);
                }
                currentTitle.html(pretenderItem.name);
                currentRest.html(pretenderItem.remainToDiscount);
                if (settings.fromWs && pretenderItem.imageUrl) {
                    currentLogo.attr('src', settings.server + pretenderItem.imageUrl);
                }
                if (colId === 4) {
                    currentPercentDiscount.html(pretenderItem.currentDiscountSuperAction);
                    if (pretenderItem.currentCoin === 0) {
                        currentPercentDiscount.css('top', constants.GLASSBOTTOM);
                    }
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
            this.intervalIds.action = setInterval(function () {
                if (self.step >= settings.steps.maxStep) {
                    self.step = settings.steps.startStep;
                }
                self.step += 1;
                self.initData(self.actionType.currentAction);
            }, settings.timeout.actions);

            this.intervalIds.superaction = setInterval(function () {
                self.initData(self.actionType.superAction);
            }, settings.timeout.superAction);
        },

        stopActions: function () {
            clearInterval(this.intervalIds.action);
            clearInterval(this.intervalIds.superaction);

        }
    };
    return appView;
});