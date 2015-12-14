var client = require('../tools/client/client');
var util = require('util');

var crypto = require('crypto');
var text = "phoneNumber=15210943874&key=99999999";
var hasher=crypto.createHash("md5");
var md5key=hasher.digest('hex');

var req = {
    PhoneNumber: '15210943874',
    authKey: md5key
};
req = {
    cmd : "add",
    name : "lhelllll",
    message : 'hahdhhdhd',  
}

/*
client.call("127.0.0.1", 3000, '/jsonA', req);
req = {
    cmd : "remove",
}
client.call("127.0.0.1", 3000, '/jsonA', req);
req = {
    cmd : "update",
}
client.call("127.0.0.1", 3000, '/jsonA', req);
req = {
    cmd : "select",
}
client.call("127.0.0.1", 3000, '/jsonA', req);

req = {
    cmd : "select",
}
client.call("127.0.0.1", 3000, '/cur_status_info', req);
req = {
    cmd : "remove",
}
client.call("127.0.0.1", 3000, '/cur_status_info', req);
req = {
    cmd : "update",
}
client.call("127.0.0.1", 3000, '/cur_status_info', req);
*/

data = [
    {batch_no:'b0001', line:'l0001', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0001', line:'l0001', station:'s002', upd_ts:'upd0001',},
    {batch_no:'b0001', line:'l0001', station:'s003', upd_ts:'upd0001',},
    {batch_no:'b0001', line:'l0002', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0001', line:'l0003', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0001', line:'l0004', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0001', line:'l0005', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0002', line:'l0001', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0002', line:'l0002', station:'s002', upd_ts:'upd0001',},
    {batch_no:'b0002', line:'l0003', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0003', line:'l0001', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0004', line:'l0003', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0004', line:'l0002', station:'s001', upd_ts:'upd0001',},
    {batch_no:'b0004', line:'l0005', station:'s004', upd_ts:'upd0001',},
    {batch_no:'b0004', line:'l0001', station:'s001', upd_ts:'upd0001',},
]
req = {
    cmd         : "add",
    id          : "N0002",
    imei        : "A0001",
    line        : "busA",
    station     : "staA",
    vote        : 1,
    batch_no    : "B00001",
    city        : "shanghai",
    refresh_ts  : parseInt(new Date().getTime()/1000)
}
for( i in data){
    req['cmd'] = "add",
    req['id']           = "N013" + i;
    req['imei']         = "A000" + i;
    req['line']         = data[i]['line'];
    req['station']      = data[i]['station'];
    req['vote']         = 1;
    req['batch_no']     = data[i]['batch_no'];
    req['city']         = "shanghai",
    req['refresh_ts']   = parseInt(new Date().getTime()/1000)

    console.log(req.line, req.station);
    client.call("wherebus.duapp.com", 80, '/cur_status_info', req);
}

req = {
    cmd : "select",
    line:'l0001',
}
client.call("wherebus.duapp.com", 80, '/cur_status_info', req, 
    function(res, msg){
        var resp= eval('(' + msg + ')');
        console.log("res .........: ",  resp); 
        console.log("stations_details.............:", resp.obj.stations);
    }
);

/*
req = {
    cmd : "select",
    line:'l0001',
}
client.call("127.0.0.1", 3000, '/cur_status_info', req, 
    function(res, msg){
        var resp= eval('(' + msg + ')');
        console.log("res .........: ",  util.inspect(resp)); 
    }
);
*/
