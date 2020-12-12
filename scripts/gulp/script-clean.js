const gulp = require("gulp");
const gulpClean = require("gulp-clean");

function clean(){
  return gulp
      .src(["./generator/assets", "./generator/_posts", "./dist", "./serve"], { read: false, allowEmpty: true })
      .pipe(gulpClean());
}

exports.default = clean;
