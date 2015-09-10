module.exports = function (grunt) {

  grunt.initConfig({
    ts: {
      default: {
        src: ["**/*.ts", "!node_modules/**/*.ts", '!typings/**/*.ts']
      }
    },
    watch: {
      src: ["**/*.ts", "!node_modules/**/*.ts"],
      tasks: ['ts']
    },
    protractor: {
      options: {
        configFile: "protractor.conf.js",
        keepAlive: false, // If false, the grunt process stops when the test fails. 
        noColor: false,
        args: {

        }
      },
      default: {
        options: {
          configFile: "protractor.conf.js",
          args: {}
        }
      },
    },
    karma: {
      default: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['karma', 'protractor_webdriver', 'protractor']);
};