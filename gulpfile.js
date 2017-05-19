var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var imagemin    = require('gulp-imagemin');
var csso        = require('gulp-csso');
var connect     = require('gulp-connect');
var htmlmin     = require('gulp-html-minifier');
var concat      = require('gulp-concat');
var htmlclean   = require('gulp-htmlclean');
var inlinesource = require('gulp-inline-source');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });

gulp.task('minify', function() {
  var options = {
      compress: true
  };
  return gulp.src('./app/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(htmlclean())
    .pipe(inlinesource(options))
    .pipe(gulp.dest('./dist'))
});

gulp.task('minifyOther', function() {
  var options = {
      compress: true
  };
  return gulp.src('./app/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(htmlclean())
    .pipe(inlinesource(options))
    .pipe(gulp.dest('./dist/html'))
});

gulp.task('index', function () {
    var options = {
        compress: true
    };
    return gulp.src('./index.html')
        .pipe(htmlclean())
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('less', function() {
    return gulp.src("app/less/*.less")
        .pipe(less())
        //.pipe(concat('build.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('browser-sync', function () {
  var files = [
    'app/css/*.css',
    'app/img/*.png',
    'dist/css/*.css',
    'dist/html/*.html',
    'dist/*.html'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('images', function() {
    gulp.src('./app/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))

});

gulp.watch('app/less/*.less', ['less']);
gulp.watch('app/*.html', ['minify']);
gulp.watch('app/html/*.html', ['minifyOther']);
gulp.watch('app/css/*.css', ['csso'])

gulp.task('default', ['less', 'images', 'index', 'minifyOther', 'minify', 'browser-sync']);
