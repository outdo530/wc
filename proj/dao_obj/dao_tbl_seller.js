var inherits = require("util").inherits;
var tbl_const = require("./tbl_const");
var Dao = require("../dao");
function Tbl_seller(){
    Dao.call(this);

    Tbl_seller.tbl_name = 'seller';
    Tbl_seller.title = 'Seller';
    Tbl_seller.tbl_name2 = 'customer';


    
    Tbl_seller.info = {
        title: Tbl_seller.title,
        tbl_name: 'tbl_'+Tbl_seller.tbl_name,
        m_page_cfg : { size : 6, },
        tbl_name: 'tbl_'+Tbl_seller.tbl_name,
        tbl_alias: ' a',
        tbl_name2: 'tbl_'+Tbl_seller.tbl_name2,
        tbl_alias2: ' b',
        join_condition: 'a.cust_id = b.id ',

        struct : {
	        id: { tbl: 'a.', key: 'id', key_text: '编号', key_type: 'label', value_def: null, value_type: 'number',
                is_col:1, is_view:1, },
	        property_desc: { tbl: 'a.', key: 'property_desc',  key_text: '船舶资产描述', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_to_set:1, is_detail:1, op: tbl_const.op_type_text(), },
	        bad_property_desc: { tbl: 'a.', key: 'bad_property_desc',  key_text: '船舶不良资产描述', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_to_set:1, is_detail:1, op: tbl_const.op_type_text(), },
	        class_1: { tbl: 'a.', key: 'class_1',  key_text: '姓', key_type: 'Class1', value_def: '', value_type: 'text',
                is_col:1, is_to_set:1, is_detail:1, is_list:1, op: tbl_const.op_type_text(),},
	        class_2: { tbl: 'a.', key: 'class_2',  key_text: '姓2', key_type: 'Class2', value_def: '', value_type: 'text',
                is_col:1, is_to_set:1, is_detail:1, is_list:1, op: tbl_const.op_type_text(),},
	        class_3: { tbl: 'a.', key: 'class_3',  key_text: '用户名', key_type: 'Class3', value_def: '', value_type: 'text',
                is_col:1, is_to_set:1,  is_detail:1, is_list:1, op: tbl_const.op_type_text(),},
	        remark: { tbl:'a.', key: 'remark',  key_text: '备注', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_to_set:1,  },
	        crt_ts: { tbl:'a.', key: 'crt_ts',  key_text: '创建时间', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, },
	        upd_ts: { tbl:'a.', key: 'upd_ts',  key_text: '修改时间', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, },
	        is_del: { tbl:'a.', key: 'is_del',  key_text: '已删除?', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, },

 	        cust_id: { tbl:'a.', key: 'cust_id',  key_text: '客户id', key_type: 'label', value_def: '', value_type: 'number',
                is_col:1, is_to_set:1, is_detail:1, is_list:1, op: tbl_const.op_type_dialog('/dao_tbl_'+Tbl_seller.tbl_name2) },
	        id2: { tbl:'b.', key: 'id', key_text: '编号', key_type: 'label', value_def: null, value_type: 'number',
                is_col:1,      },
	        nm: { tbl:'b.', key: 'nm',  key_text: '名称', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_list:1, is_detail:1, },
	        contact_nm: { tbl:'b.', key: 'contact_nm',  key_text: '联系人', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_list:1, is_detail:1, },
	        fix_phone: { tbl:'b.', key: 'fix_phone',  key_text: '固话', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1,     },
	        mobile: { tbl:'b.', key: 'mobile',  key_text: '手机', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1, is_list:1, is_detail:1   },
	        addr: { tbl:'b.', key: 'addr',  key_text: '地址', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1,        },
	        is_buyer: { tbl:'b.', key: 'is_buyer',  key_text: '是否买家', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1,   },
	        is_seller: { tbl:'b.', key: 'is_seller',  key_text: '是否卖家', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1,  },
	        is_lp: { tbl:'b.', key: 'is_lp',  key_text: '是否LP', key_type: 'label', value_def: '', value_type: 'text',
                is_col:1,  },
	        remark2: { tbl:'b.', key: 'remark',  key_text: '备注', key_type: 'label', value_def: '', value_type: 'text',
                is_col: 1,  },
	        crt_ts2: { tbl:'b.', key: 'crt_ts',  key_text: '创建时间', key_type: 'label', value_def: '', value_type: 'text',
                is_col: 1,                                },
	        upd_ts2: { tbl:'b.', key: 'upd_ts',  key_text: '修改时间', key_type: 'label', value_def: '', value_type: 'text',
                is_col: 1,                                },
	        is_del2: { tbl:'b.', key: 'is_del',  key_text: '已删除?', key_type: 'label', value_def: '', value_type: 'text',
                is_col: 1,                                 },
	        upd: { key: 'update',  key_text: '更新?', key_type: 'label', value_def: '', value_type: 'text', 
                is_view:1 },
	        del: { key: 'delete',  key_text: '删除?', key_type: 'label', value_def: '', value_type: 'text', 
                is_view:1 },
        },

        titles : {
            list : Tbl_seller.title,
            search: Tbl_seller.title,
            detail: 'Detail',
            update: 'Update',
            create: 'Create'
        },
        url : {
            list :   '#/'+Tbl_seller.tbl_name+'_list',
            create : '#/'+Tbl_seller.tbl_name+'_create',
            update : '#/'+Tbl_seller.tbl_name+'_update',
            detail : '#/'+Tbl_seller.tbl_name+'_detail',
        },
    };

    this._tab["cmd_list"]    = this.cmd_list;
    this._tab["cmd_search"]    = this.cmd_search;
    this._tab["cmd_get_detail"]    = this.cmd_get_detail;
    this._tab["cmd_get_update_info"]    = this.cmd_get_update_info;
    this._tab["cmd_get_create_info"]    = this.cmd_get_create_info;
}
inherits(Tbl_seller, Dao);

