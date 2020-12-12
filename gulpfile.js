const gulp = require('gulp');
const build = require('./scripts/gulp/script-build').default;
const clean = require('./scripts/gulp/script-clean').default;
const watch = require('./scripts/gulp/watch').default;

gulp.task('default', build({refresh: false}));
gulp.task('build', build({refresh: false}));
gulp.task('rebuild', gulp.series(clean, build({refresh: true})));
gulp.task('clean', clean);
gulp.task('dev', gulp.series(build({refresh: false}), watch));

// exports.lintStyles = lintStyles;
// exports.styles = styles;
// exports.lint = lint;
// exports.scripts = scripts;
// exports.dist = dist;
