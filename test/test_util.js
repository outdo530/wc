var util = require('util');

exports.get_date_string = function(d){
    return util.format("%d%d%d%d%d%d%d" ,d.getFullYear() ,d.getMonth()+1, d.getDate() ,d.getHours() ,d.getMinutes() ,d.getSeconds() ,d.getMilliseconds());
}

