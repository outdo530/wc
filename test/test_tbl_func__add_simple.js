var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var host = "127.0.0.1";  //var host =  "127.0.0.1"
var port = 3000;
var url = "/dao_tbl_func";

req = [
	// and route 
	{'cmd':'add','title':'login',	'url':'/login',		'templateUrl':'template/login.html',		'controller':'loginCtrl', 'is_navy':'1'},

	// and board
	{'cmd':'add','title':'Area111111111',	'url':'#/area_list',		'item_name':'Area List',	'is_navy':'0'},
	{'cmd':'add','title':'Area111111111',	'url':'#/area_create',		'item_name':'Area Create',	'is_navy':'0'},
	{'cmd':'add','title':'Area',	'url':'#/area_list',		'item_name':'Area List',	'is_navy':'0'},
	{'cmd':'add','title':'Area',	'url':'#/area_create',		'item_name':'Area Create',	'is_navy':'0'},

	// select
	{
		'cmd':'select',
		'start':0,
		'cnt':100,
	},
	
];


console.log('Starting test tbl_func:');

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
		console.log('End of test tbl_func.');
	}
}

test();
