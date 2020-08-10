const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const stylelint = require('gulp-stylelint');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');
const imageResize = require('gulp-image-resize');
const parallel = require('concurrent-transform');
const changed = require("gulp-changed");

function lintStyles() {
  return gulp.src([
    './_assets/scss/**/*.scss',
    '!./_assets/scss/vendor/_normalize.scss',
    '!./_assets/scss/fonts/*.scss'
  ])
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
}

function styles() {
  return gulp.src('./_assets/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/css'));
}

function lint() {
  return gulp.src([
    './_assets/js/components/_formcarry.js',
    './_assets/js/components/_infiniteScroll.js',
    './_assets/js/components/_mailChimp.js',
    './_assets/js/components/_miscellaneous.js',
    './_assets/js/components/_pageTransition.js',
    './_assets/js/components/_popup.js',
    './_assets/js/_inits.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function scripts() {
  return browserify('./_assets/js/app.js')
    .transform('babelify', {presets: ['@babel/preset-env']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/js'));
}

function dist() {
  return gulp.src([
    './**',
    '!./.DS_Store',
    '!./.git',
    '!./node_modules/**'
  ])
    .pipe(zip('barber-jekyll.zip'))
    .pipe(gulp.dest('../'))
}

function watch() {
  gulp.watch('./_assets/scss/**/*.scss', styles);
  gulp.watch('./_assets/js/**/*.js', scripts);
}

function images({height, suffix, quality}={height: 1440, quality: 0.9, suffix: 'full'}){
  return function resize_image() {
    return gulp.src([
      './_assets/posts/**/*.{png,gif,jpg,jpeg,jfif}',
    ])
    .pipe(changed("./assets/posts"))
    .pipe(parallel(imageResize({
      height: height,
      quality: quality,
      cover: true,
    })))
    .pipe(rename((path)=>{if(!suffix) return; path.basename += '-'; path.basename += suffix;}))
    .pipe(gulp.dest('./assets/posts'))
  };
}

const build = gulp.parallel(styles, scripts, images({height: 1080, suffix: null, quality: 0.9}), images({height: 360, suffix: 'thumbnail', quality: 0.6}));
gulp.task('default', build);

exports.lintStyles = lintStyles;
exports.styles = styles;
exports.lint = lint;
exports.scripts = scripts;
exports.dist = dist;
