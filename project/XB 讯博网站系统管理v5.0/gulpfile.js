/*重要的事件说三遍：
1注意：文件路径的配置
2注意：文件路径的配置
3注意：文件路径的配置*/

var gulp = require('gulp');
var sass = require('gulp-sass'); //转css
var browserSync = require('browser-sync'); //启动服务器与实时刷新
var reload = browserSync.reload;
var cssnano = require('gulp-cssnano'); //压缩css
var autoprefixer = require('gulp-autoprefixer'); //添加css3前辍
var concat = require('gulp-concat');
var rename = require('gulp-rename');


//浏览器自动刷新的文件是在app文件目录
var fileName = 'app';
var path = fileName + '/';

gulp.task('sass', function() {
    //过滤【mixin.scss】【variable.scss】这两个scss文件 
    return gulp.src([path + 'scss/**.scss', '!**/mixin.scss', '!**/variable.scss'])
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(path + 'css'))
});
//压缩css单个文件
gulp.task('cssnano1', function() {
    return gulp.src(path + 'css/*.css') //压缩的css的文件路径
        //.pipe(gulp.dest(path + 'css'))   //输出未压缩的文件
        //.pipe(rename({suffix: '.min'}))   //rename重命名压缩后的文件名
        //.pipe(cssnano()) //执行压缩--会去掉前辍，所以要先压缩再加前辍
        .pipe(autoprefixer({
            browsers: ['cover 99.5%'],
            cascade: false, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: false //是否去掉不必要的前缀 默认：true 
        })) //添加css3前辍
        .pipe(gulp.dest(path + 'css')) //输出到css文件夹
});

//修改html文件后会自动刷新浏览器，注意路径的配置
gulp.task('html', function() {
    gulp.src(['**/*.html'])//所有目录的html文件
        .pipe(reload({ stream: true }));
});
//监视 css 的改动
gulp.task('css', function() {
    gulp.src(path + 'css/*.css')
        .pipe(reload({ stream: true }));
});
//监视 images 的改动
gulp.task('images', function() {
    gulp.src([path + 'img/**', path + 'images/**'])
        .pipe(reload({ stream: true }));
});
// 监视 css 文件的改动，如果发生变更，运行 'mycss' 任务，并且重载文件
gulp.task('default', ['sass', 'cssnano1', 'html', 'css', 'images'], function() {
    browserSync({
        server: {
            baseDir: fileName
        }
    });
    gulp.watch(path + 'scss/*.scss', ['sass']);
    gulp.watch('**/*.html', ['html']);
    gulp.watch(path + 'css/*.css', ['css']);
    gulp.watch([path + 'img/**', path + 'images/**'], ['images']);
});