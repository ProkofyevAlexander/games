'use strict';

var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var source_maps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');

//linux & mac: export NODE_ENV=production
//windows: set NODE_ENV=production

var PRODUCTION = process.env.NODE_ENV === 'production';

var SRC_PATH_SASS = path.join(__dirname, 'assets/scss/**/*.scss'),
    DEST_PATH_SASS = path.join(__dirname, 'public/css'),
    SRC_PATH_SCRIPTS = path.join(__dirname, 'modules/**/*.js');

gulp.task('sass', function () {

    if (PRODUCTION) {

        return gulp
            .src(SRC_PATH_SASS)
            .pipe(source_maps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(source_maps.write('.'))
            .pipe(gulp.dest(DEST_PATH_SASS));
    }
    else {

        return gulp
            .src(SRC_PATH_SASS)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(DEST_PATH_SASS));
    }
});

gulp.task('scripts', function() {
    gulp.src('modules/angular/controllers.js')
        .pipe(browserify({
            insertGlobals : false,
            debug : !PRODUCTION
        }))
        .pipe(babel())
        .pipe(gulp.dest('public/js'))
});


gulp.task('prepare_public', ['sass', 'scripts']);

gulp.task('default', ['sass', 'scripts'], function () {
    gulp.watch(SRC_PATH_SASS, ['sass']);
    gulp.watch(SRC_PATH_SCRIPTS, ['scripts']);
});