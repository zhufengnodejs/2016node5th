/**
 * 1. 读取package.json文件
 * 2. 找到devDependencies配置项
 * 3. 找到以gulp-开头的那些key(属性)
 * 4. 加载这些模块，并把加载后的返回值作为 $ 的属性
 **/
module.exports = function(){
    var $ = {};//先定义空对象
    //得到当前模块的开发依赖配置项
    var devDependencies = require('./package.json').devDependencies;
    for(var key in devDependencies){
        //如果是gulp的插件的话加载它并且赋给$
        if(key.startsWith('gulp-')&& key!='gulp-load-plugins'){
           $[key.slice(5)] = require(key);
        }
    }
    return $;
}

var $ = module.exports();
console.log($);