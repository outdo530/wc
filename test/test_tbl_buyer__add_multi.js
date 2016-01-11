var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var tbl = 'dao_tbl_buyer';

var host = "127.0.0.1";  // localhost
var port = 3000;
var url = "/" + tbl;

req = [
	// add 
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},
	{cmd:'add', cust_id:0, ship_type:'',	ship_weigth:'', require_type:'', urgent:'', fund_require:'',can_to_lp:0,reason_to_lp:''},

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
	
        req[i].cust_id =(i+1);
        req[i].ship_type = 'ship_type' + (i+1);
        req[i].ship_weigth = 'ship_weigth' + (i+1);
        req[i].require_type = 'require_type' + (i+1);
        req[i].fund_require = 'fund_require' + (i+1);
        req[i].can_to_lp =  (i+1);
        req[i].reason_to_lp = 'reason_to_lp' + (i+1);
	
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
