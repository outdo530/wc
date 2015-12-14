var client = require('./client');
var test_util = require("./test_util");

var host = "127.0.0.1";  //var host =  "127.0.0.1"
var port = 3000;
var url = "/dao_tbl_user";

req = [
	{
		'cmd':'signin',
		'name':'ccelee',
		'pwd':'123456',
	},
	{
		'cmd':'signin',
		'name':'yunccll',
		'pwd':'654321',
	},
	{
		'cmd':'add',
		'name':'hahaha',
		'pwd':'888888',
	},
	{
		'cmd':'select',
		'start':'0',
		'cnt':'3'
	},
	{
		'cmd':'is_exist',
		'name':'ccelee',
		'pwd':'123456',
	},
	{
		'cmd':'is_exist',
		'name':'ccelee',
		'pwd':'666666',
	},
	{
		'cmd':'login',
		'name':'ccelee',
		'pwd':'123456',
	},
	{
		'cmd':'update',
		'pwd':'666666',
	},
	{
		'cmd':'is_exist',
		'name':'ccelee',
		'pwd':'123456',
	},
	{
		'cmd':'is_exist',
		'name':'ccelee',
		'pwd':'666666',
	},
	{
		'cmd':'select_with_name',
		'name':'hahaha',
	},
	{
		'cmd':'select_with_key',
	},
	{
		'cmd':'is_exist',
		'name':'hahaha',
		'pwd':'888888',
	},
	{
		'cmd':'remove',
	},
	{
		'cmd':'is_exist',
		'name':'hahaha',
		'pwd':'888888',
	},
];


console.log('Starting test tbl_user:');

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
			req[i].user_id = key;
			req[i].name = name;
		}
		client.call(host, port, url, req[i], function(res, msg){
			if( req[i].cmd == 'select_with_name'
			 || req[i].cmd == 'select_with_key'
			)
			{
				if(msg.obj != null &&  msg.obj.length > 0 )
				{
					key = msg.obj[0].user_id;
					name = msg.obj[0].name;
				}
			}
			console.log(msg);
			i++;
			test();
		});
	}
	else
	{
		console.log('End of test tbl_user.');
	}
}

test();
