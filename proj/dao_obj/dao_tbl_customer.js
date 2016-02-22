var inherits = require("util").inherits;
var tbl_const = require("./tbl_const");
var Dao = require("../dao");
function Tbl_customer(){
    Dao.call(this);

    Tbl_customer.tbl_name = 'customer';
    Tbl_customer.title = '客户';

    Tbl_customer.info = {
        title: Tbl_customer.title,
        tbl_name: 'tbl_'+Tbl_customer.tbl_name,
        m_page_cfg : { size : 6, },
        struct : {
	        id: { key: 'id', key_text: '编号', key_type: 'label', value_def: null, value_type: 'number',
                is_col:1, is_view:1     },
	        nm: { key: 'nm',  key_text: '名称', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_list:1, is_to_set:1, is_detail:1, op: tbl_const.op_type_text(),},
	        contact_nm: { key: 'contact_nm',  key_text: '联系人', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_list:1, is_to_set:1, is_detail:1, op: tbl_const.op_type_text(),},
	        fix_phone: { key: 'fix_phone',  key_text: '固话', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_list:1, is_to_set:1 , is_detail:1, op: tbl_const.op_type_text(),       },
	        mobile: { key: 'mobile',  key_text: '手机', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_list:1, is_to_set:1 , is_detail:1, op: tbl_const.op_type_text(),             },
	        addr: { key: 'addr',  key_text: '地址', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_list:1, is_to_set:1   , is_detail:1, op: tbl_const.op_type_text(),  },
	        is_buyer: { key: 'is_buyer',  key_text: '是否买家', key_type: 'label', value_def: 0, value_type: 'number',
                is_col:1, is_list:1, is_detail:1, is_to_set:1 ,   },
	        is_seller: { key: 'is_seller',  key_text: '是否卖家', key_type: 'label', value_def: 0, value_type: 'number',
                is_col:1, is_list:1 , is_detail:1, is_to_set:1 , },
	        is_lp: { key: 'is_lp',  key_text: '是否LP', key_type: 'label', value_def: 0, value_type: 'number',
                is_col:1, is_list:1, is_detail:1, is_to_set:1 , },
	        remark: { key: 'remark',  key_text: '备注', key_type: 'label', value_def: '', value_type: 'text',
                is_col: 1, is_to_set: 1,    },
	        crt_ts: { key: 'crt_ts',  key_text: '创建时间', key_type: 'label', value_def: '', value_type: 'text',
                is_col: 1,                                },
	        upd_ts: { key: 'upd_ts',  key_text: '修改时间', key_type: 'label', value_def: '', value_type: 'text',
                is_col: 1,                                },
	        is_del: { key: 'is_del',  key_text: '已删除?', key_type: 'label', value_def: '', value_type: 'text',
                is_col: 1,                                 },
	        upd: { key: 'update',  key_text: '更新?', key_type: 'label', value_def: '', value_type: 'text',
                is_view:1                                       },
	        del: { key: 'delete',  key_text: '删除?', key_type: 'label', value_def: '', value_type: 'text',
                is_view:1                                       },
        },
        titles : {
            list : Tbl_customer.title,
            search: Tbl_customer.title,
            detail: '详情',
            update: '修改',
            create: '新增'
        },
        url : {
            list :   '#/'+Tbl_customer.tbl_name+'_list',
            create : '#/'+Tbl_customer.tbl_name+'_create',
            update : '#/'+Tbl_customer.tbl_name+'_update',
            detail : '#/'+Tbl_customer.tbl_name+'_detail',
        },
    };

    this._tab["cmd_list"]    = this.cmd_list;
    this._tab["cmd_search"]    = this.cmd_search;
    this._tab["cmd_get_detail"]    = this.cmd_get_detail;
    this._tab["cmd_get_update_info"]    = this.cmd_get_update_info;
    this._tab["cmd_get_create_info"]    = this.cmd_get_create_info;
}
inherits(Tbl_customer, Dao);

var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");
var dao_tools = require("./dao_tools");

// get tbl info
Tbl_customer.prototype._get_tbl_info = function(){
    return Tbl_customer.info;
}



// base cmd:

// cmd: add
Tbl_customer.prototype.add = function(req, resp, ctx){
    console.log( "Tbl_customer: add");
    if(this.check_field(req, ctx, "nm", '名称',       true, 1,256) == false) return false;
    if(this.check_field(req, ctx, "contact_nm", '联系人',       true, 1,16) == false) return false;
    if(this.check_field(req, ctx, "fix_phone", '固话',       true, 1,16) == false) return false;
    if(this.check_field(req, ctx, "mobile", '手机',       true, 1,16) == false) return false;
    if(this.check_field(req, ctx, "addr", '地址',       true, 1,128) == false) return false;
//    if(this.check_field(req, ctx, "is_buyer", '是否买家',       true, 0) == false) return false;
//    if(this.check_field(req, ctx, "is_seller", '是否卖家',       true, 0) == false) return false;
//    if(this.check_field(req, ctx, "is_lp", '是否LP',       true, 0) == false) return false;

    var sql_fmt = dao_tools._get_add_sql(this._get_tbl_info());
    return this._dbop_insert(sql_fmt, req, resp, ctx);
}

