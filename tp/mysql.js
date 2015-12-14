var config = require("./config").cfg
var mysql = require('mysql')
var util = require("util");
var tools = require("../proj/tools");

var conn = mysql.createConnection(config.database);
conn.connect();



var data  = [
    {name:"hello", message:"chenglun"},
    {name:"hello1", message:"chenglun1"},
    {name:"hello2", message:"chenglun2"},
    {name:"hello3", message:"chenglun3"},
]
var fmt = " insert into tbl_test set name = '{name}', message='{message}'; ";
console.log(tools.format_object_array(fmt, data));



conn.query(
    tools.format_object_array(fmt, data),
    function(err, result){
        if(err) throw err;
        console.log( "new record row id : " +  result.insertId);
        console.log( "affectedRows " +  result.affectedRows + ' rows');
    }
);

conn.query(
    'update tbl_test SET ? where id = 2',
    {name:'update hello',message:'upd hell'}, 
    function(err, result){
        if(err) throw err;
        console.log("changed  " + result.changedRows + ' rows');
    }
);

conn.query(
  'SELECT * FROM tbl_test',
  function (err, results, fields){
    if (err) {
      throw err;
    }
    console.log(results);
    //console.log(".......")
    //console.log(fields);
    conn.end();
  }
);



//var http = require('http');
//http.createServer(function (request, response) {
//  response.writeHead(200, {'Content-Type': 'text/html'});
//  response.end('<b>Hello World</b>');
//}).listen(8888);
//
//console.log('Server running at http://127.0.0.1:8888/');
