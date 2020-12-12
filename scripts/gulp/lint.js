const gulp = require("gulp");
const eslint = require("gulp-eslint");

function lint() {
  return gulp
    .src([
      "./generator/_assets/js/components/_formcarry.js",
      "./generator/_assets/js/components/_infiniteScroll.js",
      "./generator/_assets/js/components/_mailChimp.js",
      "./generator/_assets/js/components/_miscellaneous.js",
      "./generator/_assets/js/components/_pageTransition.js",
      "./generator/_assets/js/components/_popup.js",
      "./generator/_assets/js/_inits.js",
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

exports.default = lint;