// cmd: is_exist
Tbl_customer.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_customer: is_exist");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = dao_tools._get_is_exist_sql(this._get_tbl_info());
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}

// cmd: update
Tbl_customer.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_customer: update");
    if(this.check_field(req, ctx, "id", '编号',       true, 1) == false) return false;
    if(this.check_field(req, ctx, "nm", '名称',       true, 1,256) == false) return false;
    if(this.check_field(req, ctx, "contact_nm", '联系人',       true, 1,16) == false) return false;
    if(this.check_field(req, ctx, "fix_phone", '固话',       true, 1,16) == false) return false;
    if(this.check_field(req, ctx, "mobile", '手机',       true, 1,16) == false) return false;
    if(this.check_field(req, ctx, "addr", '地址',       true, 1,128) == false) return false;
//    if(this.check_field(req, ctx, "is_buyer", '是否买家',       true, 0) == false) return false;
//    if(this.check_field(req, ctx, "is_seller", '是否卖家',       true, 0) == false) return false;
//    if(this.check_field(req, ctx, "is_lp", '是否LP',       true, 0) == false) return false;


    var sql_fmt = dao_tools._get_update_sql(this._get_tbl_info());
    return this._dbop_update(sql_fmt, req, resp, ctx);
}

// check req array
Tbl_customer.prototype._check_req_data = function (arr_data, ctx){
    if(arr_data == null){
        this.easy_render_resp(ErrorCode.field_absent, "req[data] absent", ctx);
        return false;
    }
    if(util.isArray(arr_data) == false){
        this.easy_render_resp(ErrorCode.field_type_error, "req[data] is not the array", ctx);
        return false;
    }
    for( var i in arr_data){
        if(this.check_field(arr_data[i], ctx, "name",       true, 0,64) == false) return false;
        //if(this.check_field(arr_data[i], ctx, "parent_id",  false, 1) == false) return false;
    }
    return true;
}

// cmd: add_multi_rows
Tbl_customer.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "Tbl_customer: add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }

    var sql_fmt = dao_tools._get_add_sql(this._get_tbl_info());
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

// cmd: remove
Tbl_customer.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_customer: remove");
    if(this.check_field(req, ctx, "id", '编号',       true, 1) == false) return false;
    
    var sql_fmt = dao_tools._get_remove_sql(this._get_tbl_info());
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

// cmd: recover
Tbl_customer.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_customer: recover");
    if(this.check_field(req, ctx, "id",'编号',        true, 1) == false) return false;

    var sql_fmt = dao_tools._get_recover_sql(this._get_tbl_info());
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

// cmd: select_with_name
Tbl_customer.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_customer: select_with_name");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = dao_tools._get_select_with_name_sql(this._get_tbl_info());
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

// cmd: select_with_key
Tbl_customer.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_customer: select_with_key");
    if(this.check_field(req, ctx, "id", '编号',       true, 1) == false) return false;

    var sql_fmt = dao_tools._get_select_with_key_sql(this._get_tbl_info());
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

// cmd: select
Tbl_customer.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_customer: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = dao_tools._get_select_sql(this._get_tbl_info());
	return this._dbop_select(sql_fmt, req, resp, ctx);
}



// custom cmd:

// cmd: list
Tbl_customer.prototype.cmd_list = function(req, resp, ctx){
    var info = this._get_tbl_info();
    console.log( "Tbl_customer: cmd_list");
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;

    req["cnt"] = info.m_page_cfg.size;
    req["start"] = ( req.page.cur - 1 ) * info.m_page_cfg.size;

    var sql_fmt =  dao_tools._get_list_sql(this._get_tbl_info());
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

// cmd: search
Tbl_customer.prototype.cmd_search = function(req, resp, ctx){
    var info = this._get_tbl_info();
    console.log( "Tbl_customer: cmd_search");
    if(req.search == null || req.search == "" ){
        return this.cmd_list(req,resp,ctx);
    }

    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "search",      true, 0,255) == false) return false;
    req["start"] = ( req.page.cur - 1 ) * info.m_page_cfg.size;
    req["cnt"] = info.m_page_cfg.size;
   
 	var sql_fmt = dao_tools._get_search_sql(this._get_tbl_info());
	return this._dbop_cmd_search(sql_fmt, req, resp, ctx);
}

// cmd: get_detail
Tbl_customer.prototype.cmd_get_detail = function(req, resp, ctx){
    console.log( "Tbl_customer: cmd_get_detail");
    if(this.check_field(req, ctx, "id", '编号',       true, 1) == false) return false;

    var sql_fmt = dao_tools._get_detail_sql(this._get_tbl_info());
    return this._dbop_cmd_get_detail(sql_fmt, req, resp, ctx);
}

