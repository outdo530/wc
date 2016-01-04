var util = require("util");
var inherits = require("util").inherits;


function call(rip, rport, rpath, req_str, cb_res){

    var request_string = JSON.stringify(req_str);
    console.log("");
    console.log("req_str : ", request_string, " url:" , rpath );

    var options = {
        host: rip,
        port: rport,
        path: rpath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': request_string.length
        }
    };
    var http = require('http');
    var req = http.request(
        options, 
        function (res) {
            if(res.statusCode != '200'){
                console.log('respone STATUS: ' + res.statusCode);
                console.log('respone HEADERS: ' + JSON.stringify(res.headers));
            }
            //res.setEncoding('utf8');
            res.on(
                'data', 
                function (message) {
                    var ret= eval('(' + message + ')');
                    if(cb_res != null){
			console.log( util.inspect(ret, {depth: 5, colors: true}));
                        cb_res(res,ret);
                    }
                    else{
                        console.log('resp_str: ' ,ret);
                    }
                }
            );

        }
    );
    req.on(
        'error', 
        function(e) {
            console.log('problem with request: ' + e.message);
        }
    );

    req.write(request_string);
    req.end();
}

exports.call = call
