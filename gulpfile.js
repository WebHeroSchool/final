const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('gulp-browser-sync').create();

const paths = {
    scr: {
        styles: 'styles',
        scripts: 'scripts'
    },
    bulding: {
        styles: 'styles',
        scripts: 'scripts'
    },
    buildNames: {
        styles: 'index.min.css',
        scripts: 'index.min.js'
    }
}

gulp.task('hello', () => console.log(Date()));

gulp.task('taskjs', () => {
    return gulp.src([paths.scr.scripts])
    .pipe(sourcemaps.init())
    .pipe(concat([paths.buildNames.scripts])
    .pipe(babel({
        presets: ['@babael/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.bulding.scripts));
});

gulp.task('taskcss', () => {
    return gulp.src([paths.scr.styles])
    .pipe(sourcemaps.init())
    .pipe(concat([paths.buildNames.styles])
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.bulding.styles));
});

gulp.task('default', ['taskjs', 'taskcss'])


gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch(paths.scr.scripts, ['taskjs-watch']);
    gulp.watch(paths.scr.styles, ['taskcss-watch']);
})



gulp.task('taskjs-watch', ['js'], () => browserSync.reload());

gulp.task('taskcss-watch', ['css'], () => browserSync.reload());