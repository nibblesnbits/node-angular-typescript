exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3000',
    specs: [ 'test/e2e/*.spec.js' ],
    onPrepare: function() {
    },
    allScriptsTimeout: 110000,
    rootElement: 'body',

    capabilities: { 'browserName': 'chrome' },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};