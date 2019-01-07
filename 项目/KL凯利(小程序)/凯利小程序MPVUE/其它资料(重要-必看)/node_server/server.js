var express = require("express"); //npm install express --save-dev
var app = express(); 
var path = require('path'); 



var os = require('os'); 
var iptable =  {}; 
var ifaces = os.networkInterfaces(); 
for (var dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
        if ((details.family == 'IPv4') && (details.internal == false)) {
            // iptable[dev+(alias?':'+alias:'')]=details.address;
            iptable['localIP'] = details.address; 
        }
    }); 
}




//访问静态的HTML文件
//var path = require('path');
//console.log(path,__dirname ,__dirname.replace(/\\nodejs/g,""))
//var dirname = __dirname.replace(/\\common/g,"");//修改路径
//app.use(express.static(dirname + '/dist'));//该行代码是在express添加中间件，设置静态资源路径为public，所有的HTML、CSS、JS等文件都放在public下即可
app.use(express.static(__dirname + '/minprogram')); //express能配置多个静态文件访问目录
app.use(express.static(__dirname + '/KL')); //express能配置多个静态文件访问目录

app.listen(80, '0.0.0.0', function() {
    console.log("NODE服务启动:"); 
    console.log("http://localhost/");
console.log("http://127.0.0.1/");
console.log(`http://${iptable.localIP}/`);
}); 