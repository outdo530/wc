var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var tbl = 'dao_tbl_area';

var host = "127.0.0.1";  // localhost
var port = 3000;
var url = "/" + tbl;

req = [
	// and route 
	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},

	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},

	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn1',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn2',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn3',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn4',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},
	{'cmd':'add','first_name':'fn5',	'last_name':'ln1',		'user_name':'un1'},



// select
	{
		'cmd':'select',
		'start':0,
		'cnt':100,
	},
	
];


console.log('Starting test' + tbl);

var i = 0;

function test(){
	if( i < req.length ){
        req[i].first_name = 'fn' + (i+1);
        req[i].last_name = 'ln' + (i+1);
        req[i].user_name = 'user' + (i+1);
	    client.call(host, port, url, req[i], function(res, msg){
			if(msg.obj != null &&  msg.obj.length > 0 )
			{
                if( i+1 < req.length ){
				    req[i+1].id = msg.obj[0].id;
                }
			}
			i++;
			test();
		});
	}
	else{
		console.log('End of test' + tbl);
	}
}

test();
