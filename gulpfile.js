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
const postcss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');

const nested = require('postcss-nested');
const short = require('postcss-short');
const assets  = require('postcss-assets');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');

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

const paths = {
    src: {
        dir: 'src',
        scripts: 'src/**/*.js',
        styles: 'src/**/*.css'
    },
    build: {
        dir: 'build/',
        scripts: 'build/scripts',
        styles: 'build/styles'
    },
    buildNames: {
        scripts: 'scripts.min.js',
        styles: 'styles.min.css'
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
    return gulp.src(paths.src.scripts)
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.scripts))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.scripts));
});

gulp.task('css', () => {
    const plugins = [
        autoprefixer({
            browsers: ['last 1 version']
        }),
        postcssPresetEnv,
        assets({
            loadPaths: ['src/images/'],
            relativeTo: 'src/styles/'
        }),
        short,
        nested
    ];

    gulp.src(paths.src.styles)
        .pipe(sourcemaps.init())
            .pipe(postcss(plugins))
            .pipe(concat(paths.buildNames.styles))
            .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.styles));
});

gulp.task('build', ['js', 'css'])
gulp.task('prod', ['build']);
gulp.task('dev', ['build', 'browser-sync']);
gulp.task('delete', ['clean']);