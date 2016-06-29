//把JSON的字符串转成JSON对象
/*
var user = JSON.parse('{"id":1}');
console.log(user);
//只转json
console.log(JSON.stringify(user));
*/

var querystring = require('querystring');
var user = querystring.parse('name=zfpx&age=8');
console.log(user);
//只转对象
console.log(querystring.stringify(user));

var util = require('util');
// inspect用于把任意类型的对象转成字符串
console.log(util.inspect(new Date()))
