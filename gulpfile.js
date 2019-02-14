const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('hello', () => console.log(Date()));

gulp.task('taskjs', () => {
    return gulp.src(['scripts.js'])
    .pipe(concat(['index.js'])
    .pipe(babel({
        presets: ['@babael/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('taskcss', () => {
    return gulp.src(['styles.css'])
    .pipe(gulp.dest('css'));
});

gulp.task('default', () =>
    gulp.scr('scr/app.js')
        .pipe(babel({
            presets: ['@babael/env']
        }))
        .pipe(gulp.dest('dist'))
);