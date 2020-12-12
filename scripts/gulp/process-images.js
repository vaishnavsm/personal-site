const gulp = require("gulp");
const rename = require("gulp-rename");

const imageResize = require("gulp-image-resize");
const parallel = require("concurrent-transform");
const changed = require("gulp-changed");

function processImages(
  { height, suffix, quality, refresh } = { height: 1440, quality: 0.9, suffix: "full", refresh: true }
) {
  return function resize_image() {
    return gulp
      .src(["./posts/**/*.{png,gif,jpg,jpeg,jfif}"], !refresh ? {since: gulp.lastRun(resize_image)} : {})
      .pipe(changed("./generator/assets/posts"))
      .pipe(
        parallel(
          imageResize({
            height: height,
            quality: quality,
            cover: true,
          })
        )
      )
      .pipe(
        parallel(
          rename((path) => {
            if (!suffix) return;
            path.basename += "-";
            path.basename += suffix;
          })
        )
      )
      .pipe(gulp.dest("./generator/assets/posts"));
  };
}

exports.default = processImages;
