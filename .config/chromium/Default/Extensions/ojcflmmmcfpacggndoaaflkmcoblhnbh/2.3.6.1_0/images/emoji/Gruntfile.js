module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('freight-truck');
  grunt.loadNpmTasks('compression-cat');

  var found = grunt.file.glob.sync('gemoji/images/emoji/unicode/*.png');
  var files = found;

  grunt.initConfig({
    'compression-cat': {
      'options': {
        'files': files,
        'compression':7
      }
    },
    'freight-truck': {
      'options': {
        'files': files,
        'cdn': {
          'bucket': 'wunderlist2',
          'key': 'AKIAIQVKLISOJW4X343A',
          'secret': '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'
        },
        'remotePath': '/emoji/',
        'useLocalFolderStructure':false,
        'baseDir':  __dirname
      }
    }
  });

  grunt.registerTask('default', ['freight-truck', 'compression-cat']);
};
