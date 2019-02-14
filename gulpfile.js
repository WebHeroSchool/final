var gulp = require('gulp');

gulp.task('hello', () => console.log(Date()));

gulp.task('taskjs', () => {
    return gulp.src(['scripts.js'])
    .pipe(gulp.dest('js'));
});

gulp.task('taskcss', () => {
    return gulp.src(['styles.css'])
    .pipe(gulp.dest('css'));
});