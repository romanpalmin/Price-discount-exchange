define(['app-view', 'settings'], function(view, settings){
    var app = {
        init: function () {
            app.currentPretendersArray = [];
            app.currentLeader = {};
            view.init(settings.steps.step, settings.isAuto);
        }
    };
    return app;
});