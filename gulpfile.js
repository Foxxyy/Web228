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
  gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
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
        .pipe(less({
          plugins: [cleancss]
        }))
        .pipe(concat('build.css'))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('csso', function () {
    return gulp.src('app/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('browser-sync', function () {
  var files = [
    '*.html',
    'app/css/*.css',
    'app/img/*.png',
    'dist/css/*.css'
  ];

  browserSync.init(files, {
    server: {
      baseDir: '.'
    }
  });
});

// Локальный сервер для разработки
gulp.task('http-server', function() {
  connect.server();
});

gulp.task('images', function() {
    gulp.src('./app/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))

});

gulp.watch('app/less/*.less', ['less']);
gulp.watch('app/css/*.css', ['csso'])
gulp.task('default', ['less', 'csso', 'images', 'index', 'minify', 'browser-sync', 'http-server']);
