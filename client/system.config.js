/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'angular:': 'app/ts/@angular'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'app/js/@angular/core/bundles/core.umd.js',
            '@angular/common': 'app/js/@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'app/js/@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'app/js/@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'app/js/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'app/js/@angular/http/bundles/http.umd.js',
            '@angular/router': 'app/js/@angular/router/bundles/router.umd.js',
            '@angular/forms': 'app/js/@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs':                       'app/js/rxjs'
            // 'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './js/main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }//,
            // 'angular2-in-memory-web-api': {
            //     main: './ts/index.js',
            //     defaultExtension: 'js'
            // }
        }
    });
})(this);