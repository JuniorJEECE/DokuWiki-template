module.exports = function(grunt) {

  'use strict';

  // Grunt configuration.
  grunt.initConfig({

    // Load the configuration file.
    pkg: grunt.file.readJSON('package.json'),

    // Configuration variables.
    meta: {
      bowerComponents: 'bower_components',    // bower components directory
      cssLibs: 'css/libs'                     // private assets directory
    },

    // Create symbolic links to ease the access to ressources without manually moving them.
    symlink: {
      options: {
        overwrite: true  // overwrite existing files or folders if already exists
      },

      // Font-Awesome: takes LESS and glyphicons
      fontawesome: {
        files: [
          // LESS files
          {
            expand: true,
            overwrite: true,
            cwd: '<%= meta.bowerComponents %>/font-awesome/less',
            src: ['**/*.less'],
            dest: '<%= meta.cssLibs %>/font-awesome'
          },
          // Glyphicons
          {
            expand: true,
            overwrite: true,
            cwd: '<%= meta.bowerComponents %>/font-awesome/fonts',
            src: ['*'],
            dest: 'images/glyphicons/font-awesome'
          }
        ]
      },

      // Twitter Bootstrap: takes SCSS files, minified JS and glyphicons
      bootstrap: {
        files: [
          // LESS files
          {
            expand: true,
            overwrite: true,
            cwd: '<%= meta.bowerComponents %>/bootstrap/less',
            src: ['**/*.less'],
            dest: '<%= meta.cssLibs %>/bootstrap'
          },
          // Glyphicons
          {
            expand: true,
            overwrite: true,
            cwd: '<%= meta.bowerComponents %>/bootstrap/fonts',
            src: ['*'],
            dest: 'images/glyphicons/bootstrap'

          }
          // JS files
          // {
          //   overwrite: true,
          //   src: ['<%= meta.bowerComponents %>/bootstrap/dist/js/bootstrap.min.js'],
          //   dest: '<%= meta.privateAssets %>/js/libs/bootstrap.js'
          // }
        ]
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-symlink');

  // Custom tasks.
  grunt.registerTask('default', ['symlink']);
};
