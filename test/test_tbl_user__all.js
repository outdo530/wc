var client = require('./client');
var test_util = require("./test_util");

var host = "127.0.0.1";  //var host =  "127.0.0.1"
var port = 3000;
var url = "/dao_tbl_user";

req = [
	{
		'cmd':'signup',
		'sign_id':'ccelee',
		'password':'123456',
	},
	{
		'cmd':'signup',
		'sign_id':'yunccll',
		'password':'654321',
	},
	{
		'cmd':'add',
		'sign_id':'hahaha',
		'password':'888888',
	},
	{
		'cmd':'select',
		'start':'0',
		'cnt':'3'
	},
	{
		'cmd':'is_exist',
		'sign_id':'ccelee',
		'password':'123456',
	},
	{
		'cmd':'is_exist',
		'sign_id':'ccelee',
		'password':'666666',
	},
	{
		'cmd':'signin',
		'sign_id':'ccelee',
		'password':'123456',
	},
	{
		'cmd':'update',
		'password':'666666',
	},
	{
		'cmd':'is_exist',
		'sign_id':'ccelee',
		'password':'123456',
	},
	{
		'cmd':'is_exist',
		'sign_id':'ccelee',
		'password':'666666',
	},
	{
		'cmd':'select_with_name',
		'sign_id':'hahaha',
	},
	{
		'cmd':'select_with_key',
	},
	{
		'cmd':'is_exist',
		'sign_id':'hahaha',
		'password':'888888',
	},
	{
		'cmd':'remove',
	},
	{
		'cmd':'is_exist',
		'sign_id':'hahaha',
		'password':'888888',
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
			req[i].id = key;
			req[i].sign_id = name;
		}
		client.call(host, port, url, req[i], function(res, msg){
			if( req[i].cmd == 'select_with_name'
			 || req[i].cmd == 'select_with_key'
			)
			{
				if(msg.obj != null &&  msg.obj.length > 0 )
				{
					key = msg.obj[0].id;
					name = msg.obj[0].sign_id;
				}
			}
			//console.log(msg);
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
