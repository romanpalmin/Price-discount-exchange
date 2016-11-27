define([], function () {
    return {
        FROMWS: false,
        ISAUTO: true,
        hasPreload: true,
        USERNAME: 'DataExchange',
        PASSWORD: '123456',
        intervalId: 0,
        coinsTotal : 21,
        intervalIds: {
            currentActions: 0,
            superAction: 1,
            preloadCurrentAction: 2,
            preloadSuperAction: 3
        },
        timeout: {
            actions: 3500,
            superAction: 3500,
            preloadActions: 2000,
            preloadSuperAction: 2000,
            showDiscountCoinAfterFilling: 2000,
            pauseBeforeShowReal: 5000
        },
        superAction: {
            maxDiscountPercent: 100
        },
        speedDropping: 70,
        origin: 'it-173.vp.local',
        step: 0,
        maxStep: 40,
        NUMBERS_OF_PRETENDER: 3,
        url: {
            getCurrentActions: '/menu/hs/display/get-current-actions',
            getSuperAction: '/menu/hs/display/get-super-action'
        }
    };
});