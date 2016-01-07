var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var host = "127.0.0.1";  //var host =  "127.0.0.1"
var port = 3000;
var url = "/dao_tbl_area";

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








// select
	{
		'cmd':'select',
		'start':0,
		'cnt':100,
	},
	
];


console.log('Starting test tbl_area:');

i = 0;
key = 0;
name='';
function test(){
	if( i < req.length )
	{
		if( req[i].cmd == 'update'
		 || req[i].cmd == 'remove'
		 || req[i].cmd == 'recover'
		 || req[i].cmd == 'select_with_key'
		)
		{
			req[i].id = key;
			req[i].title = name;
		}
		client.call(host, port, url, req[i], function(res, msg){
			if( req[i].cmd == 'select_with_name'
			 || req[i].cmd == 'select_with_key'
			)
			{
				if(msg.obj != null &&  msg.obj.length > 0 )
				{
					key = msg.obj[0].id;
					name = msg.obj[0].title;
				}
			}
			//console.log( util.inspect(msg, {showHidden: true, depth: 3, colors: true}));
			i++;
			test();
		});
	}
	else
	{
		console.log('End of test tbl_area.');
	}
}

test();