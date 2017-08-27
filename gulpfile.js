/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var less = require('gulp-less');

var STATIC_DIR   = 'src';
var SRC_DIR      = 'dist';


gulp.task('less', function(){
    gulp.src(STATIC_DIR + '/css/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(SRC_DIR + '/css/'));

   // gulp.src(STATIC_DIR + '/css/*.less')
   //      .pipe(sourcemaps.init())
   //      .pipe(less())
   //      .pipe(sourcemaps.write('./maps'))
   //      .pipe(gulp.dest(SRC_DIR + '/css/')); 

   //  gulp.src(STATIC_DIR + '/css/*.less')
   //      .pipe(sourcemaps.init())
   //      .pipe(less())
   //      .pipe(sourcemaps.write('./maps'))
   //      .pipe(gulp.dest(SRC_DIR + '/css/')); 

});

// gulp.task('js', function(){
//     gulp.src(STATIC_DIR + '/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest(SRC_DIR + '/js/'));

// });

// 
// Create a node-static server instance to serve the './public' folder 
//

// var static = require('node-static');
// var file = new static.Server('./public');

gulp.task('minify-css', function() {
    return gulp.src(SRC_DIR + '/css/*.css')
        // .pipe(cleanCSS())
        .pipe(gulp.dest(SRC_DIR + '/css/'));
});

gulp.task('watch', function(){
    gulp.watch(SRC_DIR+'/css/*.css',['minify-css']);
    gulp.watch(STATIC_DIR + '/css/*.less',['less']);
    // gulp.watch(STATIC_DIR + '/js/*.js',['js']);

});

// gulp.task('server', function(){
//     require('http').createServer(function (request, response) {
//         request.addListener('end', function () {
//             file.serve(request, response);
//         }).resume();
//     }).listen(8383);
// });

gulp.task('default', ['watch', 'less','minify-css']);


