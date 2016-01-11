var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var tbl = 'dao_tbl_seller';

var host = "127.0.0.1";  // localhost
var port = 3000;
var url = "/" + tbl;

req = [
	// add 
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},
	{cmd:'add', cust_id:'', property_desc:'',	bad_property_desc:'', class_1:'', class_2:'', class_3:''},

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
        req[i].property_desc = 'pd' + (i+1);
        req[i].bad_property_desc = 'bpd' + (i+1);
        req[i].class_1 = 'ClsI' + (i+1);
        req[i].class_2 = 'ClsII' + (i+1);
        req[i].class_3 = 'ClsIII' + (i+1);
	
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
