const exec = require('child_process').exec;

// child = exec('cat *.js bad_file | wc -l',
//     function (error, stdout, stderr) {
//         console.log('stdout: ' + stdout);
//         console.log('stderr: ' + stderr);
//         if (error !== null) {
//              console.log('exec error: ' + error);
//         }
//     });
//  child();

const gulp = exec('gulp dev', (error, stdout, stderr)=>{
  console.log(stdout);
  if(stderr) console.error(stderr);
  if(error) {
    console.error("Execution Error: ", error);
  }
});

const jekyll = exec('bundle exec jekyll serve -s ./generator -d ./__serve', (error, stdout, stderr)=>{
  console.log(stdout);
  if(stderr) console.error(stderr);
  if(error) {
    console.error("Execution Error: ", error);
  }
});


