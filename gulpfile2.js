var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    concat = require('gulp-concat'),
    server = require('gulp-express');


gulp.task('styles', function() {
  return sass('src/css/scss/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
  console.log("run scripts");
  return gulp.src('src/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
  return gulp.src('src/imgs/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/imgs'));
});

gulp.task('htmls', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/img']);
});

gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'fonts', 'htmls');
});

gulp.task('watch', function() {

	// Watch .scss files
  gulp.watch('src/css/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/js/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/imgs/**/*', ['images']);


  gulp.watch('src/fonts/*', ['fonts']);


  gulp.watch('src/**/*.html', ['htmls', server.notify]);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

gulp.task('serve', ['webserver', 'watch']);


gulp.task('webserver', function() {
  //server.run(['server.js']);
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true,
      port:2000
    }));
});




