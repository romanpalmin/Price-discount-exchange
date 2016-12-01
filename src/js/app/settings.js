define([], function () {
    return {
        FROMWS: false,
        ISAUTO: true,
        hasPreload: false,
        server: 'http://birzhaserv',
        USERNAME: 'DataExchange',
        PASSWORD: '123456',
        intervalId: 0,
        coinsTotal : 21,
        preloadTimes: 23,
        intervalIds: {
            currentActions: 0,
            superAction: 1,
            preloadCurrentAction: 2,
            preloadSuperAction: 3
        },
        timeout: {
            actions: 2300,
            superAction: 2300,
            preloadActions: 2300,
            preloadSuperAction: 2300,
            showDiscountCoinAfterFilling: 4000,
            pauseBeforeShowReal: 3000
        },
        superAction: {
            maxDiscountPercent: 100
        },
        speedDropping: 50,
        origin: 'it-173.vp.local',
        step: 0,
        maxStep: 40,
        NUMBERS_OF_PRETENDER: 3,
        url: {
            getCurrentActions: 'http://DataExchange:123456@birzhaserv/menu/hs/display/get-current-actions',
            getSuperAction: 'http://DataExchange:123456@birzhaserv/menu/hs/display/get-super-action'
        }
    };
});