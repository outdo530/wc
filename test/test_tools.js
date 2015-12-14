var tools = require("../proj/tools");

var data  = [
    {name:"hello", message:"chenglun"},
    {name:"hello1", message:"chenglun1"},
    {name:"hello2", message:"chenglun2"},
    {name:"hello3", message:"chenglun3"},
];

var fmt = " insert into tbl_test set name = '{name}', message='{message}'; "

for( i in data){
    console.log(tools.format_object(fmt, data[i]));
}


console.log(tools.format_object_array(fmt, data));
