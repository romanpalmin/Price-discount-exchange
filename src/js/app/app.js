define(['app-view', 'settings'], function(view, settings){
    var app = {
        init: function () {
            app.currentPretendersArray = [];
            app.currentLeader = {};
            view.init(settings.step, settings.ISAUTO);
        }
    };
    return app;
});