const path = require('path');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const minifyCss = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const RevAll = require('gulp-rev-all');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const webp = require('gulp-webp');

gulp.task('keys', () => {
  return gulp.src(['src/public.gpg', 'src/keybase.txt'])
    .pipe(gulp.dest('www'));
});

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('www'))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(concat('css/style.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('www'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('js/script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www'))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*', { base: 'src' })
    .pipe(imagemin({optimizationLevel:3}))
    .pipe(gulp.dest('www'))
    .pipe(browserSync.stream())
    .pipe(webp())
    .pipe(gulp.dest('www'))
    .pipe(browserSync.stream());
});

gulp.task('www', ['html', 'keys', 'css', 'js', 'images']);

gulp.task('dist', ['www'], () => {
  const revAll = new RevAll({
    dontRenameFile: [/\.(html|gpg|txt)$/],
    dontUpdateReference: [/\.(html|gpg|txt)$/],
    dontSearchFile: [/\.(png|jpg|gpg|txt)$/]
  });
  return gulp.src('www/**')
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
  gulp.watch(['src/public.gpg', 'src/keybase.txt'], ['keys']);
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/css/**/*.css'], ['css']);
  gulp.watch(['src/js/**/*.js'], ['js']);
  gulp.watch(['src/images/**/*'], ['images']);
});

gulp.task('dev', ['www', 'serve', 'watch' ]);
