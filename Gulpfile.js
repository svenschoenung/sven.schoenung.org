const path = require('path');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const minifyCss = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const RevAll = require('gulp-rev-all');
const browserSync = require('browser-sync');

const PATH = {};
PATH.SRC = 'src';
PATH.DEST = 'www';
PATH.HTML = PATH.SRC + '/**/*.html';
PATH.CSS = PATH.SRC + '/**/*.css';
PATH.IMAGES = PATH.SRC + '/images/**/*';
PATH.GPG = PATH.SRC + '/**/public.gpg';

gulp.task('gpg', () => {
  return gulp.src(PATH.GPG)
    .pipe(gulp.dest(PATH.DEST));
});

gulp.task('html', () => {
  return gulp.src(PATH.HTML)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(PATH.DEST))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {
  return gulp.src(PATH.CSS)
    .pipe(minifyCss())
    .pipe(gulp.dest(PATH.DEST))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp.src(PATH.IMAGES, { base: PATH.SRC })
    .pipe(imagemin({optimizationLevel:3}))
    .pipe(gulp.dest(PATH.DEST))
    .pipe(browserSync.stream());
});

gulp.task('www', ['html', 'gpg', 'css', 'images']);

gulp.task('dist', ['www'], () => {
  const revAll = new RevAll({
    dontRenameFile: [/\.html$/, /\.gpg$/],
    dontUpdateReference: [/\.html$/, /\.gpg$/],
    dontSearchFile: [/\.png$/, /\.jpg$/, /\.gpg$/]
  });
  return gulp.src(PATH.DEST + '/**')
    .pipe(revAll.revision())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['dist']);

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir:'www'
    }
  });
});

gulp.task('watch', () => {
  gulp.watch(PATH.GPG, ['gpg']);
  gulp.watch(PATH.HTML, ['html']);
  gulp.watch(PATH.CSS, ['css']);
  gulp.watch(PATH.IMAGES, ['images']);
});

gulp.task('dev', ['www', 'serve', 'watch' ]);
