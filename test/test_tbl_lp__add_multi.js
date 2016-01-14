var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var tbl = 'dao_tbl_lp';

var host = "127.0.0.1";  // localhost
var port = 3000;
var url = "/" + tbl;

req = [
	// add 
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},
	{cmd:'add', cust_id:0, _type:'',	risk_prefer_desc:'', expect_of_contrib:'', reward_of_contrib:'',},

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
	
        req[i].cust_id =  (i+1);
        req[i]._type = 'type' + (i+1);
        req[i].risk_prefer_desc = 'rpd' + (i+1);
        req[i].expect_of_contrib = 'eoc' + (i+1);
        req[i].reward_of_contrib = 'roc' + (i+1);
	
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
