module.exports = {
    options: {
        noColor: false
    },
    default: {
        options: {
            configFile: "protractor.conf.js",
            keepAlive: false, // If false, the grunt process stops when the test fails.
            args: {}
        }
    },
};