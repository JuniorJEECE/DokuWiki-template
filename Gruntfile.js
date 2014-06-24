module.exports = function(grunt) {

  'use strict';

  // Grunt configuration.
  grunt.initConfig({

    // Load the configuration file.
    pkg: grunt.file.readJSON('package.json'),

    // Configuration variables.
    meta: {
      bowerComponents: 'bower_components',    // bower components directory
      cssLibs: 'less/libs',                   // CSS libraries directory
      jsLibs: 'js/libs'                       // JS libraries directory
    },

    copy: {
        // Get Twitter Bootstrap glyphicons.
        bootstrap: {
            cwd: '<%= meta.bowerComponents %>/bootstrap/fonts',
            expand: true,
            src: ['*'],
            dest: 'images/glyphicons/bootstrap'
        }
    },

    // Check the JS code style.
    jscs: {
        app: {
            options: {
                config: "jscs.json",
            },
            files: {
                src: ["js/src/**/*.js"]
            }
        }
    },

    // Check the JS code.
    jshint: {
        options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true
        },
        uses_defaults: ['js/src/**/*.js'], // don't check code coming from libraries
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
            dest: '<%= meta.cssLibs %>/bootstrap'
          },
          // Glyphicons
          {
            expand: true,
            overwrite: true,
            cwd: '<%= meta.bowerComponents %>/bootstrap/fonts',
            src: ['*'],
            dest: 'images/glyphicons/bootstrap'

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
          "css/_app.css": "less/app.less"
        }
      }
    },

    // Concat all files into one and minify them before publishing the outputed file.
    uglify: {
      app: {
        files: {
          'js/app.min.js': ['<%= meta.jsLibs %>/**/*.js', 'js/app.js']
        }
      }
    },

    // Keep track of some files and perfom actions on changment; To be used in dev environment only.
    watch: {
        js: {
            files: ['js/**/*.js'],
            tasks: ['uglify'],
            options: {
                spawn: false
            }
        },
        less: {
            files: ['less/**/*.less'],
            tasks: ['less'],
            options: {
                spawn: false
            }
        }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-symlink');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-jscs-checker");

  grunt.loadNpmTasks('grunt-contrib-watch');

  // Custom tasks.
  // Tests tasks.
  grunt.registerTask('test-js', ['jshint',   // check the code for syntax error
                                 'jscs'      // check the code style
  ]);

  grunt.registerTask('build', ['copy', 'symlink', 'less', 'uglify']);
  grunt.registerTask('start', ['build', 'watch']);

  grunt.registerTask('default', ['watch']);
};