var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");
var dao_tools = require("./dao_tools");

// get tbl info
Tbl_seller.prototype._get_tbl_info = function(){
    return Tbl_seller.info;
}



// base cmd:

// cmd: add
Tbl_seller.prototype.add = function(req, resp, ctx){
    console.log( "Tbl_seller: add");
    //if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = dao_tools._get_add_sql(this._get_tbl_info());
    return this._dbop_insert(sql_fmt, req, resp, ctx);
}

// cmd: is_exist
Tbl_seller.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_seller: is_exist");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = dao_tools._get_is_exist_sql(this._get_tbl_info());
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}

// cmd: update
Tbl_seller.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_seller: update");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_update_sql(this._get_tbl_info());
    return this._dbop_update(sql_fmt, req, resp, ctx);
}

// check req array
Tbl_seller.prototype._check_req_data = function (arr_data, ctx){
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
Tbl_seller.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "Tbl_seller: add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }

    var sql_fmt = dao_tools._get_add_sql(this._get_tbl_info());
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

// cmd: remove
Tbl_seller.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_seller: remove");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;
    
    var sql_fmt = dao_tools._get_remove_sql(this._get_tbl_info());
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

// cmd: recover
Tbl_seller.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_seller: recover");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_recover_sql(this._get_tbl_info());
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

// cmd: select_with_name
Tbl_seller.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_seller: select_with_name");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = dao_tools._get_select_with_name_sql(this._get_tbl_info());
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

// cmd: select_with_key
Tbl_seller.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_seller: select_with_key");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_select_with_key_sql(this._get_tbl_info());
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

// cmd: select
Tbl_seller.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_seller: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = dao_tools._get_select_sql(this._get_tbl_info());
	return this._dbop_select(sql_fmt, req, resp, ctx);
}



// custom cmd:

