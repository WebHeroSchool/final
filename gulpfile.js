const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('hello', () => console.log(Date()));

gulp.task('taskjs', () => {
    return gulp.src(['*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat(['index.js'])
    .pipe(babel({
        presets: ['@babael/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'));
});



gulp.task('taskcss', () => {
    return gulp.src(['*.css'])
    .pipe(sourcemaps.init())
    .pipe(concat(['index.js'])
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});



gulp.task('default', ['taskjs', 'taskcss'])