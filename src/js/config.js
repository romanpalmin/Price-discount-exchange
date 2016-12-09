requirejs.config({

    paths: {
        "app" : "app/app",
        "index" : "app/index",
        "utils" : "app/utils/utils",
        "position" : "app/models/position",
        "app-view" : "app/views/app-view",
        "coin-set" : "app/views/coin-sets",
        "images" : "app/views/images-set",
        "data-processing" : "app/controllers/data-processing",
        "jquery" : "vendor/jquery.min",
        "underscore" : "vendor/underscore-min",
        "settings" : "app/settings",
        "const" : "app/utils/const",
        "preloader" : "vendor"
    }
});

require(['app'],function(app){
    app.init();
});
