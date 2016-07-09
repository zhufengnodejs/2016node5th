var arr = [1,2,3,4,5,6,7,8,9,10];
var find ={
    skip(num){
        this.skip = num;
        return this;
    },
    limit(num){
        this.limit = num;
        return this;
    },
    sort(orderBy){
        this.orderBy = orderBy;
        return this;
    },
    exec(cb){
      var that = this;
      setImmediate(function(){
          cb(arr.sort(that.orderBy).slice(that.skip,that.skip+that.limit));
      });
        return this;
    }
}
find.exec(function(data){
    console.log(data);
}).skip(2).sort((a,b)=>b-a).limit(2);