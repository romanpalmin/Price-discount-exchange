define([], function () {
    return {
        FROMWS: false,
        ISAUTO: true,
        USERNAME: 'DataExchange',
        PASSWORD: '123456',
        intervalId: 0,
        coinsTotal : 20,
        intervalIds: {
            currentActions: 0,
            superAction: 1,
            preloadCurrentAction: 2,
            preloadSuperAction: 3
        },
        timeout: {
            actions: 2500,
            superAction: 2500,
            preloadActions: 500,
            preloadSuperAction: 500
        },
        superAction: {
            maxDiscountPercent: 100
        },
        speedDropping: 50,
        origin: 'it-173.vp.local',
        step: 0,
        maxStep: 34,
        NUMBERS_OF_PRETENDER: 3,
        url: {
            getCurrentActions: '/menu/hs/display/get-current-actions',
            getSuperAction: '/menu/hs/display/get-super-action'
        }
    };
});