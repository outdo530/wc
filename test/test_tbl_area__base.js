var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var tbl = 'dao_tbl_area';

var host = "127.0.0.1";  // localhost
var port = 3000;
var url = '/'+tbl;

req = [
    { cmd:'add', user_name:'test1'},
    { cmd:'select_with_key', id:0},
    { cmd:'update', first_name:'阿斯兰雕刻技法', last_name:'last_name_updated', id:0},
    { cmd:'remove', id:0},
    { cmd:'select_with_key', id:0},
    { cmd:'recover', id:0},
    { cmd:'select_with_key', id:0},
    { cmd:'remove', id:0}, 
    { cmd:'select_with_key', id:0},
 ];


console.log('Starting test '+tbl+': ');

var i = 0;

function test(){
	if( i < req.length )
	{
		client.call(host, port, url, req[i], function(res, msg){
            if(i+1 < req.length){
                // set id to the next req
                if(msg.insertId != null){
		    	    req[i+1].id = msg.insertId;
                }
                else{
                    req[i+1].id = req[i].id;
                }
            }

			i++;
			test();
		});
	}
	else
	{
		console.log('End of test '+tbl+'.');
	}
}

test();
