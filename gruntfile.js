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
      }
    },

    angular:{
      files: [{
          cwd:'node_modules/angualar/',
          src:['angular.js'],
          dest:'public/js/',
          expand: true
        }]
    },

    concat:{
      options: {
        sourceMap: true
      },
      dist:{
        src:['app/client/js/game.module.js', 'app/client/js/**/*.js'],
        dest: 'public/js/app.js'
      }
    }


  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');



};