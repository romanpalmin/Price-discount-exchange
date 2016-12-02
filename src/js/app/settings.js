define([], function () {
    return {
        fromWs: false,
        isAuto: true,
        hasPreload: true,
        server: 'http://birzhaserv',
        username: 'DataExchange',
        password: '123456',
        preloadTimes: 23,
        timeout: {
            actions: 4500,
            superAction: 4500,
            preloadActions: 2500,
            preloadSuperAction: 2500,
            showDiscountCoinAfterFilling: 1500,
            pauseBeforeShowReal: 7000,
            speedDropping: 70
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