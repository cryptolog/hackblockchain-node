let gulp = require('gulp')
let nodemon = require('gulp-nodemon')
let plumber = require('gulp-plumber')
let livereload = require('gulp-livereload')

let exec = require('child_process').execSync

gulp.task('develop', function () {
  exec('nvm use')
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee nunjucks',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname)
      }
    });
    this.stdout.pipe(process.stdout)
    this.stderr.pipe(process.stderr)
  });
});

gulp.task('default', [
  'develop'
]);
