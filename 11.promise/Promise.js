var Promise = function(fn){
    var self = this;
    function resolve(data){
        self.resolved(data);
    }
    function reject(error){
        self.rejected(error);
    }
    fn(resolve,reject);
}

Promise.prototype.then = function(resolved,rejected){
    this.resolved = resolved;
    this.rejected = rejected;
}
module.exports = Promise;