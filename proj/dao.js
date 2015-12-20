var inherits = require("util").inherits;
var HandleBase = require("./handle_base");
var tools = require("./tools");
var ErrorCode = require("./error_code")

function Dao(){
    HandleBase.call(this);
    if(this._tab == null){
        this._tab = {}
    }
    this._tab["add"]    = this.add,
    this._tab["remove"] = this.remove,
    this._tab["update"] = this.update,
    this._tab["select"] = this.select
    this._tab["is_exist"] = this.is_exist;
    this._tab["add_multi_rows"] = this.add_multi_rows;
    this._tab["recover"] = this.recover;
    this._tab["select_with_name"] = this.select_with_name;
    this._tab["select_with_key"] = this.select_with_key;
    this._tab["signup"] = this.signup;
    this._tab["signin"] = this.signin;
}
inherits(Dao, HandleBase)

Dao.prototype.signup = function(req, resp, ctx){
    console.log( "dao: signup:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.signin = function(req, resp, ctx){
    console.log( "dao: signin:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.add = function(req, resp, ctx){
    console.log( "dao: add:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.update = function(req, resp, ctx){
    console.log( "dao: update:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.remove = function(req, resp, ctx){
    console.log( "dao:remove:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.select = function(req, resp, ctx){
    console.log( "dao:select:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.is_exist = function(req, resp, ctx){
    console.log( "dao:is_exist:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "dao:add_multi_rows:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.recover = function(req, resp, ctx){
    console.log( "dao:recover:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.select_with_name = function(req, resp, ctx){
    console.log( "dao:select_with_name:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
Dao.prototype.select_with_key = function(req, resp, ctx){
    console.log( "dao:select_with_key:no_action");
	this.easy_render_resp(ErrorCode.cmd_not_implement, "the req[cmd] is not implement", ctx);
    return true;
}
//protected function
Dao.prototype._dbop_insert = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function(err, result){
            if(err) { 
                console.log("err: ", err);
                resp.result = ErrorCode.db_ins_failed;
                resp.result_string = "Insert failed: " + err;
            }
            else{
                console.log( "new record row id : " +  result.insertId);
                console.log( "affectedRows " +  result.affectedRows + ' rows');

                resp.insertId = result.insertId;
                resp.affectedRows = result.affectedRows;
                resp.result = 0;
                resp.result_string = "OK";
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}
Dao.prototype._dbop_update = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function(err, result){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_upd_failed;
                resp.result_string = "Update failed: " + err;
            }
            else{
                console.log("changed  " + result.changedRows + ' rows');
                resp.changedRows = result.changedRows;
                resp.result = 0;
                resp.result_string = "OK";
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return true;
}
Dao.prototype._dbop_remove = function( sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function(err, result){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_del_failed;
                resp.result_string = "Remove failed: " + err;
            }
            else{
                console.log("changed  " + result.changedRows + ' rows');
                resp.changedRows = result.changedRows;
                resp.result = 0;
                resp.result_string = "OK";
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return true;
}
Dao.prototype._dbop_recover = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function(err, result){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_del_failed;
                resp.result_string = "Recover failed: " + err;
            }
            else{
                console.log("changed  " + result.changedRows + ' rows');
                resp.changedRows = result.changedRows;
                resp.result = 0;
                resp.result_string = "OK";
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return true;
}
Dao.prototype._dbop_select_with_name = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function (err, results, fields){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_sel_failed;
                resp.result_string = "Select with name failed: " + err;
            }
            else{
                resp.result = 0;
                resp.result_string = "OK";
            }
            resp.obj = results;
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

Dao.prototype._dbop_select_with_key = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function (err, results, fields){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_sel_failed;
                resp.result_string = "Select_with_key failed: " + err;
            }
            else{
                resp.result = 0;
                resp.result_string = "OK";
            }
            resp.obj = results;
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

Dao.prototype._dbop_select = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
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
            }
            resp.obj = results;
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

Dao.prototype._dbop_is_exist = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function (err, results, fields){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_sel_failed;
                resp.result_string = "Insert failed: " + err;
            }
            else{
                resp.result = 0;
                resp.result_string = "OK";
            }
            resp.is_exist = results.length > 0 ? true : false;
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

Dao.prototype._dbop_add_multi_rows  = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
    var inserted_count = 0;
    for(i in req.data){
        mysql_conn.query(
            tools.format_object(sql_fmt, req.data[i]),
            function(err, result){
                if(err){
                    console.log("err: ", err);
					mysql_conn.end();
                    dao_obj.easy_render_resp(ErrorCode.db_ins_failed, "Insert failed: " + err, ctx);
                }
                else{
                    inserted_count ++;             
                    if(inserted_count == req.data.length){
                        resp.affectedRows = inserted_count;
                        resp.result = 0;
                        resp.result_string = "OK";
                        mysql_conn.end();
                        dao_obj.render_resp(resp, ctx);
                    }
                }
            }
        );
    }
    return  true;
}
Dao.prototype._dbop_insert_unique = function(sql_fmt_is_exist, sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("./mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt_is_exist, req),
        function(err, results,fields){
            if(err) { 
                console.log("err: ", err);
                resp.result = ErrorCode.db_ins_failed;
                resp.result_string = "Judge failed: " + err;
	        mysql_conn.end();
	        dao_obj.render_resp(resp, ctx);
            }
            else{
		console.log("length: ", results.length );
		if( results.length == 0){
		    mysql_conn.query(
		       	tools.format_object(sql_fmt, req),
 		        function(err, results, fields){
 		            if(err) { 
		                console.log("err: ", err);
		                resp.result = ErrorCode.db_ins_failed;
		                resp.result_string = "Insert failed: " + err;
			    }
			    else{
                		console.log( "new record row id : " +  results.insertId);
                		console.log( "affectedRows " +  results.affectedRows + ' rows');

                		resp.insertId = results.insertId;
                		resp.affectedRows = results.affectedRows;
                		resp.result = 0;
                		resp.result_string = "OK";
			    }
	        	    mysql_conn.end();
	       	            dao_obj.render_resp(resp, ctx);
			    
			}
		    );
		}
		else{
	            resp.result = 0;
                    resp.result_string = "Insert failed: already exist";
	            mysql_conn.end();
	            dao_obj.render_resp(resp, ctx);
		}
            }
        }
    );
    return  true;
}

module.exports = Dao
