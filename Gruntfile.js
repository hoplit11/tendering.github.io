'use strict';

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt);

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
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);// first sync the watch

};
