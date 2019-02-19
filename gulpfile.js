const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const env = require('gulp-env');
const clean = require('gulp-clean');
const postcss = require("gulp-postcss")

const paths = {
    scr: {
        styles: 'src/styles/*.css',
        scripts: 'scr/scripts/*.js'
    },
    bulding: {
        styles: 'build/styles',
        scripts: 'build/scripts'
    },
    buildNames: {
        styles: 'index.min.css',
        scripts: 'index.min.js'
    }
}

env ({
    file: '.env',
    type: 'ini',
});

gulp.task('clean', function () {
    gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('js', () => {
    return gulp.src([paths.scr.scripts])
    .pipe(sourcemaps.init())
    .pipe(concat(paths.buildNames.scripts))
    .pipe(babel({
        presets: ['@babael/env']
    }))
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.bulding.scripts));
});

gulp.task('css', () => {
    const plugins = [];
    
    return gulp.src([paths.scr.styles])
    .pipe(sourcemaps.init())
    .pipe(postcss)
    .pipe(concat(paths.buildNames.styles))
    .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.bulding.styles));
});

gulp.task('build', ['js', 'css'])


gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch(paths.scr.scripts, ['js-watch']);
    gulp.watch(paths.scr.styles, ['css-watch']);
})

gulp.task('js-watch', ['js'], () => browserSync.reload());
gulp.task('css-watch', ['css'], () => browserSync.reload());




gulp.task('prod', ['build']);
gulp.task('dev', ['build', 'browser-sync']);
gulp.task('clean-build', ['clean']);