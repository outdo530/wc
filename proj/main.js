var cfg = require("./config");

var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

if(cfg.cros_support == true){
    app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            res.header("Content-Type", "application/json;charset=utf-8");
            next();
    });
}


if(cfg.print_req_debug_info){
    app.use(function (req, res, next) {
          console.log("DEBUG json test:", req.body) // populated!
          next()
    })
}

var map = require("./handler").Route
for( var i in map){
    app.post( map[i].url, map[i].cb);
}

app.listen(cfg.server.port);

console.log('Express started on port ' + cfg.server.port);