// cmd: list
Tbl_seller.prototype.cmd_list = function(req, resp, ctx){
    var info = this._get_tbl_info();
    console.log( "Tbl_seller: cmd_list");
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;

    req["cnt"] = info.m_page_cfg.size;
    req["start"] = ( req.page.cur - 1 ) * info.m_page_cfg.size;

    var sql_fmt =  dao_tools._get_list_sql(this._get_tbl_info());
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

// cmd: search
Tbl_seller.prototype.cmd_search = function(req, resp, ctx){
    var info = this._get_tbl_info();
    console.log( "Tbl_seller: cmd_search");
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
Tbl_seller.prototype.cmd_get_detail = function(req, resp, ctx){
    console.log( "Tbl_seller: cmd_get_detail");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_detail_sql(this._get_tbl_info());
    return this._dbop_cmd_get_detail(sql_fmt, req, resp, ctx);
}

// cmd: get_update_info
Tbl_seller.prototype.cmd_get_update_info = function(req, resp, ctx){
    console.log( "Tbl_seller: cmd_get_update_info");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_update_info_sql(this._get_tbl_info());
    return this._dbop_cmd_get_update_info(sql_fmt, req, resp, ctx);
}

// cmd: get_create_info
Tbl_seller.prototype.cmd_get_create_info = function(req, resp, ctx){
    console.log( "Tbl_seller: cmd_get_create_info");

    var sql_fmt = dao_tools._get_create_info_sql(this._get_tbl_info());
    return this._dbop_cmd_get_create_info(sql_fmt, req, resp, ctx);
}



// dbop of custom cmd:

// dbop: list
Tbl_seller.prototype._dbop_cmd_list = function(sql_fmt, req, resp, ctx){

    var sql_fmt_content = sql_fmt + " limit {start}, {cnt};";

    var dao_obj = this;
    var mysql_conn = require("../mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt_content, req),
        function (err, results, fields){
            if(err) {
                console.log("sql: ", tools.format_object(sql_fmt_content, req));
                console.log("err: ", err);
                resp.result = ErrorCode.db_sel_failed;
                resp.result_string = "Select failed: " + err;
                mysql_conn.end();
                dao_obj.render_resp(resp, ctx);
            }
            else{
                var sql_fmt_count = "select count(1) cnt from ({sql}) v_list_area";
                console.log(tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}));
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
                        console.log("result: ", results);
                        mysql_conn.end();
                        dao_obj.render_resp(resp, ctx);
                    });
            }
        }
    );
    return  true;
}

// dbop: search
Tbl_seller.prototype._dbop_cmd_search = function(sql_fmt, req, resp, ctx){

    var sql_fmt_content = sql_fmt + " limit {start}, {cnt};";

    var dao_obj = this;
    var mysql_conn = require("../mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt_content, req),
        function (err, results, fields){
            if(err) {
                console.log("sql: ", tools.format_object(sql_fmt_content, req));
                console.log("err: ", err);
                resp.result = ErrorCode.db_sel_failed;
                resp.result_string = "Select failed: " + err;
                mysql_conn.end();
                dao_obj.render_resp(resp, ctx);
            }
            else{
                var sql_fmt_count = "select count(1) cnt from ({sql}) v_list_area";
                console.log(tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}));
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
                        console.log("result: ", results);
                        mysql_conn.end();
                        dao_obj.render_resp(resp, ctx);
                    });
            }
        }
    );
    return  true;
}

// dbop: get_detail
Tbl_seller.prototype._dbop_cmd_get_detail = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("../mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function (err, results, fields){
            if(err) {
                console.log("sql: ", tools.format_object(sql_fmt, req));
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
Tbl_seller.prototype._dbop_cmd_get_update_info = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("../mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function (err, results, fields){
            if(err) {
                console.log("sql: ", tools.format_object(sql_fmt, req));
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
Tbl_seller.prototype._dbop_cmd_get_create_info = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("../mysql_conn").create_short();
    mysql_conn.query(
        tools.format_object(sql_fmt, req),
        function (err, results, fields){
            if(err) {
                console.log("sql: ", tools.format_object(sql_fmt, req));
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
    );
    return  true;
}



// 
var cur = new Tbl_seller;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
