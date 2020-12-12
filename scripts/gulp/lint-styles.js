const gulp = require("gulp");
const stylelint = require("gulp-stylelint");

function lintStyles() {
  return gulp
    .src([
      "./generator/_assets/scss/**/*.scss",
      "!./generator/_assets/scss/vendor/_normalize.scss",
      "!./generator/_assets/scss/fonts/*.scss",
    ])
    .pipe(
      stylelint({
        reporters: [{ formatter: "string", console: true }],
      })
    );
}

exports.default = lintStyles;
