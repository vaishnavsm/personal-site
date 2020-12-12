const gulp = require("gulp");
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const rename = require("gulp-rename");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");

function scripts() {
  return browserify("./generator/_assets/js/app.js")
    .transform("babelify", { presets: ["@babel/preset-env"] })
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./generator/assets/js"));
}

exports.default = scripts;
