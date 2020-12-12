const gulp = require("gulp");

function copyAssets() {
  return gulp
    .src([
      "./generator/_assets/**/*",
      "!./generator/_assets/scss/**/*",
      "!./generator/_assets/js/**/*",
    ])
    .pipe(gulp.dest("./generator/assets"));
}

exports.default = copyAssets;
