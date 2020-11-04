'use strict';

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
      useminPrepare: 'grunt-usemin' //the useminPrepare is goint to be handle by grunt-usemin
    });
    // Define the configuration for all the tasks
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss', // whatch this files
            tasks: ['sass'] // if files modifie invoque sass
        },
        browserSync: {
            dev: { //
                bsFiles: { // specifie which file need to be wach for by browserSycn  the the page is goint to reload
                    src : [// sourse of the file to wach
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true, //watchTask is running
                    server: {  //especifie server directory
                        baseDir: "./" // current directory as my base directory
                    }
                }
            }
        },

        copy: { //Set up copy task
            html: { // first copy html file to the dist folder
                files: [ // files that are going to be copy
                {
                    //for html
                    expand: true, //
                    dot: true, //
                    cwd: './', // current working directory
                    src: ['*.html'], // source files (all the html files)
                    dest: 'dist' // copy to dist folder
                }]
            },
            fonts: {// set up fonts copy task
                files: [ // files that are going to be copy
                {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome', // current working directory
                    src: ['fonts/*.*'],// source files (all the fonts files)
                    dest: 'dist' // copy to dist folder
                }]
            }
        },

        clean: { // set up the clean task
            build: {
                src: [ 'dist/'] // clean dist folder
            }
        },
        imagemin: { // set up the imagemin task
            dynamic: { //
                files: [{ //
                    expand: true,                  // Enable dynamic expansion
                    cwd: './',                   // Src matches are relative to this path
                    src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },
         //configuring the usemin task
        useminPrepare: { //configuring the useminPrepare task prepare the files and then also configure the ConCache CSS min and Uglify and file ref plugins, so that they can do their work correctly
            foo: {
                dest: 'dist',
                src: ['index.html']//all the html files here
            },
            options: { //
                flow: {//
                    steps: { //
                        css: ['cssmin'],
                        js:['uglify'] // js is uglify
                    },
                    post: { //
                        css: [{ //
                            name: 'cssmin', //
                            createConfig: function (context, block) { //
                            var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },

        // Concat
        concat: {
            options: {
                separator: ';'//
            },

            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        cssmin: {
            dist: {}
        },

        // Filerev
        filerev: { //what filerev does is it adds an additional extension to that main name, so that when you prepare a new version of your website and upload it to the web page
            options: {
                encoding: 'utf8', //
                algorithm: 'md5', //
                length: 20 //
            },

            release: {
            // filerev:release hashes(md5) all assets (images, js and css )
            // in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },

        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options: {
                assetsDirs: ['dist', 'dist/css','dist/js']
            }
        },

        htmlmin: {                                         // Task
            dist: {                                        // Target
                options: {                                 // Target options
                    collapseWhitespace: true // All the whiteespace collapse to reduce file size
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'dist/index.html',  // 'destination': 'source'
                    'dist/contactus.html': 'dist/contactus.html',//
                    'dist/aboutus.html': 'dist/aboutus.html'
                }
            }
        }

    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);// first sync the watch
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'

    ]);

};
