const path = require('path');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const hasher = require('gulp-hasher');
const buster = require('gulp-cache-buster');
const webserver = require('gulp-webserver');

const PATH = {};
PATH.SRC = 'src';
PATH.DEST = 'www';
PATH.HTML = PATH.SRC + '/**/*.html';
PATH.CSS = PATH.SRC + '/**/*.css';
PATH.IMAGES = PATH.SRC + '/images/**/*';

function cachebust() {
  return buster({
    assetURL: '/',
    assetRoot: path.join(__dirname, PATH.DEST),
    hashes: hasher.hashes,
    hashLength: 32, hashParam: 'hash',
  });
}

gulp.task('html', ['css', 'images'], () => {
  return gulp.src(PATH.HTML)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(cachebust())
    .pipe(gulp.dest(PATH.DEST));
});

gulp.task('css', ['images'], () => {
  return gulp.src(PATH.CSS)
    .pipe(cssnano())
    .pipe(cachebust())
    .pipe(gulp.dest(PATH.DEST))
    .pipe(hasher());
});

gulp.task('images', () => {
  return gulp.src(PATH.IMAGES, { base: PATH.SRC })
    .pipe(imagemin({optimizationLevel:3}))
    .pipe(gulp.dest(PATH.DEST))
    .pipe(hasher());
});

gulp.task('default', ['html']);

gulp.task('serve', () => {
  return gulp.src(PATH.DEST)
    .pipe(webserver({
      livereload: true,
    }));
});

gulp.task('watch', () => {
  gulp.watch(PATH.HTML, ['html']);
  gulp.watch(PATH.CSS, ['css']);
  gulp.watch(PATH.IMAGES, ['images']);
});
