/*
 * This file is part of the JEECE Dokuwiki template package.
 *
 * (c) Théo FIDRY <theo.fidry@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = function(grunt) {

  'use strict';

  // Grunt configuration.
  grunt.initConfig({

    // Load the configuration file.
    pkg: grunt.file.readJSON('package.json'),

    // Configuration variables.
    meta: {
      bowerComponents: 'bower_components',    // bower components directory
      cssDir:          'css',                 // CSS directory
      glyphicons:      'images/glyphicons',   // Glyphicons directory
      lessDir:         'less',                // LESS directory
      lessLibs:        'less/libs',           // LESS libraries directory
      jsDir:           'js',                  // JS directory
      jsLibs:          'js/libs'              // JS libraries directory
    },

    // Clean files: delete generated files
    clean: ['<%= meta.glyphicons %>/bootstrap',
            '<%= meta.cssDir %>/_app.css',
            '<%= meta.lessLibs %>/',
            '<%= meta.jsDir %>/app.js',
            '<%= meta.jsDir %>/app.min.js',
            '<%= meta.jsLibs %>'],

    // Copy files
    copy: {

      // Get Twitter Bootstrap glyphicons.
      bootstrap: {
        cwd: '<%= meta.bowerComponents %>/bootstrap/fonts',
        expand: true,
        src: ['*'],
        dest: '<%= meta.glyphicons %>/bootstrap'
      }
    },

    // Check the JS code style.
    jshint: {
      options: {
        browser: true,
        curly: false,
        eqeqeq: true,
        eqnull: true,
        freeze: true,
        indent: 2,
        quotmark: true,
        unused: true,
        globals: {
          jQuery: true
        },
      },
      uses_defaults: [
        'js/src/**/*.js',
        'script.js'
      ]
    },

    // Create symbolic links to ease the access to ressources without manually moving them.
    symlink: {
      options: {
        overwrite: true  // overwrite existing files or folders if already exists
      },

      // Twitter Bootstrap: takes SCSS files, minified JS and glyphicons.
      bootstrap: {
        files: [
          // LESS files
          {
            expand: true,
            overwrite: true,
            cwd: '<%= meta.bowerComponents %>/bootstrap/less',
            src: ['**/*.less'],
            dest: '<%= meta.lessLibs %>/bootstrap'
          },
          // Glyphicons
          {
            expand: true,
            overwrite: true,
            cwd: '<%= meta.bowerComponents %>/bootstrap/fonts',
            src: ['*'],
            dest: '<%= meta.glyphicons %>/bootstrap'

          },
          // JS files
          {
            overwrite: true,
            src: ['<%= meta.bowerComponents %>/bootstrap/dist/js/bootstrap.min.js'],
            dest: '<%= meta.jsLibs %>/bootstrap.js'
          }
        ]
      }
    },

    // Compile LESS files to CSS.
    less: {
      app: {
        options: {
          strictImports: true,
          strictMath: true,
          strictUnits: true
        },
        files: {
          "<%= meta.cssDir %>/_app.css": "<%= meta.lessDir %>/app.less"
        }
      }
    },

    // Concat all files into one and minify them before publishing the outputed file.
    uglify: {
      app: {
        files: {
          '<%= meta.jsDir %>/app.min.js': ['<%= meta.jsLibs %>/**/*.js', 'js/app.js']
        }
      }
    },

    // Keep track of some files and perfom actions on changment; To be used in dev environment only.
    watch: {
      js: {
        files: ['<%= meta.jsDir %>/**/*.js', 'script.js'],
        tasks: ['build-js'],
        options: {
          spawn: false
        }
      },
      less: {
        files: ['<%= meta.lessDir %>/**/*.less'],
        tasks: ['build-css'],
        options: {
          spawn: false
        }
      }
    }
  });


  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-symlink');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs-checker');


  // Custom tasks.
  grunt.registerTask('build', ['build-base', 'build-css', 'build-js']);
  grunt.registerTask('build-base', ['clean', 'copy', 'symlink']);
  grunt.registerTask('build-css', ['less']);
  grunt.registerTask('build-js', ['uglify']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('start', ['build', 'watch']);
  grunt.registerTask('test-js', ['jshint']);
};
