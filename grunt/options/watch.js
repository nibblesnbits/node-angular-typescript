module.exports = {
  ts: {
    files: ["**/*.ts", "!node_modules/**/*.ts"],
    tasks: ['ts']
  },
  less: {
    files: ["public/**/*.less"],
    tasks: ['less']
  }
};