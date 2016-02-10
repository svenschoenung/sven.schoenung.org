const path = require('path');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const hasher = require('gulp-hasher');
const buster = require('gulp-cache-buster');
const webserver = require('gulp-webserver');

const SRC = 'src'
const DEST = 'www';

function cachebust() {
  return buster({
    assetRoot: path.join(__dirname, DEST),
    hashes: hasher.hashes,
    hashLength: 32,
  });
}

gulp.task('html', ['css', 'images'], () => {
  return gulp.src(SRC+'/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(cachebust())
    .pipe(gulp.dest(DEST));
});

gulp.task('css', ['images'], () => {
  return gulp.src(SRC+'/**/*.css')
    .pipe(cssnano())
    .pipe(cachebust())
    .pipe(gulp.dest(DEST))
    .pipe(hasher());
});

gulp.task('images', () => {
  return gulp.src(SRC+'/images/**/*', { base: SRC })
    .pipe(imagemin({optimizationLevel:3}))
    .pipe(gulp.dest(DEST))
    .pipe(hasher());
});

gulp.task('default', ['html']);

gulp.task('serve', () => {
  return gulp.src(DEST)
    .pipe(webserver({
      livereload: true,
    }));
});
