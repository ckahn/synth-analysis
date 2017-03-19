"use strict";

var babelify   = require('babelify'),
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    rename     = require('gulp-rename'),
    source     = require('vinyl-source-stream'),
    sourceMaps = require('gulp-sourcemaps'),
    stringify  = require('stringify');

var config = {
  js: {
    src: './src/app/index.js',
    outputDir: './build/',
    mapDir: './maps/',
    outputFile: 'bundle.js'
  },
};

function bundle (bundler) {
  bundler
    .bundle()
    .pipe(source(config.js.src))
    .pipe(buffer())
    .pipe(rename(config.js.outputFile))
    .pipe(sourceMaps.init({ loadMaps : true }))
    .pipe(sourceMaps.write(config.js.mapDir))
    .pipe(gulp.dest(config.js.outputDir))
    .pipe(livereload());
}

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('build'))
    .pipe(livereload());
});

gulp.task('js', function () {
  var bundler = browserify(config.js.src)
    .transform(babelify, { 
      presets : ['es2015']
    })
    .transform(stringify, {
      appliesTo: { 
        includeExtensions: ['.html'],
        minify: true
      }
    });

  bundle(bundler);
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['src/app/**/*js', 'src/app/directives/*/*html'], ['js']);
  gulp.watch('src/index.html', ['html']);
});

gulp.task('default', ['html', 'js', 'watch']);
