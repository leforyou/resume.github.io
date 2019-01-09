function initNav(app) {
    app.isNav = false;
}
function serveType(args){
    var arr = [];
    for (var i = 0; i < args.length; i++) {
        arr.push({ 'txt': args[i], 'width': '50%' });
    }
    if (args.length % 2 === 1) arr[0].width = '100%';
    return arr;
}
function getYear(){
    var d = new Date();
    var year = d.getFullYear();
    return year;
}


module.exports = { serveType, getYear, initNav};