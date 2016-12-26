define(['app-view', 'settings'], function(view, settings){
    return {
        init: function () {
            view.init(settings.steps.step, settings.hasPreload);
        }
    };
});