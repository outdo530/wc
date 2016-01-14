var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_func(){
    Dao.call(this);
    this._tab["cmd_get_board"]    = this.cmd_get_board;
 
}
inherits(Tbl_func, Dao);


var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");


Tbl_func.prototype.add = function(req, resp, ctx){
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "insert into tbl_func set title = '{title}', url = '{url}', templateUrl = '{templateUrl}', controller = '{controller}', item_name = '{item_name}', is_navy = '{is_navy}', remark = '{remark}', crt_ts = now(), is_del = 0;";
    return this._dbop_insert(sql_fmt, req, resp, ctx);
}

Tbl_func.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_func: is_exist");
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "select title from tbl_func where title = '{title}' and is_del = 0"
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}


Tbl_func.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_func: update");
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "update tbl_func set title = '{title}', url = '{url}', templateurl = '{templateurl}', controller = '{controller}', item_name = '{item_name}', is_navy = '{is_navy}', remark = '{remark}', upd_ts = now() where id = '{id}' and is_del = 0";
    return this._dbop_update(sql_fmt, req, resp, ctx);
}

Tbl_func.prototype._check_req_data = function (arr_data, ctx){
    if(arr_data == null){
        this.easy_render_resp(ErrorCode.field_absent, "req[data] absent", ctx);
        return false;
    }
    if(util.isArray(arr_data) == false){
        this.easy_render_resp(ErrorCode.field_type_error, "req[data] is not the array", ctx);
        return false;
    }
    for( var i in arr_data){
        if(this.check_field(arr_data[i], ctx, "title",       true, 0,64) == false) return false;
        //if(this.check_field(arr_data[i], ctx, "parent_id",  false, 1) == false) return false;
    }
    return true;
}

Tbl_func.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "Area:add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }

    var sql_fmt = "insert into tbl_func set title = '{title}', url = '{url}', templateurl = '{templateurl}', controller = '{controller}', item_name = '{item_name}', is_navy = '{is_navy}', remark = '{remark}', crt_ts = now(), is_del = 0;";
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

Tbl_func.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_func: remove");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = "update tbl_func set is_del = '1' where id = '{id}'";
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

Tbl_func.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_func: recover");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = "update tbl_func set is_del = '0' where id = '{id}'";
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

Tbl_func.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_func: select_with_name");
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "select * from tbl_func where title = '{title}' and is_del = 0";
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

Tbl_func.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_func: select_with_key");
    if(this.check_field(req, ctx, "id",        true, 1) == false) return false;

    var sql_fmt = "select * from tbl_func where id = '{id}' and is_del = 0"
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

Tbl_func.prototype._dbop_select_navy = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("../mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function (err, results, fields){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_sel_failed;
                resp.result_string = "Select failed: " + err;
		resp.data = results;
            }
            else{
                resp.result = 0;
                resp.result_string = "OK";
		resp.data = {};
		resp.data.default_url = "/login";
		resp.data.sub_func = results;
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

Tbl_func.prototype._dbop_get_board = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("../mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function (err, results, fields){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_sel_failed;
                resp.result_string = "Select failed: " + err;
            }
            else{
                resp.result = 0;
                resp.result_string = "OK";
	        	resp.data = {
                    title:  "功能列表",
                    panels:[],
                };

                var j = 0;
                var k = 0;
    	        for(var i=0; i<results.length; i++){
                    if(resp.data.panels.length == 0){
                        resp.data.panels[j] = {
                            title:  results[i].title,
                            contents:[],
                        };
                        k = 0;
                    }
                    if(results[i].title != resp.data.panels[j].title){
                        j++;
                        resp.data.panels[j] = {
                            title:  results[i].title,
                            contents:[],
                        };
                        k = 0;
                    }
                    
    	            resp.data.panels[j].contents[k] = {
                        href: results[i].url,
                        item_name: results[i].item_name,
                    };
                    k ++;
		        }
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

Tbl_func.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_func: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = "select * from tbl_func where is_del = 0 limit {start}, {cnt};";
	return this._dbop_select(sql_fmt, req, resp, ctx);
}

Tbl_func.prototype.cmd_get_board = function(req, resp, ctx){
    console.log( "Tbl_func: cmd_get_board");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = "select * from tbl_func where is_del = 0 and is_navy = 0 order by title asc limit {start}, {cnt};";
	return this._dbop_get_board(sql_fmt, req, resp, ctx);
}




var cur = new Tbl_func;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
