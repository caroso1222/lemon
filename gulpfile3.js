// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var refresh = require('gulp-livereload');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var server = require('tiny-lr')();
var lrPort = 35729;

var paths = {
  styles: ['public/css/scss/*'],

  assets: ['./client/assets/'],
  scripts: [
    './client/src/app/app.js',
    './client/src/app/app.controller.js',
    './client/src/cards/card.js',
    './client/src/cards/card.service.js',
    './client/src/cards/card.directive.js',
    './client/src/cards/card.controller.js',
    './client/src/**/*.js'
  ],
  html: [
  './client/src/**/*.html',
  './client/src/index.html',
  './client/src/cards/directiveTemplates/*.html'
  ],

  server: {
    js: ['./server/**/*.js'],
    specs: ['./server/cards/specs/*.js']
  }
};


gulp.task('styles', function() {
  return sass(paths.styles, { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/css'))
    //.pipe(rename({suffix: '.min'}))
    //.pipe(cssnano())
    //.pipe(gulp.dest('public/css'))
    .pipe(refresh(server))
    .pipe(notify({message: 'style done'}));
});

gulp.task('scripts', function() {
  return gulp.src('public/js/main.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(refresh(server))
    .pipe(notify({message: 'scripts done'}));
});

gulp.task('serve', function(){
	nodemon({'script': 'server.js'});
});

gulp.task('default', ['build', 'lr', 'serve', 'watch']);

gulp.task('build', ['styles', 'scripts']);

gulp.task('lr', function(){
  server.listen(lrPort, function(err){
    if(err) {return console.error(err);}
  });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('public/css/**/*.scss', ['styles']);
  gulp.watch('public/js/*.js', ['scripts']);
});







