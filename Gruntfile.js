module.exports = function(grunt) {

  grunt.initConfig({
    //concat the src code needed to run the app
    //uglify public/lib folders, ** update index.ejs to point to
    //minified versions
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      folder: ['./public/client/dist/']
    },

    concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: [
                './public/client/*.js',
                './public/client/display/*.js',
                './public/client/guest/*.js',
                './public/client/table/*.js',
                './public/client/home/*.js'
                ],

          dest: './public/client/dist/built.js',
        },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/backup.js']
      }
    },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    uglify: {
      dist: { //can add options to uglify ie. source map/gzip
        options: {
        sourceMap: true,
        sourceMapName: './public/client/dist/sourcemap.map'
        },
        files: {
          './public/client/dist/built.min.js':
          ['./public/client/dist/built.js']
        }
      }
    },

    jshint: {
      beforeconcat: [
        // Add filespec list here
        './*.js',
        './public/client/**/*.js',
        './server/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/client/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public',
          src: ['*.css', '!*.min.css'],
          dest: 'public/client/dist',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/styles/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {

      prodServer: {
        command: 'git push heroku master'
      },
      devServer: {
        command: 'git push origin master'
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'clean',
    'concat',
    'uglify',
    'cssmin',
  ]);

  grunt.registerTask('heroku:production', ['build']);

  //ASSUMPTION - By the time we run grunt upload,
  //we assume that the user has run git commit for their
  //pending files
  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['shell:prodServer']);
    } else {
      grunt.task.run([
        'shell:devServer',
        'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n){
    // add your deploy tasks here
    // development: build, upload -> nodemon
    // production: build, upload -> heroku
    if(grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([
        'build',
        'test',
        'upload:prod'
        ]);
    } else {
      grunt.task.run([
        'build',
        'test',
        'upload'
         ]);
    }
  });
};
