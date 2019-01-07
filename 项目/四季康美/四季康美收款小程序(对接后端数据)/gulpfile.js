//console.log(__dirname);
function getScssFilePath(name) {
    //获取wxmp文件夹下的所有文件目录
    /**
    [
    'wxmp/components/footer/wxmp.scss',
    'wxmp/components/header/wxmp.scss',
    'wxmp/pages/aboutMe/wxmp.scss',
    'wxmp/pages/index/wxmp.scss',
    'wxmp/pages/template/newsList/wxmp.scss',
    'wxmp/static/css/common.scss',
    'wxmp/static/css/fontSize.scss',
    'wxmp/static/css/main.scss' 
    ]
    */
    var glob = require("glob"); //获取某文件下所有目录的插件
    return new Promise(function(resolve, reject) {
        glob(`${name}/**`, function(err, files) {
            //console.log(err,files.length, files);
            if (err) reject({ success: false, 'msg': 'glob插件读取某路径下的所有文件类型失败！' });
            var arr = [];
            for (var i = 0; i < files.length; i++) {
                var reg = /\.scss$/; //过滤：字面量的正则表达式,匹配scss文件
                if (reg.test(files[i])) {
                    arr.push(files[i]);
                }
            }
            //console.log(arr);
            resolve({ success: true, arr: arr });
        });
    });
}









function getProjectArr() {
    //获取根目录下的文件夹(微信小程序项目文件夹或其它文件夹)
    var weiXinProject = [];
    var fs = require('fs');
    var rootFiles = fs.readdirSync(__dirname); //当前目录下的所有文件 --同步API
    /*
    [ 'gulpfile.js',
    'node_modules',
    'package-lock.json',
    'package.json',
    'wxmp' ]
    */
    for (var i = 0; i < rootFiles.length; i++) {
        if (rootFiles[i].indexOf('node_modules') > -1) continue;
        var stats = fs.statSync(__dirname + '/' + rootFiles[i]); //读取的文件信息 --同步API
        var flag = stats.isDirectory(); //文件夹为true,文件为false
        if (flag == true) weiXinProject.push(rootFiles[i]);
        //console.log(flag)
    }
    //console.log(weiXinProject)
    //console.log(fs.readdirSync(rootFiles))
    return weiXinProject;
}


function wxssFn(path) {
    //每个.scss文件打包到对应的目录下
    //'wxmp/static/css/main.scss'
    let route = path.replace(/(.*\/)*([^.]+).*/ig, "$1"); //$1提取路径，$2获取文件名
    gulp.src(path)
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['defaults'], //只添加webkit前辍属性
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        })) //添加css3前辍
        .pipe(rename({
            extname: ".wxss"
        }))
        .pipe(gulp.dest(route))
}



var gulp = require('gulp');
var sass = require('gulp-sass'); //sass转css
var autoprefixer = require('gulp-autoprefixer'); //添加css3前辍
var rename = require("gulp-rename"); //修改文件名或后辍名

gulp.task('sass', async function() {
    var filePathArr = [];
    var projectArr = getProjectArr();
    for (var n = 0; n < projectArr.length; n++) {
        var obj = await getScssFilePath(projectArr[n]);
        filePathArr = filePathArr.concat(obj.arr);
    }
    //console.log(filePathArr, obj.arr)
    for (let i = 0; i < filePathArr.length; i++) {
        wxssFn(filePathArr[i]);
    }
});


gulp.task('default', ['sass'], async function() {
    /**var obj = await getScssFilePath();
    var filePathArr = obj.arr;
    var more = [
        '** /**.scss'
    ];
    filePathArr = filePathArr.concat(more);
    
     * 
     * 
     * 
     * 
     * 增加**未知的路径.wxss,原因在开发过程中会新增页面（wxmp.wxss）这些文件也要执行监听
     * [
    'wxmp/components/footer/wxmp.scss',
    'wxmp/components/header/wxmp.scss',
    'wxmp/pages/aboutMe/wxmp.scss',
    'wxmp/pages/index/wxmp.scss',
    'wxmp/pages/template/newsList/wxmp.scss',
    'wxmp/static/css/common.scss',
    'wxmp/static/css/fontSize.scss',
    'wxmp/static/css/main.scss' 
    ]
     * 
     * 
     * 
     * * */
    //。注意：gulp.watch 不监听文件的新建和删除，建议使用chokidar。
    //gulp.watch('**/**.scss', ['sass']); // 监视所有 scss 文件的改动，如果发生变更，运行 'sass' 任务
});

var Chokidar = require('chokidar');
var watcher = Chokidar.watch('**/**.scss', {
    //ignored: /(^|[\/\\])\../,//定义要忽略的文件/路径。
    persistent: true,
    usePolling: true, //使用轮询
});

//启用监听
watcher
    .on('ready', () => {
        //console.log('ready', 888888888888);
    })
    .on('add', () => {
        //console.log('add', 888888888888);
    })
    .on('change', async() => {
        console.log('修改-change', new Date());
        var filePathArr = [];
        var projectArr = getProjectArr();
        for (var n = 0; n < projectArr.length; n++) {
            var obj = await getScssFilePath(projectArr[n]);
            filePathArr = filePathArr.concat(obj.arr);
        }
        //console.log(filePathArr, obj.arr)
        for (let i = 0; i < filePathArr.length; i++) {
            wxssFn(filePathArr[i]);
        }
    })
    .on('unlink', () => {
        //console.log('unlink', 888888888888);
    });