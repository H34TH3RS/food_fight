'use strict';

module.exports = function(grunt){

  grunt.initConfig({

    clean:{
      html: ['public/index.html'],
      javascript: ['public/js/**/*']
    },

    copy:{
      html:{
        files:[{
          cwd:'app/client/',
          src:'index.html',
          dest:'public/',
          expand: true
        }]
      },
      templatesHtml: {
        files: [{
          cwd: 'app/client/templates/',
          src: ['*.html'],
          dest: 'public/templates/',
          expand: true
        }]
      },
      angular:{
        files: [{
          cwd:'node_modules/angular/',
          src:['angular.min.js'],
          dest:'public/',
          expand: true
        }]
      }
    },

    concat:{
      options: {
        sourceMap: true
      },
      dist:{
        src:['app/client/js/game.module.js', 'app/client/js/**/*.js'],
        dest: 'public/js/app.js'
      }
    },

    watch: {
      scripts: {
        files: ['app/client/js/**/*.js', 'app/client/**/*.html',     'app/client/templates/**/*.html'],
        tasks: ['clean', 'copy', 'concat', 'sass'],
        options: {
          spawn: false,
        }
      }
    },

    sass: {
      all: {
        files: {
          'public/style.css': 'app/client/sass/main.scss'
        }
      }
    },

    babel: {
      all: {
        options: {
          presets: ['es2015'],
          sourceMap: true
        },
        files:{
          'public/js/app.js': 'public/js/app.js'
        }
      }
    },

    jshint:{
      source:{
        options:{
          jshintrc:'.jshintrc'
        },
        files:{
          src:['app/client/js/**/*.js']
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['jshint', 'clean','concat','babel', 'copy','sass']);
};
