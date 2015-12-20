var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_user(){
    Dao.call(this);
}
inherits(Tbl_user, Dao);


var util = require("util");
var ErrorCode = require("../error_code")
var tools = require("../tools");

Tbl_user.prototype.signin = function(req, resp, ctx){
    if(this.check_field(req, ctx, "name",      true, 1,256) == false) return false;
    if(this.check_field(req, ctx, "pwd",     true, 1,256) == false) return false;

    var sql_fmt = "select * from tbl_user where name = '{name}' and pwd = '{pwd}' and is_del = 0";
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.signin = function(req, resp, ctx){
    if(this.check_field(req, ctx, "name",      true, 1,256) == false) return false;
    if(this.check_field(req, ctx, "pwd",     true, 1,256) == false) return false;

    var sql_fmt_is_exist = "select name from tbl_user where name = '{name}' and is_del = 0"
    var sql_fmt = "insert into tbl_user set name = '{name}', pwd = '{pwd}', remark = '{remark}',  crt_dt = now() , is_del = 0;"
    return this._dbop_insert_unique(sql_fmt_is_exist, sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.is_exist = function(req, resp, ctx){
    if(this.check_field(req, ctx, "name",      true, 1,256) == false) return false;
    if(this.check_field(req, ctx, "pwd",     true, 1,256) == false) return false;

    var sql_fmt = "select name from tbl_user where name = '{name}' and pwd = '{pwd}' and is_del = 0"
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype._check_req_data = function (arr_data, ctx){
    if(arr_data == null){
        this.easy_render_resp(ErrorCode.field_absent, "req[data] absent", ctx);
        return false;
    }
    if(util.isArray(arr_data) == false){
        this.easy_render_resp(ErrorCode.field_type_error, "req[data] is not the array", ctx);
        return false;
    }
    for( var i in arr_data){
        if(this.check_field(arr_data[i], ctx, "name",      true, 1,256) == false) return false;
        if(this.check_field(arr_data[i], ctx, "pwd",     true, 1,256) == false) return false;
    }
    return true;
}
Tbl_user.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "Tbl_user:add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }
    var sql_fmt = "insert into tbl_user set name = '{name}', pwd = '{pwd}', remark = '{remark}',  crt_dt = now() , is_del = 0;"
	return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_user:update ");
   if(this.check_field(req, ctx, "name",     true, 1,256) == false) return false;
   if(this.check_field(req, ctx, "pwd",     true, 1,256) == false) return false;
    if(this.check_field(req, ctx, "remark",    false, 1,256) == false) return false;

    var sql_fmt = "update tbl_user set name = '{name}', pwd = '{pwd}', remark = '{remark}', upd_dt = now() where user_id = '{user_id}' and name = '{name}' and is_del = 0";
    return this._dbop_update(sql_fmt, req, resp, ctx);
}
Tbl_user.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_user:remove ");
    if(this.check_field(req, ctx, "user_id",        true, 0) == false) return false;
    var sql_fmt = "update tbl_user set is_del = '1' where user_id = '{user_id}'";
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}
Tbl_user.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_user:recover ");
    if(this.check_field(req, ctx, "user_id",        true, 0) == false) return false;
    var sql_fmt = "update tbl_user set is_del = '0' where user_id = '{user_id}'";
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}
Tbl_user.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_user:select_with_name");

    if(this.check_field(req, ctx, "name",       true, 1,256) == false) return false;
    var sql_fmt = "select * from tbl_user where name = '{name}' and is_del = 0";
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}
Tbl_user.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_user:select_with_key");
    if(this.check_field(req, ctx, "user_id",        true, 1) == false) return false;

    var sql_fmt = "select * from tbl_user where user_id = '{user_id}' and is_del = 0"
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}
Tbl_user.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_user:select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

    var sql_fmt = "select user_id, name, pwd, remark, crt_dt, upd_dt, is_del from tbl_user where is_del = 0 limit {start}, {cnt}";
    return this._dbop_select(sql_fmt, req, resp, ctx);
}

var cur = new Tbl_user;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
