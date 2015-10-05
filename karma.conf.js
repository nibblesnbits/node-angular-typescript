
// Karma configuration

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            // libs
            "public/bower/jquery/dist/jquery.js",
            "public/bower/angular/angular.js",
            "public/bower/angular-ui-router/release/angular-ui-router.js",
            // angular-mocks
            'public/bower/angular-mocks/angular-mocks.js',
            // mock stuff
            'test/unit/mocks.js',
            'node_modules/chance/dist/chance.min.js',
            // helpers
            'test/unit/phantomHelpers.js',
            // app
            "public/app/declarations.js",
            
            "public/app/common/common.js",
            "public/app/common/directives.js",
            "public/app/common/services.js",
            
            "public/app/data/dataService.js",
            
            "public/app/layout/shellController.js",
            "public/app/home/homeController.js",
            
            "public/app/app.js",
            
            // templates
            "public/app/**/*.html",
            
            // tests
            "test/unit/**/*.test.js"
        ],


        // list of files to exclude
        exclude: [
        ],
        
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'public/app/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'public/',
            // stripSuffix: '.ext',
            // prepend this to the
            // prependPrefix: 'tmpl/',
        
            // or define a custom transform function
            // - cacheId returned is used to load template
            //   module(cacheId) will return template at filepath
            // cacheIdFromPath: function(filepath) {
            //     // example strips 'public/' from anywhere in the path
            //     // module(app/templates/template.html) => app/public/templates/template.html
            //     var cacheId = filepath.strip('public/', '');
            //     return cacheId;
            // },

            // - setting this option will create only a single module that contains templates
            //   from all the files, so you can load them all with module('foo')
            // - you may provide a function(htmlPath, originalPath) instead of a string
            //   if you'd like to generate modules dynamically
            //   htmlPath is a originalPath stripped and/or prepended
            //   with all provided suffixes and prefixes
            moduleName: 'templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
}
