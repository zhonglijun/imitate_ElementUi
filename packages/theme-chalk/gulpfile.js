// gulpfile.js
const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync()) // 转成CSS
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    })) // 补全
    .pipe(cssmin()) // 压缩
    .pipe(dest('./lib')); // 在当前目录下的lib文件夹输出最终文件
}

exports.build = series(compile);