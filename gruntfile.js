'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      html: ['public/index.html'],
      javascript: ['public/js/**/*']
    },

    copy: {
      html: {
        files: [{
          cwd: 'app/client/',
          src: 'index.html',
          dest: 'public/',
          expand: true
        }]
      },
      css:{
        files:[{
          cwd: 'app/',
          src: ['*.css'],
          dest: 'public/',
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
      angular: {
        files: [{
          cwd: 'node_modules/angular/',
          src: ['angular.min.js'],
          dest: 'public/',
          expand: true
        }]
      },
      images: {
        files: [{
          cwd: 'app/client/images/',
          src: ['*.png', '*.gif', '*.jpg'],
          dest: 'public/images/',
          expand: true
        }]
      },
      fonts: {
        files: [{
          cwd: 'app/fonts/',
          src: ['*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2', '*.otf'],
          dest: 'public/fonts/',
          expand: true,
        }]
      },
    },
    concat: {
      options: {
        sourceMap: true
      },
      dist: {
        src: ['app/client/js/game.module.js', 'app/client/js/**/*.js'],
        dest: 'public/js/app.js'
      }
    },

    watch: {
      scripts: {
        files: ['app/client/js/**/*.js', 'app/client/**/*.html', 'app/client/templates/**/*.html', 'app/client/sass/**/*.scss', 'app/client/**/*.css'],
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

    jshint: {
      source: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['app/client/js/**/*.js']
        }
      }
    },

    karma: {
      all: {
        options: {
          frameworks: ['mocha', 'chai'],
          browsers: ['Chrome'],
          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/client/js/game.module.js',
            'app/client/js/**/*.js',
            'spec/client/test/**/*.spec.js'
          ],
          singleRun: true,
          preprocessors: {
            'app/client/js/**/*.js': ['coverage'],
          },
          reporters: ['dots', 'coverage'],
          coverageReporter: {
            type : 'text-summary',
            dir : 'coverage/'
          }
        }
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          'public/js/app.js': 'public/js/app.js'
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['jshint', /*'karma',*/ 'clean', 'sass', 'copy', 'concat', 'babel']);

};
