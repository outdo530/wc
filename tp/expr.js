var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());


app.use(function (req, res, next) {
  //console.log("DEBUG json test:", req.body) // populated!
  next()
})

var map = require("../proj/handler").Route
for( var i in map){
    app.post(
        map[i].url,
        map[i].cb
    );
}

app.listen(3000);
console.log('Express started on port 3000');
