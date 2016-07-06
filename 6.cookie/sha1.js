/*
var crypto = require('crypto');
//提定算法和秘钥
var shasum = crypto.createHmac('sha1', 'zfpx');
var result = shasum.update('hello').digest('hex');
console.log(result);*/


var crypto = require('crypto');
var sign = function(val, secret){
    return val + '.' + crypto
            .createHmac('sha256', secret)
            .update(val)
            .digest('base64')
            .replace(/\=+$/, '');
};

console.log(sign('hello','zfpx'));
