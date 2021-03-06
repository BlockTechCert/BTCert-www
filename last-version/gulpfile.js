/**
 * Gulp 自动化工具
 * Author   ：yfgeek
 * 先sass自动压缩、再压缩css、js
 * 测试版本目录为： src
 * 项目生成目录为：
 * css ：docs/css
 * js:   docs/js
 * 为什么用docs？ github pages如果设置子目录，那么名字只允许是docs
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');

// 压缩 js 文件
gulp.task('script', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'))
});

// sass预编译
gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
});

// 压缩 css 文件
gulp.task('css', function () {
    gulp.src('src/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('docs/css'))
});

// 删除多余代码
gulp.task('uncss', function () {
    return gulp.src(['docs/css/blue.css','docs/css/style.css'])
        .pipe(uncss({
            html: ['docs/index.html']
        }))
        .pipe(gulp.dest('docs/css'));
});

// 压缩html
gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true,removeComments: true}))
    .pipe(gulp.dest('docs'));
});

//压缩图片
gulp.task('img', function () {
    gulp.src(['src/images/**/*','src/images/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('docs/images'))
});

// HTML组合分离的css、js
gulp.task('efhtml', function () {
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('docs'));
});

// 自动化
gulp.task('auto', function () {
    gulp.watch('src/js/*.js', ['script']);
    gulp.watch('src/sass/*.css', ['css']);
    gulp.watch('src/css/*.css', ['sass']);
});


gulp.task('default', ['script','sass','html','css']);