// cmd: get_update_info
Tbl_customer.prototype.cmd_get_update_info = function(req, resp, ctx){
    console.log( "Tbl_customer: cmd_get_update_info");
    if(this.check_field(req, ctx, "id",'编号',        true, 1) == false) return false;

    var sql_fmt = dao_tools._get_update_info_sql(this._get_tbl_info());
    return this._dbop_cmd_get_update_info(sql_fmt, req, resp, ctx);
}

// cmd: get_create_info
Tbl_customer.prototype.cmd_get_create_info = function(req, resp, ctx){
    console.log( "Tbl_customer: cmd_get_create_info");

    var sql_fmt = dao_tools._get_create_info_sql(this._get_tbl_info());
    return this._dbop_cmd_get_create_info(sql_fmt, req, resp, ctx);
}



// dbop of custom cmd:

// dbop: list
Tbl_customer.prototype._dbop_cmd_list = function(sql_fmt, req, resp, ctx){

    var sql_fmt_content = sql_fmt + " limit {start}, {cnt};";
    console.log("sql: ", tools.format_object(sql_fmt_content, req));

    var dao_obj = this;
    var mysql_conn = require("../mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt_content, req),
        function (err, results, fields){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_sel_failed;
                resp.result_string = "Select failed: " + err;
                mysql_conn.end();
                dao_obj.render_resp(resp, ctx);
            }
            else{
                var sql_fmt_count = "select count(1) cnt from ({sql}) v_list_area";
                console.log("sql: ", tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}));
                mysql_conn.query(
                    tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}),
                    function (n_err, n_results, n_fields){
                        if(n_err){
                            console.log("sql: ", tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}));
                            console.log("err: ", n_err);
                            resp.result = ErrorCode.db_sel_failed;
                            resp.result_string = "Select failed: " + err;
                        }
                        else{
                            resp.result = 0;
                            resp.result_string = "OK";
                            resp.data = dao_tools._get_list_data(dao_obj._get_tbl_info(), results, req.page.cur, n_results[0].cnt);
                        }
                        mysql_conn.end();
                        dao_obj.render_resp(resp, ctx);
                    });
            }
        }
    );
    return  true;
}

// dbop: search
Tbl_customer.prototype._dbop_cmd_search = function(sql_fmt, req, resp, ctx){

    var sql_fmt_content = sql_fmt + " limit {start}, {cnt};";

    var dao_obj = this;
    console.log("sql: ", tools.format_object(sql_fmt_content, req));
    var mysql_conn = require("../mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt_content, req),
        function (err, results, fields){
            if(err) {
                console.log("err: ", err);
                resp.result = ErrorCode.db_sel_failed;
                resp.result_string = "Select failed: " + err;
                mysql_conn.end();
                dao_obj.render_resp(resp, ctx);
            }
            else{
                var sql_fmt_count = "select count(1) cnt from ({sql}) v_list_area";
                console.log("sql: ", tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}));
                mysql_conn.query(
                    tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}),
                    function (n_err, n_results, n_fields){
                        if(n_err){
                            console.log("sql: ", tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}));
                            console.log("err: ", n_err);
                            resp.result = ErrorCode.db_sel_failed;
                            resp.result_string = "Select failed: " + err;
                        }
                        else{
                            resp.result = 0;
                            resp.result_string = "OK";
                            resp.data = dao_tools._get_search_data(dao_obj._get_tbl_info(), results, req.page.cur, n_results[0].cnt);
                        }
                        mysql_conn.end();
                        dao_obj.render_resp(resp, ctx);
                    });
            }
        }
    );
    return  true;
}

// dbop: get_detail
Tbl_customer.prototype._dbop_cmd_get_detail = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    console.log("sql: ", tools.format_object(sql_fmt, req));
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
                resp.data = dao_tools._get_detail(dao_obj._get_tbl_info(), results[0]);
           }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

// dbop: get_update_info
Tbl_customer.prototype._dbop_cmd_get_update_info = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    console.log("sql: ", tools.format_object(sql_fmt, req));
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
                resp.data = dao_tools._get_update_info(dao_obj._get_tbl_info(), results[0]);
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

// dbop: get_create_info
Tbl_customer.prototype._dbop_cmd_get_create_info = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    /*console.log("sql: ", tools.format_object(sql_fmt, req));
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
                resp.data = dao_tools._get_create_info(dao_obj._get_tbl_info());
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );*/
    resp.result = 0;
    resp.result_string = "OK";
    resp.data = dao_tools._get_create_info(dao_obj._get_tbl_info());
    dao_obj.render_resp(resp, ctx);
    return  true;
}



// 
var cur = new Tbl_customer;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
