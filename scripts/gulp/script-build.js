const gulp = require('gulp');
const styles = require("./process-styles").default;
const scripts = require("./process-scripts").default;
const images = require("./process-images").default;
const posts = require("./process-posts").default;
const copyAssets = require('./process-copy-assets').default;

const build = ({refresh}={refresh: true})=>gulp.parallel(
  styles,
  scripts,
  posts({refresh: refresh}),
  images({ height: 1080, suffix: null, quality: 0.8, refresh: refresh  }),
  images({ height: 360, suffix: "thumbnail", quality: 0.4, refresh: refresh }),
  copyAssets
);

exports.default = build;
