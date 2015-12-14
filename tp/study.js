/*
function Base(){
    this._tab = "base_name";
}
Base.prototype.run = function(){
    console.log("base: " + this._tab);
}


function Sub(){
    Base.call(this);
    this._tab = "sub name";
}
Sub.prototype = new Base();


function SubSub(){
    Sub.call(this);
    this._tab = "sub_sub name"
}

s = new SubSub();
s.run();
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

function find(line, data){
    var ret = { 'line':line};
    var stations = {};
    for( item in  data){
        if(data[item]['line'] == line){
            console.log(data[item]);
            var sta = data[item]['station']
            if(sta in stations){
                ++stations[sta];
            }
            else{
                stations[sta] = 1;
            }
        }
    }
    ret['stations'] = stations;
    return ret;
}

console.log(find('l0001', data));

