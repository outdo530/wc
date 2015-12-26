var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_func(){
    Dao.call(this);
}
inherits(Tbl_func, Dao);


var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");


Tbl_func.prototype.add = function(req, resp, ctx){
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "insert into tbl_func set title = '{title}', url = '{url}', templateurl = '{templateurl}', controller = '{controller}', item_name = '{item_name}', is_navy = '{is_navy}', remark = '{remark}', crt_ts = now(), is_del = 0;";
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

Tbl_func.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_func: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

    var sql_fmt = "select title, url, templateurl, controller from tbl_func where is_navy = 1 and is_del = 0 order by id asc limit {start}, {cnt}";
    return this._dbop_select_navy(sql_fmt, req, resp, ctx);
}

var cur = new Tbl_func;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
