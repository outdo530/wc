var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var tbl = 'dao_tbl_area';

var host = "127.0.0.1";  // localhost
var port = 3000;
var url = "/" + tbl;

req = [
    { cmd:'cmd_list', page:{cur:1},  },
    { cmd:'cmd_search', search:'3', page : {cur:1}, },
    { cmd:'cmd_get_detail', id:0, },
    { cmd:'cmd_get_update_info', id:0 },
    { cmd:'cmd_get_create_info', },
];


console.log('Starting test' + tbl);

var i = 0;

function test(){
	if( i < req.length )
	{
		client.call(host, port, url, req[i], function(res, msg){
            if(i+1 < req.length){
                // set id
			    if(msg.data.content != null && msg.data.content.length > 0){
                    if(msg.data.content[0].seq != null){
		    		    req[i+1].id = msg.data.content[0].seq;
                    }
                    if(msg.data.content[0].id != null){
		    		    req[i+1].id = msg.data.content[0].id;
                    }

			    }

		        if(msg.data.seq != null){ 
			    	req[i+1].id = msg.data.seq;
			    }
                if(msg.data.id != null){ 
			    	req[i+1].id = msg.data.id;
			    }

                if(msg.obj != null && msg.obj.length > 0){
                    if(msg.obj[0].seq != null){
                        req[i+1].id = msg.obj[0].seq;
                    } 
                    if(msg.obj[0].id != null){
                        req[i+1].id = msg.obj[0].id;
                    }
                }
            }

			i++;
			test();
		});
	}
	else
	{
		console.log('End of test '+tbl);
	}
}

test();
