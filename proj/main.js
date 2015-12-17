var cfg = require("./config");

var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());


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
