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
    var clean = require('gulp-clean');
    var gulpCopy = require('gulp-copy');
    var uglify = require('gulp-uglify');
    var pump = require('pump');

    gulp.task('hello', function () {
        console.log('Hello ' + config.author);
    });

    gulp.task('sass', function () {
        return gulp.src('scss/main.scss')
            .pipe(plumber({
                errorHandler: notify.onError("Error parsing SASS!")
            }))
            .pipe(sass()) // Converts Sass to CSS with gulp-sass
            .on('error', sass.logError)
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('build'))
            .pipe(notify('SASS compiled!'))
            .pipe(browserSync.reload({
                stream: true
            }))

    });
    gulp.task('dev', ['browserSync'], function () {
        gulp.start('test');
        // gulp.start('copy');
        console.log('Hello ' + config.author + '! Time to watch some Styles!');
        
        gulp.watch('scss/*.scss', ['sass']);
        gulp.watch('*.php', ['copy']);
        gulp.watch('*.html', ['copy']);
        gulp.watch('assets/**', ['copy']);
        gulp.watch('js/*.js', ['js']);
    })

    gulp.task('browserSync', function () {
        browserSync.init({
            server: {
                baseDir: './build'
            },
        })
    })
    gulp.task('cleanbuild', function () {
        return clean(['build/**', '!build'], {force:true});
    });

    gulp.task('test', ['cleanbuild', 'copy', 'sass', 'js']);

    gulp.task('copy', ['copy-html','copy-assets']);
      gulp.task('copy-html', function () {
            return  gulp.src('*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({
            stream: true
        }));
    });
    gulp.task('copy-js', function () {
        return gulp.src(['js/**/*'])
        .pipe(gulp.dest('build/js'));
    });
    gulp.task('copy-assets', function () {
        return gulp.src(['assets/**/*'])
        .pipe(gulp.dest('build/assets'));
    });

    gulp.task('js', function (cb) {
        pump([
              gulp.src('js/*.js'),
            //   uglify(),
              gulp.dest('build/js')
          ],
          cb
        );
      });
})();
