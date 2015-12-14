//var config = require("./config").cfg

//for(var key in config.database){
//  console.log( key  +  " " + config.database[key]);
//}
//console.log("hello world" + config.database.type)

var map = require("../proj/handler").Route

var req = "this is req"
var res = "this is res"
var next = "this is next"
for( var item in map){
    console.log(map[item].url);
    map[item].cb.call(req, res, next);
}
