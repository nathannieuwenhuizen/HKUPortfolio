(function () {
    'use strict';

    var config = require('./package.json');
    var gulp = require('gulp');
    var livereload = require('gulp-livereload');
    var notify = require('gulp-notify');
    var plumber = require('gulp-plumber');
    var sass = require('gulp-sass');
    var browserSync = require('browser-sync').create();
    var cleanCSS = require('gulp-clean-css');
    gulp.task('hello', function () {
        console.log('Hello ' + config.author);
    });

    gulp.task('sass', function () {
        return gulp.src('scss/*.scss')
            .pipe(plumber({
                errorHandler: notify.onError("Error parsing SASS!")
            }))
            .pipe(sass()) // Converts Sass to CSS with gulp-sass
            .on('error', sass.logError)
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(''))
            .pipe(notify('SASS compiled!'))
            .pipe(browserSync.reload({
                stream: true
            }))

    });
    gulp.task('watch', ['browserSync'], function () {
        console.log('Hello ' + config.author + '! Time to watch some Styles!');
        gulp.watch('scss/*.scss', ['sass']);
        gulp.watch('*.php', browserSync.reload);
        gulp.watch('*.html', browserSync.reload);
        gulp.watch('assets/**', browserSync.reload);
        gulp.watch('js/*.js', browserSync.reload);
    })

    gulp.task('browserSync', function () {
        browserSync.init({
            server: {
                baseDir: './'
            },
        })
    })
})();
