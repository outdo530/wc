var config = require("./config")
var mysql = require("mysql")

exports.create_short = function(){
    conn = mysql.createConnection(config.database);
    conn.connect(
        function(err){
            if (err) {
                //res.end('connect error');
                console.error(err);
                return;
            }
            //res.write('connected success\n');
        });
    conn.on('error',
        function(err) {
            if (err.errno != 'ECONNRESET') {
                console.error(err);
                throw err;
            } else {
                //do nothing
            }
        });
    return conn;
}

