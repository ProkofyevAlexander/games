'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var source_maps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp
        .src(__dirname + '/assets/scss/**/*.scss')
        .pipe(source_maps.init())
        .pipe(sass({/*outputStyle: 'compressed'*/}).on('error', sass.logError))
        .pipe(source_maps.write('./maps'))
        .pipe(gulp.dest(__dirname + '/public/css'));
});

gulp.task('js', function () {
    return gulp
        .src(__dirname + '/assets/js/**/*.js')
        .pipe(gulp.dest(__dirname + '/public/js'));
});

gulp.task('prepare_public', ['sass', 'js']);

gulp.task('default', ['sass', 'js'], function () {
    gulp.watch(__dirname + '/assets/scss/**/*.scss', ['sass']);
    gulp.watch(__dirname + '/assets/js/**/*.js', ['js']);
});