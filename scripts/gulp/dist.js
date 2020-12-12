const gulp = require('gulp');
const zip = require('gulp-zip');

function dist() {
  return gulp.src([
    './generator/**',
    '!./.DS_Store',
    '!./.git',
    '!./node_modules/**'
  ])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'))
}

exports.default = dist;