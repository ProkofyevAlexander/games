'use strict';

var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var importPartial = require('postcss-partial-import');
var SVG = require('postcss-svg');
var svgo = require('postcss-svgo');
//var assets  = require('postcss-assets');
var cssnano = require('cssnano');
//var initial = require('postcss-initial');
//var autoreset = require('postcss-autoreset');
var singleCharset = require("postcss-single-charset");

//linux & mac: export NODE_ENV=production
//windows: set NODE_ENV=production

var PRODUCTION = process.env.NODE_ENV === 'production';

var SRC_PATH_SASS = path.join(__dirname, 'assets/scss/**/*.scss'),
    DEST_PATH_SASS = path.join(__dirname, 'public/css'),
    SRC_PATH_SCRIPTS = path.join(__dirname, 'modules/**/*.js');

gulp.task('sass', function () {

    var processors = [
        importPartial({}),
        SVG({paths: ['assets/img/']}),
        svgo,
        autoprefixer,
        singleCharset()
    ];

    if (PRODUCTION) {
        processors.push(cssnano);
    }

    return gulp
        .src(SRC_PATH_SASS)
        .pipe(sourceMaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(DEST_PATH_SASS));
});

gulp.task('scripts', function() {
    gulp.src('modules/angular-controllers/**/*.js')
        .pipe(browserify({
            insertGlobals : false,
            debug : !PRODUCTION
        }))
        .pipe(babel())
        .pipe(gulp.dest('public/js/controllers/'))
});


gulp.task('prepare_public', ['sass', 'scripts']);

gulp.task('default', ['sass', 'scripts'], function () {
    gulp.watch(SRC_PATH_SASS, ['sass']);
    gulp.watch(SRC_PATH_SCRIPTS, ['scripts']);
});