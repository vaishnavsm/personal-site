const gulp = require("gulp");
const rename = require("gulp-rename");
const ignore = require('gulp-ignore');
const parallel = require("concurrent-transform");

const getPropertyFromFile = (file, prop) => {
  const options = file.split('---')[1];
  if(options === undefined) return null;
  const lprop = prop.toLowerCase();
  const propFilter = options.toLowerCase().split('\n').filter(str => str.indexOf(lprop) != -1);
  if(!propFilter || propFilter.length == 0) return null;
  const propStr = propFilter[0].split(' ')[1];
  if(!propStr) return null;
  return propStr;
}

const getDateStrOfPublishingFromFile = (file)=>{
  return getPropertyFromFile(file, "date");
}

const getDateOfPublishingFromFile = (file)=>{
  const dateStr = getDateStrOfPublishingFromFile(file);
  if(!dateStr) return null;
  return new Date(dateStr);
}

const getDoNotPublishFromFile = (file)=>{
  const dnp = getPropertyFromFile(file, 'doNotPublish');
  if(!dnp || dnp!=='true') return false;
  return true;
}

function processPostsScript( {refresh} = {refresh: true}
) {
  return function processPosts() {
    return gulp
      .src(["./posts/**/_content.{md,markdown}"], {since: !refresh ? gulp.lastRun(processPosts) : undefined})
      // .pipe(
      //   (a)=>{console.log(a);}
      //   // parallel(
      //   // )
      // )
      .pipe(
        parallel(
          ignore.exclude((file)=>{
            const fileStr = file.contents.toString();
            const dnp = getDoNotPublishFromFile(fileStr);
            if(dnp) return true;
            const date = getDateOfPublishingFromFile(fileStr);
            if(date === null) return true;
            const today = new Date();
            return !(today > date);
          })
        )
      )
      .pipe(
        parallel(
          rename((path, file) => {
            const fileStr = file.contents.toString();
            const date = getDateStrOfPublishingFromFile(fileStr);
            // if (!suffix) return;
            // path.basename += "-";
            path.basename = date + '-' + path.dirname;
            path.dirname = '.';
          })
        )
      )
      .pipe(gulp.dest("./generator/_posts"));
  };
}

exports.default = processPostsScript;
