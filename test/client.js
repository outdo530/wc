var util = require("util");
var inherits = require("util").inherits;



function mbStringLength(s) {
    var totalLength = 0;
    var i;
    var charCode;
    for (i = 0; i < s.length; i++) {
        charCode = s.charCodeAt(i);
        if (charCode < 0x007f) {
            totalLength = totalLength + 1;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 3;
        }
    }
    //alert(totalLength);
    return totalLength;
}
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
            'Content-Type': 'application/json;charset=utf-8"',
            'Content-Length': mbStringLength(request_string),
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
