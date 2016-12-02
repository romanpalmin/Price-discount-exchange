define([], function () {
    return {
        fromWs: false,
        isAuto: true,
        hasPreload: false,
        server: 'http://birzhaserv',
        username: 'DataExchange',
        password: '123456',
        preloadTimes: 23,
        timeout: {
            actions: 2500,
            superAction: 2500,
            preloadActions: 2300,
            preloadSuperAction: 2300,
            showDiscountCoinAfterFilling: 1500,
            pauseBeforeShowReal: 3000,
            speedDropping: 65
        },
        steps:{
            step: 0,
            maxStep: 40,
            startStep: 0
        },

        url: {
            getCurrentActions: 'http://DataExchange:123456@birzhaserv/menu/hs/display/get-current-actions',
            getSuperAction: 'http://DataExchange:123456@birzhaserv/menu/hs/display/get-super-action'
        }
    };
});