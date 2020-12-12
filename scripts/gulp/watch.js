const gulp = require("gulp");
const styles = require("./process-styles");
const scripts = require("./process-scripts");
const posts = require("./process-posts").default;
const assets = require("./process-images").default;

function watch() {
  gulp.watch("./generator/_assets/scss/**/*.scss", styles);
  gulp.watch("./generator/_assets/js/**/*.js", scripts);
  gulp.watch("./posts/**/_content.{md,markdown}", posts({ refresh: false }));
  gulp.watch(
    "./posts/**/*.{png,gif,jpg,jpeg,jfif}",
    gulp.parallel(
      assets({ height: 1080, suffix: null, quality: 0.8, refresh: false }),
      assets({
        height: 240,
        suffix: "thumbnail",
        quality: 0.4,
        refresh: false,
      })
    )
  );
}

exports.default = watch;
