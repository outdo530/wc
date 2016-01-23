var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var host = "127.0.0.1";  //var host =  "127.0.0.1"
var port = 30000;
var url = "/dao_tbl_func";

req = [
	// and route 
	{'cmd':'add','title':'login',	'url':'/login',		'templateUrl':'template/login.html',		'controller':'loginCtrl', 'is_navy':'1'},
	{'cmd':'add','title':'boards',	'url':'/boards',	'templateUrl':'template/boards.html',		'controller':'boardCtrl', 'is_navy':'1'},

    // controller: area
//	{'cmd':'add','title':'area_list','url':'/area_list',	'templateUrl':'template/crud_list.html',	'controller':'crudListCtrl', 'is_navy':'1'	},
//	{'cmd':'add','title':'area_detail','url':'/area_detail/:crud_id','templateUrl':'template/crud_detail.html','controller':'crudDetailCtrl', 'is_navy':'1'	},
//	{'cmd':'add','title':'area_update','url':'/area_update/:crud_id','templateUrl':'template/crud_update.html','controller':'crudUpdateCtrl', 'is_navy':'1'	},
//	{'cmd':'add','title':'area_create','url':'/area_create',	'templateUrl':'template/crud_create.html','controller':'crudCreateCtrl', 'is_navy':'1'	},
//	{'cmd':'add','title':'area_list','url':'/area_list/:search',	'templateUrl':'template/crud_list.html','controller':'crudListCtrl', 'is_navy':'1'	},
    // controller: customer
	{'cmd':'add','title':'customer_list','url':'/customer_list',	'templateUrl':'template/crud_list.html',	'controller':'crudListCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'customer_detail','url':'/customer_detail/:crud_id','templateUrl':'template/crud_detail.html','controller':'crudDetailCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'customer_update','url':'/customer_update/:crud_id','templateUrl':'template/crud_update.html','controller':'crudUpdateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'customer_create','url':'/customer_create',	'templateUrl':'template/crud_create.html','controller':'crudCreateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'customer_list','url':'/customer_list/:search',	'templateUrl':'template/crud_list.html','controller':'crudListCtrl', 'is_navy':'1'	},
    // controller: seller
	{'cmd':'add','title':'seller_list','url':'/seller_list',	'templateUrl':'template/crud_list.html',	'controller':'crudListCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'seller_detail','url':'/seller_detail/:crud_id','templateUrl':'template/crud_detail.html','controller':'crudDetailCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'seller_update','url':'/seller_update/:crud_id','templateUrl':'template/crud_update.html','controller':'crudUpdateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'seller_create','url':'/seller_create',	'templateUrl':'template/crud_create.html','controller':'crudCreateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'seller_list','url':'/seller_list/:search',	'templateUrl':'template/crud_list.html','controller':'crudListCtrl', 'is_navy':'1'	},
    // controller: buyer
	{'cmd':'add','title':'buyer_list','url':'/buyer_list',	'templateUrl':'template/crud_list.html',	'controller':'crudListCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'buyer_detail','url':'/buyer_detail/:crud_id','templateUrl':'template/crud_detail.html','controller':'crudDetailCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'buyer_update','url':'/buyer_update/:crud_id','templateUrl':'template/crud_update.html','controller':'crudUpdateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'buyer_create','url':'/buyer_create',	'templateUrl':'template/crud_create.html','controller':'crudCreateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'buyer_list','url':'/buyer_list/:search',	'templateUrl':'template/crud_list.html','controller':'crudListCtrl', 'is_navy':'1'	},
    // controller: lp
	{'cmd':'add','title':'lp_list','url':'/lp_list',	'templateUrl':'template/crud_list.html',	'controller':'crudListCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'lp_detail','url':'/lp_detail/:crud_id','templateUrl':'template/crud_detail.html','controller':'crudDetailCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'lp_update','url':'/lp_update/:crud_id','templateUrl':'template/crud_update.html','controller':'crudUpdateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'lp_create','url':'/lp_create',	'templateUrl':'template/crud_create.html','controller':'crudCreateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'lp_list','url':'/lp_list/:search',	'templateUrl':'template/crud_list.html','controller':'crudListCtrl', 'is_navy':'1'	},
    // controller: user
	{'cmd':'add','title':'user_list','url':'/user_list',	'templateUrl':'template/crud_list.html',	'controller':'crudListCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'user_detail','url':'/user_detail/:crud_id','templateUrl':'template/crud_detail.html','controller':'crudDetailCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'user_update','url':'/user_update/:crud_id','templateUrl':'template/crud_update.html','controller':'crudUpdateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'user_create','url':'/user_create',	'templateUrl':'template/crud_create.html','controller':'crudCreateCtrl', 'is_navy':'1'	},
	{'cmd':'add','title':'user_list','url':'/user_list/:search',	'templateUrl':'template/crud_list.html','controller':'crudListCtrl', 'is_navy':'1'	},

	// boards:
	//{'cmd':'add','title':'地区',	'url':'#/area_list',		'item_name':'地区列表',	'is_navy':'0'},
	//{'cmd':'add','title':'地区',	'url':'#/area_create',		'item_name':'新增地区',	'is_navy':'0'},
	{'cmd':'add','title':'客户',	'url':'#/customer_list',		'item_name':'客户列表',	'is_navy':'0'},
	{'cmd':'add','title':'客户',	'url':'#/customer_create',		'item_name':'新增客户',	'is_navy':'0'},
	{'cmd':'add','title':'卖家',	'url':'#/seller_list',		'item_name':'卖家列表',	'is_navy':'0'},
	{'cmd':'add','title':'卖家',	'url':'#/seller_create',		'item_name':'新增卖家',	'is_navy':'0'},
	{'cmd':'add','title':'买家',	'url':'#/buyer_list',		'item_name':'买家列表',	'is_navy':'0'},
	{'cmd':'add','title':'买家',	'url':'#/buyer_create',		'item_name':'新增买家',	'is_navy':'0'},
    {'cmd':'add','title':'LP',	'url':'#/lp_list',		'item_name':'LP列表',	'is_navy':'0'},
	{'cmd':'add','title':'LP',	'url':'#/lp_create',		'item_name':'新增LP',	'is_navy':'0'},
	{'cmd':'add','title':'用户',	'url':'#/user_list',		'item_name':'用户列表',	'is_navy':'0'},
	{'cmd':'add','title':'用户',	'url':'#/user_create',		'item_name':'新增用户',	'is_navy':'0'},
 

	// select
	{
		'cmd':'select',
		'start':'0',
		'cnt':'100',
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
