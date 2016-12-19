var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var watchLess = require('gulp-watch-less');

gulp.task('default', function() {
    
});

gulp.task('less', function () {
    gulp.src(('./src/less/**/*.less'))
        .pipe(less())
        .pipe(gulp.dest('./src/css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./src/css'));
});