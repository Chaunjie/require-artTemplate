var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var requirejsOptimize = require('gulp-requirejs-optimize');
var browserSync = require('browser-sync').create();
var sh = require('shelljs');

gulp.task('js', function () {
    return gulp.src('www/js/**/*.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('less', function () {
    return gulp.src('www/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('image', function () {
    return gulp.src('www/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('www/template/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/template'));
});

gulp.task('js-watch', ['js'], function(done){
    browserSync.reload();
    done();
});

gulp.task('less-watch', ['less'], function(done){
    browserSync.reload();
    done();
});

gulp.task('html-watch', ['html'], function(done){
    browserSync.reload();
    done();
});

gulp.task('image-watch', ['image'], function(done){
    browserSync.reload();
    done();
});

gulp.task('default', ['serve']);

gulp.task('build', function () {
    return gulp.src('dist/**/*')
        .pipe(gulp.dest('build'));
});

gulp.task('template', function () {
    var fs = require('fs');
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

    doHtmlMin('www/template');
    function doHtmlMin(path) {
        var fileList = fs.readdirSync(path);
        fileList.forEach(function (item) {
            (function (name) {
                gulp.src('www/template/' + name)
                    .pipe(htmlmin(options))
                    .pipe(gulp.dest('dist/template'));
            })(item);
        });
    }
});

gulp.task('serve', ['js', 'less', 'image', 'html'], function (done) {
    /*sh.cd('./dist/template');
     var command = 'browser-sync start --server --files "index.html"';
     sh.exec(command, function(){
     done();
     })*/
    var templatePath = '/Users/panchaoo/demo/require-artTemplate/dist/template',
        distPath = '/Users/panchaoo/demo/require-artTemplate/dist';
    browserSync.init({
        server: {
            baseDir: [templatePath, distPath]
        },
        port: 9999
    });

    gulp.watch(['www/js/**/*.js', 'www/less/**/*.less', 'www/images/*', 'www/template/*.html'], [['js-watch'], ['less-watch'], ['image-watch'], ['html-watch']]);

});
