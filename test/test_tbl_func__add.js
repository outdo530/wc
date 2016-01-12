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
	{'cmd':'add','title':'boards',	'url':'/boards',	'templateUrl':'template/boards.html',		'controller':'boardCtrl', 'is_navy':'1'},
	{'cmd':'add','title':'area_list','url':'/area_list',	'templateUrl':'template/crud_list.html',	'controller':'crudListCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'area_detail','url':'/area_detail/:crud_id','templateUrl':'template/crud_detail.html','controller':'crudDetailCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'area_update','url':'/area_update/:crud_id','templateUrl':'template/crud_update.html','controller':'crudUpdateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'area_create','url':'/area_create',	'templateUrl':'template/crud_create.html','controller':'crudCreateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'area_list','url':'/area_list/:search',	'templateUrl':'template/crud_list.html','controller':'crudListCtrl', 'is_navy':'1'	},

	// and board
	{'cmd':'add','title':'Area',	'url':'#/area_list',		'item_name':'Area List',	'is_navy':'0'},
	{'cmd':'add','title':'Area',	'url':'#/area_create',		'item_name':'Area Create',	'is_navy':'0'},
	{'cmd':'add','title':'Customer',	'url':'#/customer_list',		'item_name':'Customer List',	'is_navy':'0'},
	{'cmd':'add','title':'Customer',	'url':'#/customer_create',		'item_name':'Customer Create',	'is_navy':'0'},
	{'cmd':'add','title':'Seller',	'url':'#/seller_list',		'item_name':'Seller List',	'is_navy':'0'},
	{'cmd':'add','title':'Seller',	'url':'#/seller_create',		'item_name':'Seller Create',	'is_navy':'0'},
	{'cmd':'add','title':'Buyer',	'url':'#/buyer_list',		'item_name':'Buyer List',	'is_navy':'0'},
	{'cmd':'add','title':'Buyer',	'url':'#/buyer_create',		'item_name':'Buyer Create',	'is_navy':'0'},
    {'cmd':'add','title':'LP',	'url':'#/lp_list',		'item_name':'LP List',	'is_navy':'0'},
	{'cmd':'add','title':'LP',	'url':'#/lp_create',		'item_name':'LP Create',	'is_navy':'0'},
	{'cmd':'add','title':'User',	'url':'#/user_list',		'item_name':'User List',	'is_navy':'0'},
	{'cmd':'add','title':'User',	'url':'#/user_create',		'item_name':'User Create',	'is_navy':'0'},
 

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
