var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('concat',function(){
    gulp.src(['./src/js/b.js','./src/js/a.js'])
        .pipe($.concat('app.js'))//指定合并后的文件名
        .pipe(gulp.dest('./build/js'))
        .pipe($.uglify())
        .pipe($.rename(function (path) {//是原来的路径
            //path.dirname += "/ciao";//表示文件所在的目录
            path.basename += ".min";//文件名
            //path.extname = ".md"//文件扩展名
        }))
        .pipe(gulp.dest('./build/js'))
});