module.exports = {
  server: {
    options: {
      stream: true
    },
    tasks: [
      {
        grunt: true,
        args: ['watch:ts']
      }, {
        grunt: true,
        args: ['watch:server']
      }, {
        grunt: true,
        args: ['express:default']
      }
    ]
  },
  test: {
    options: {
      spawn: true
    },
    tasks: [
      {
        cmd: './node_modules/.bin/webdriver-manager start'
      }
    ]
  },
  e2e: {
    options: {
      spawn: true
    },
    tasks: [
      {
        cmd: 'node',
        args: ['./bin/www']
      }, {
        grunt: true,
        args: ['protractor:default']
      },
    ]
  }
};