define([], function () {
    return {
        FROMWS: false,
        ISAUTO: true,
        USERNAME: 'DataExchange',
        PASSWORD: '123456',
        intervalId: 0,
        intervalIds: {
            currentActions: 0,
            superAction: 1
        },
        timeout: {
            actions: 3500,
            superAction: 3500
        },
        superAction: {
            maxDiscountPercent: 55
        },
        speedDropping: 65,
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