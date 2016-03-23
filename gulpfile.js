'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
//var source_maps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp
        .src(__dirname + '/assets/scss/**/*.scss')
        //.pipe(source_maps.init())
        .pipe(sass({/*outputStyle: 'compressed'*/}).on('error', sass.logError))
        //.pipe(source_maps.write('./maps'))
        .pipe(gulp.dest(__dirname + '/public/css'));
});

gulp.task('prepare_public', ['sass']);

gulp.task('default', ['sass'], function () {
    gulp.watch(__dirname + '/assets/scss/**/*.scss', ['sass']);
});