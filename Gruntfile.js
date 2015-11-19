module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'server/**/*.js', 'client/**/*.js'],
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    docco: {
      debug: {
        src: ['Tableofcontents.js','server/server.js', 'server/**/*.js', 'client/app/**/*.js'],
        options: {
          output: 'docs/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docco');
  grunt.registerTask('default', ['jshint']);

};
