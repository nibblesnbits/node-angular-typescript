module.exports = function(grunt) {

  grunt.initConfig({
    ts: {
      default : {
        src: ["**/*.ts", "!node_modules/**/*.ts", '!typings/**/*.ts'],
        // options: {
        //   declaration: true
        // }
      }
    },
    watch: {
      files: ["**/*.ts", "!node_modules/**/*.ts"],
      tasks: ['ts']
    }
  });

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  
};