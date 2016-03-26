'use strict';

var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var source_maps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
//var concat = require('gulp-concat');

//linux & mac: export NODE_ENV=production
//windows: set NODE_ENV=production

var production = process.env.NODE_ENV === 'production';

var src_path_sass = path.join(__dirname, '/assets/scss/**/*.scss'),
    src_path_es2015 = path.join(__dirname, '/assets/es2015/**/*.js');

gulp.task('sass', function () {

    var dest_path = path.join(__dirname, '/public/css');

    if (production) {

        return gulp
            .src(src_path_sass)
            .pipe(source_maps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(source_maps.write('.'))
            .pipe(gulp.dest(dest_path));
    }
    else {

        return gulp
            .src(src_path_sass)
            .pipe(sass({}).on('error', sass.logError))
            .pipe(gulp.dest(dest_path));

    }
});

gulp.task('es2015', function () {

    var dest_path = path.join(__dirname, '/public/js');

    if (production) {

        return gulp.src(src_path_es2015)
            .pipe(source_maps.init())
            .pipe(babel())
            //.pipe(concat("all.js"))
            .pipe(source_maps.write('.'))
            .pipe(gulp.dest(dest_path));

    }
    else {

        return gulp.src(src_path_es2015)
            .pipe(babel())
            .pipe(gulp.dest(dest_path));
    }
});


gulp.task('prepare_public', ['sass', 'es2015']);

gulp.task('default', ['sass', 'es2015'], function () {
    gulp.watch(src_path_sass, ['sass']);
    gulp.watch(src_path_es2015, ['es2015']);
});