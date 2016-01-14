var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var tbl = 'dao_tbl_customer';

var host = "127.0.0.1";  // localhost
var port = 3000;
var url = "/" + tbl;

req = [
	// and route 
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},
	{'cmd':'add', nm:''},



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
        req[i].nm = 'nm' + (i+1);
       
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
