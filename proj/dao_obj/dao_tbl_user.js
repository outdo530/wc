var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_user(){
    Dao.call(this);
}
inherits(Tbl_user, Dao);


var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");

Tbl_user.prototype.signin = function(req, resp, ctx){
    console.log( "Tbl_user: signin");
    if(this.check_field(req, ctx, "sign_id",      true, 4,64) == false) return false;
    if(this.check_field(req, ctx, "password",     true, 6,128) == false) return false;

    var sql_fmt = "select * from tbl_user where sign_id = '{sign_id}' and password = '{password}' and is_del = 0";
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.signup = function(req, resp, ctx){
    console.log( "Tbl_user: signup");
    if(this.check_field(req, ctx, "sign_id",      true, 4,64) == false) return false;
    if(this.check_field(req, ctx, "password",     true, 6,128) == false) return false;

    var sql_fmt_is_exist = "select sign_id from tbl_user where sign_id = '{sign_id}' and is_del = 0"
    var sql_fmt = "insert into tbl_user set emp_no = '{emp_no}', real_nm = '{real_nm}', gender = '{gender}', email = '{email}', mobile = '{mobile}', fix_phone = '{fix_phone}', id_card_no = '{id_card_no}', enter_date = '{enter_date}', left_date = '{left_date}', user_type = '{user_type}', sign_id = '{sign_id}', nick_nm = '{nick_nm}', password = '{password}', remark = '{remark}', crt_ts = now(), is_del = 0;"
    return this._dbop_insert_unique(sql_fmt_is_exist, sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_user: is_exist");
    if(this.check_field(req, ctx, "sign_id",      true, 4,64) == false) return false;

    var sql_fmt = "select sign_id from tbl_user where sign_id = '{sign_id}' and is_del = 0"
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
        if(this.check_field(arr_data[i], ctx, "sign_id",      true, 4,64) == false) return false;
        if(this.check_field(arr_data[i], ctx, "password",     true, 6,128) == false) return false;
    }
    return true;
}

Tbl_user.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "Tbl_user: add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }

    var sql_fmt = "insert into tbl_user set sign_id = '{sign_id}', password = '{password}', remark = '{remark}',  crt_ts = now() , is_del = 0;"
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_user: update");
    if(this.check_field(req, ctx, "sign_id",      true, 4,64) == false) return false;
    if(this.check_field(req, ctx, "password",     true, 6,128) == false) return false;

    var sql_fmt = "update tbl_user set emp_no = '{emp_no}', real_nm = '{real_nm}', gender = '{gender}', email = '{email}', mobile = '{mobile}', fix_phone = '{fix_phone}', id_card_no = '{id_card_no}', enter_date = '{enter_date}', left_date = '{left_date}', user_type = '{user_type}', nick_nm = '{nick_nm}', password = '{password}', remark = '{remark}', upd_ts = now() where id = '{id}' and is_del = 0";
    return this._dbop_update(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_user: remove");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = "update tbl_user set is_del = '1' where id = '{id}'";
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_user: recover");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = "update tbl_user set is_del = '0' where id = '{id}'";
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_user: select_with_name");
    if(this.check_field(req, ctx, "sign_id",       true, 4,64) == false) return false;

    var sql_fmt = "select * from tbl_user where sign_id = '{sign_id}' and is_del = 0";
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_user: select_with_key");
    if(this.check_field(req, ctx, "id",        true, 1) == false) return false;

    var sql_fmt = "select * from tbl_user where id = '{id}' and is_del = 0"
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

Tbl_user.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_user: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

    var sql_fmt = "select id, sign_id, password, remark, crt_ts, upd_ts, is_del from tbl_user where is_del = 0 limit {start}, {cnt}";
    return this._dbop_select(sql_fmt, req, resp, ctx);
}

var cur = new Tbl_user;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
