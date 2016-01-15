var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_user(){
    Dao.call(this);

    Tbl_user.tbl_name = 'user';
    Tbl_user.title = 'User';

    Tbl_user.info = {
        title: Tbl_user.title,
        tbl_name: 'tbl_'+Tbl_user.title.toLowerCase(),
        m_page_cfg : { size : 6, },
        struct : {
	        id: { key: 'id', key_text: '编号', key_type: 'label', value_def: null, value_type: 'number', is_col:1, is_view:1, },
	        epm_no: { key: 'emp_no',  key_text: '雇员号', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
	        real_nm: { key: 'real_nm',  key_text: '真实姓名', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
	        gender: { key: 'gender',  key_text: '性别', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
	        email: { key: 'email',  key_text: '邮件地址', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1,  },
	        mobile: { key: 'mobile',  key_text: '手机', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1,  },
	        fix_phone: { key: 'fix_phone',  key_text: '固话', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1,  },
	        id_card_no: { key: 'id_card_no',  key_text: '身份证', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1,  },
	        enter_date: { key: 'enter_date',  key_text: '入司日期', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1,  },
	        left_date: { key: 'left_date',  key_text: '离司日期', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1,  },
	        user_type: { key: 'user_type',  key_text: '用户类型', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1,  },
	        sign_id: { key: 'sign_id',  key_text: '登录id', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1,  },
	        nick_nm: { key: 'nick_nm',  key_text: '昵称', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1,  is_view:1, is_last_view_col:1, },
	        password: { key: 'password',  key_text: '登录密码', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, },
	        crt_ts: { key: 'crt_ts',  key_text: '创建时间', key_type: 'label', value_def: '', value_type: 'text', is_col:1, },
	        upd_ts: { key: 'upd_ts',  key_text: '修改时间', key_type: 'label', value_def: '', value_type: 'text', is_col:1, },
	        is_del: { key: 'is_del',  key_text: '已删除?', key_type: 'label', value_def: '', value_type: 'text', is_col:1, },
	        upd: { key: 'update',  key_text: '更新?', key_type: 'label', value_def: '', value_type: 'text', is_view:1, },
	        del: { key: 'delete',  key_text: '删除?', key_type: 'label', value_def: '', value_type: 'text', is_view:1, },
        },
        titles : {
            list : Tbl_user.title,
            search: Tbl_user.title,
            detail: 'Detail',
            update: 'Update',
            create: 'Create'
        },
        url : {
            list :   '#/'+Tbl_user.tbl_name+'_list',
            create : '#/'+Tbl_user.tbl_name+'_create',
            update : '#/'+Tbl_user.tbl_name+'_update',
            detail : '#/'+Tbl_user.tbl_name+'_detail',
        },
    };

    this._tab["cmd_list"]    = this.cmd_list;
    this._tab["cmd_search"]    = this.cmd_search;
    this._tab["cmd_get_detail"]    = this.cmd_get_detail;
    this._tab["cmd_get_update_info"]    = this.cmd_get_update_info;
    this._tab["cmd_get_create_info"]    = this.cmd_get_create_info;
    
    this._tab["signup"] = this.signup;
    this._tab["signin"] = this.signin;
}
inherits(Tbl_user, Dao);

var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");
var dao_tools = require("./dao_tools");

// get tbl info
Tbl_user.prototype._get_tbl_info = function(){
    return Tbl_user.info;
}






// base cmd:

// cmd: add
Tbl_user.prototype.add = function(req, resp, ctx){
    console.log( "Tbl_user: add");
    //if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = dao_tools._get_add_sql(this._get_tbl_info());
    return this._dbop_insert(sql_fmt, req, resp, ctx);
}

// cmd: is_exist
Tbl_user.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_user: is_exist");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = dao_tools._get_is_exist_sql(this._get_tbl_info());
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}

// cmd: update
Tbl_user.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_user: update");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_update_sql(this._get_tbl_info());
    return this._dbop_update(sql_fmt, req, resp, ctx);
}

// check req array
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
        if(this.check_field(arr_data[i], ctx, "name",       true, 0,64) == false) return false;
        //if(this.check_field(arr_data[i], ctx, "parent_id",  false, 1) == false) return false;
    }
    return true;
}

// cmd: add_multi_rows
Tbl_user.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "Tbl_user: add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }

    var sql_fmt = dao_tools._get_add_sql(this._get_tbl_info());
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

// cmd: remove
Tbl_user.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_user: remove");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;
    
    var sql_fmt = dao_tools._get_remove_sql(this._get_tbl_info());
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

