module.exports = {
  default: {
    files: [{
      expand: true,
      cwd: 'public/assets/css',
      src: ['**/*.less'],
      dest: 'public/assets/css',
      ext: '.css',
    }, ]
  }
};