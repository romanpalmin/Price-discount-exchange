'use strict';
var project = '/';
var src = './src' + project;
var dist = './build' + project;
var assets = '';
var srcAssets = src + assets;
var distAssets = dist + assets;
var deploy = './deploy' + project;

module.exports = {
    paths: {
        project: project,
        src: src,
        dist: dist,
        assets: assets,
        srcAssets: srcAssets,
        distAssets: distAssets,
        deploy: {
            js: deploy + '/js',
            css: deploy + '/css',
            index: deploy,
            images: deploy ,
            data: deploy + '/data',
            vendor: {
                js: deploy + '/js/vendor',
                css: deploy + '/css/vendor'
            }
        }
    },

    clean: {
        dest: dist
    },

    css: {
        src: [srcAssets + '/css/**/*.css', '!' + srcAssets + '/css/*.min.css'],
        dest: distAssets + '',
        images:{
            src: [srcAssets + '/css/**/*.png'],
            dest:  distAssets + ''
        }
    },

    less: {
        src: [srcAssets + '/css/less/**/*.less'],
        dest: distAssets + '/css'
    },

    js: {
        src: [
            srcAssets + '/js/modules/**/*.js',
            srcAssets + '/js/**/*.js',
            srcAssets + '/js/*.js',
            '!' + srcAssets + '/js/*.min.js',
            '!' + srcAssets + '/js/**/*.min.js',
            '!' + srcAssets + '/js/vendor/**/*.js'
        ],
        destName: 'index.js',
        dest: distAssets + '/js'
    },

    watch: {
        src: src
    },

    images: {
        src: [srcAssets + '/**/images/**/*'],
        dest: distAssets + '/images'
    },

    vendors: {
        src: {
            js: [
                './node_modules/jquery/dist/jquery.min.js',
                './node_modules/underscore/underscore-min.js',
                srcAssets + '/js/vendor/require.js'
            ],
            css: []
        },
        dist: {
            js: distAssets + '/js/vendor',
            css: distAssets + '/css/vendor'
        }
    },

    data: {
        src: srcAssets + 'data/*',
        dest: distAssets + 'data'
    },

    index: {
        src: srcAssets + '/index.html',
        dest: distAssets + ''
    },

    gc: {
        src: [src + '/**/*.compiled.css']
    }
};