// cmd: recover
Tbl_user.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_user: recover");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_recover_sql(this._get_tbl_info());
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

// cmd: select_with_name
Tbl_user.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_user: select_with_name");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = dao_tools._get_select_with_name_sql(this._get_tbl_info());
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

// cmd: select_with_key
Tbl_user.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_user: select_with_key");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_select_with_key_sql(this._get_tbl_info());
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

// cmd: select
Tbl_user.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_user: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = dao_tools._get_select_sql(this._get_tbl_info());
	return this._dbop_select(sql_fmt, req, resp, ctx);
}



// custom cmd:

// cmd: list
Tbl_user.prototype.cmd_list = function(req, resp, ctx){
    var info = this._get_tbl_info();
    console.log( "Tbl_user: cmd_list");
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;

    req["cnt"] = info.m_page_cfg.size;
    req["start"] = ( req.page.cur - 1 ) * info.m_page_cfg.size;

    var sql_fmt =  dao_tools._get_list_sql(this._get_tbl_info());
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

// cmd: search
Tbl_user.prototype.cmd_search = function(req, resp, ctx){
    var info = this._get_tbl_info();
    console.log( "Tbl_user: cmd_search");
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
Tbl_user.prototype.cmd_get_detail = function(req, resp, ctx){
    console.log( "Tbl_user: cmd_get_detail");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_detail_sql(this._get_tbl_info());
    return this._dbop_cmd_get_detail(sql_fmt, req, resp, ctx);
}

// cmd: get_update_info
Tbl_user.prototype.cmd_get_update_info = function(req, resp, ctx){
    console.log( "Tbl_user: cmd_get_update_info");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = dao_tools._get_update_info_sql(this._get_tbl_info());
    return this._dbop_cmd_get_update_info(sql_fmt, req, resp, ctx);
}

// cmd: get_create_info
Tbl_user.prototype.cmd_get_create_info = function(req, resp, ctx){
    console.log( "Tbl_user: cmd_get_create_info");

    var sql_fmt = dao_tools._get_create_info_sql(this._get_tbl_info());
    return this._dbop_cmd_get_create_info(sql_fmt, req, resp, ctx);
}



// dbop of custom cmd:

// dbop: list
Tbl_user.prototype._dbop_cmd_list = function(sql_fmt, req, resp, ctx){

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
Tbl_user.prototype._dbop_cmd_search = function(sql_fmt, req, resp, ctx){

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
Tbl_user.prototype._dbop_cmd_get_detail = function(sql_fmt, req, resp, ctx){
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
Tbl_user.prototype._dbop_cmd_get_update_info = function(sql_fmt, req, resp, ctx){
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
Tbl_user.prototype._dbop_cmd_get_create_info = function(sql_fmt, req, resp, ctx){
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



// user cmd:

// cmd: signin
Tbl_user.prototype.signin = function(req, resp, ctx){
    console.log( "Tbl_user: signin");
    if(this.check_field(req, ctx, "sign_id",      true, 4,64) == false) return false;
    if(this.check_field(req, ctx, "password",     true, 6,128) == false) return false;

    var sql_fmt = "select * from tbl_user where sign_id = '{sign_id}' and password = '{password}' and is_del = 0";
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

// cmd: signup
Tbl_user.prototype.signup = function(req, resp, ctx){
    console.log( "Tbl_user: signup");
    if(this.check_field(req, ctx, "sign_id",      true, 4,64) == false) return false;
    if(this.check_field(req, ctx, "password",     true, 6,128) == false) return false;

    var sql_fmt_is_exist = "select sign_id from tbl_user where sign_id = '{sign_id}' and is_del = 0"
    var sql_fmt = "insert into tbl_user set emp_no = '{emp_no}', real_nm = '{real_nm}', gender = '{gender}', email = '{email}', mobile = '{mobile}', fix_phone = '{fix_phone}', id_card_no = '{id_card_no}', enter_date = '{enter_date}', left_date = '{left_date}', user_type = '{user_type}', sign_id = '{sign_id}', nick_nm = '{nick_nm}', password = '{password}', remark = '{remark}', crt_ts = now(), is_del = 0;"
    return this._dbop_insert_unique(sql_fmt_is_exist, sql_fmt, req, resp, ctx);
}


// insert unique
Tbl_user.prototype._dbop_insert_unique= function(sql_fmt_is_exist, sql_fmt, req, resp, ctx){
    var dao_obj = this;
    var mysql_conn = require("../mysql_conn").create_short();
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



// 
var cur = new Tbl_user;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
