var gulp = require('gulp');
/**
 * 1. *不能匹配路径分隔符
 */
gulp.task('copyImages',function(){
    gulp.src('./src/img/*.png').pipe(gulp.dest('./build'));
});
// [abc]
// {png,jpg} 表示枚举，用逗号隔开的任何一个都可以
gulp.task('copyImages2',function(){
    gulp.src('./src/img/**/*.{png,jpg}').pipe(gulp.dest('./build'));
});
// ! 表示排除的文件
gulp.task('copyImages3',function(){
    gulp.src(['./src/css/*.css','./src/js/*.js','!./src/js/tmp.js',,'!./src/js/test.js'],{base:'./src'}).pipe(gulp.dest('./build'));
});


