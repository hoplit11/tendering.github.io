'use strict';

var gulp = require('gulp'), //
    sass = require('gulp-sass'), //
    browserSync = require('browser-sync'); //
var del = require('del'); // require the node module del
var imagemin = require('gulp-imagemin'); //
let flatmap = require('gulp-flatmap');
let usemin = require('gulp-usemin');
let rev = require('gulp-rev');
let htmlmin = require('gulp-htmlmin');
let uglify = require('gulp-uglify');
let cleanCss = require('gulp-clean-css');

/*




*/


// sass Task
gulp.task('sass', function () { //set up a task name sass and create a function
  return gulp.src('./css/*.scss')   //
    .pipe(sass().on('error', sass.logError)) // allows the stream to be piped to the function
    .pipe(gulp.dest('./css')); //specifie the destination
});
// sass wacht Task
gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', ['sass']);});
//Browser Sync Task
gulp.task('browser-sync', function () {
   var files = [ //specifieall the files that if modified the browser sync needs to cause the reloading or the file
      './*.html',
      './css/*.css',
      './img/*.{png,jpg,gif}',
      './js/*.js'
   ];
   browserSync.init(files, {//initialize the browser sync
      server: {
         baseDir: "./"//base directory as the current directory
      }
   });
});
//Clean task   https://riptutorial.com/gulp/example/24022/delete-files-using-del
gulp.task('clean', function() {
 return del(['dist']); // delete the dist folder
});
//copyfonts task/*
gulp.task('copyfonts', function() {  // copyfonts task
   return gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*') // src of the fonts have to add return(promise) for gulp >4.0
   .pipe(gulp.dest('./dist/fonts')); //destination of the fonts copied (pipe the fonts)
});
// Images
gulp.task('imagemin', function() { // imagemin task
  return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'));// destination of the img
});

//usemin  // taken from https://github.com/Hoang-Minh/conFusion/blob/master/gulpfile.js
 gulp.task('usemin', function() {
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
          .pipe(usemin({
             css: [ rev() ],
             html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
             js: [ uglify(), rev() ],
             inlinejs: [ uglify() ],
             inlinecss: [ cleanCss(), 'concat' ]
          }))
      }))
    .pipe(gulp.dest('dist/'));
  });

gulp.task('build', gulp.series('clean', 'copyfonts',gulp.parallel('imagemin', 'usemin')));
/*gulp.task('build',['clean'], function() {
    gulp.start('copyfonts','imagemin');
});**/

// Default task
gulp.task('default', gulp.series('browser-sync', 'sass:watch'));
