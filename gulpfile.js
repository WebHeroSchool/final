const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');

gulp.task('hello', () => console.log(Date()));

gulp.task('taskjs', () => {
    return gulp.src(['*.js'])
    .pipe(concat(['index.js'])
    .pipe(babel({
        presets: ['@babael/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});



gulp.task('taskcss', () => {
    return gulp.src(['*.css'])
    .pipe(concat(['index.js'])
    .pipe(cssnano())
    .pipe(gulp.dest('css'));
});