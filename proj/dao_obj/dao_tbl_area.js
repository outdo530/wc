var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_area(){
    Dao.call(this);

    // title
    Tbl_area.title = 'Area';

    // dao table name
    Tbl_area.tbl_name = 'tbl_'+Tbl_area.title.toLowerCase();

    // view struct
    Tbl_area.struct = {
        id: { key: 'id', key_text: '编号', key_type: 'label', value_def: null, value_type: 'number', is_col:1, is_view:1, },
        first_name: { key: 'first_name',  key_text: '名', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
        last_name: { key: 'last_name',  key_text: '姓', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
        user_name: { key: 'user_name',  key_text: '用户名', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1,  is_view:1, is_last_view_col:1},
        remark: { key: 'remark',  key_text: '备注', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, },
        crt_ts: { key: 'crt_ts',  key_text: '创建时间', key_type: 'label', value_def: '', value_type: 'text', is_col:1, },
        upd_ts: { key: 'upd_ts',  key_text: '修改时间', key_type: 'label', value_def: '', value_type: 'text', is_col:1, },
        is_del: { key: 'is_del',  key_text: '已删除?', key_type: 'label', value_def: '', value_type: 'text', is_col:1, },
        upd: { key: 'update',  key_text: '更新?', key_type: 'label', value_def: '', value_type: 'text', is_view:1, },
        del: { key: 'delete',  key_text: '删除?', key_type: 'label', value_def: '', value_type: 'text', is_view:1, },
    };

    //page size cfg for all app
    Tbl_area.m_page_cfg = { size : 6, };

    // titles
    Tbl_area.titles = {
        list : Tbl_area.title,
        search: Tbl_area.title,
        detail: 'Detail',
        update: 'Update',
        create: 'Create'
    };

    // url
    Tbl_area.url = {
        list :   '#/'+Tbl_area.title.toLowerCase()+'_list',
        create : '#/'+Tbl_area.title.toLowerCase()+'_create',
        update : '#/'+Tbl_area.title.toLowerCase()+'_update',
        detail : '#/'+Tbl_area.title.toLowerCase()+'_detail',
    };

    this._tab["cmd_list"]    = this.cmd_list;
    this._tab["cmd_search"]    = this.cmd_search;
    this._tab["cmd_get_detail"]    = this.cmd_get_detail;
    this._tab["cmd_get_update_info"]    = this.cmd_get_update_info;
    this._tab["cmd_get_create_info"]    = this.cmd_get_create_info;
}
inherits(Tbl_area, Dao);

var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");



// get sql:

// sql: get_set_sql
Tbl_area.prototype._get_set_sql = function(){
    var sql_fmt = 'set ';
    for(var elem in Tbl_area.struct){
        if(Tbl_area.struct[elem].is_to_set == 1){
            sql_fmt += Tbl_area.struct[elem].key + ' = "{' + Tbl_area.struct[elem].key + '}", ';
        }
    }
    return sql_fmt;
}

// sql: get_add_sql
Tbl_area.prototype._get_add_sql = function(){
    var sql_fmt = 'insert into ' + Tbl_area.tbl_name + ' ' + this._get_set_sql();
    sql_fmt += Tbl_area.struct['crt_ts'].key + ' = now(), ';
    sql_fmt += Tbl_area.struct['is_del'].key + ' = 0 ';
    return sql_fmt;
}

// sql: get_update_sql
Tbl_area.prototype._get_update_sql = function(){
    var sql_fmt = 'update ' + Tbl_area.tbl_name + ' ' + this._get_set_sql();
    sql_fmt += Tbl_area.struct['upd_ts'].key + ' = now() ';
    sql_fmt += 'where ' + Tbl_area.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + Tbl_area.struct['id'].key + ' = {id} ';
    return sql_fmt;
}

// sql: get_remove_sql
Tbl_area.prototype._get_remove_sql = function(){
    var sql_fmt = 'update ' + Tbl_area.tbl_name + ' set ';
    sql_fmt += Tbl_area.struct['is_del'].key + ' = 1 ';
    sql_fmt += 'where ' +Tbl_area.struct['id'].key + ' = {id} ';
    return sql_fmt;
}

// sql: get_recover_sql
Tbl_area.prototype._get_recover_sql = function(){
    var sql_fmt = 'update ' + Tbl_area.tbl_name + ' set ';
    sql_fmt += Tbl_area.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'where ' +Tbl_area.struct['id'].key + ' = {id} ';
    return sql_fmt;
}

// sql: get_select_sql
Tbl_area.prototype._get_select_sql = function(){
    var sql_fmt = 'select * from ' + Tbl_area.tbl_name + ' where ';
    sql_fmt += Tbl_area.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'limit {start}, {cnt} ';
    return sql_fmt;
}

// sql: get_select_with_name_sql
Tbl_area.prototype._get_select_with_name_sql = function(){
    var sql_fmt = 'select * from ' + Tbl_area.tbl_name + ' where ';
    sql_fmt += Tbl_area.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + ( Tbl_area.struct['name'] == null  ? 'name' : Tbl_area.struct['name'].key ) + ' = {name} ';
    return sql_fmt;
}

// sql: get_select_with_key_sql
Tbl_area.prototype._get_select_with_key_sql = function(){
    var sql_fmt = 'select * from ' + Tbl_area.tbl_name + ' where ';
    sql_fmt += Tbl_area.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + Tbl_area.struct['id'].key  + ' = {id} ';
    return sql_fmt;
}

// sql: get_is_exist_sql
Tbl_area.prototype._get_is_exist_sql = function(){
    var sql_fmt = 'select ' + Tbl_area.struct['id'].key + ' from ' + Tbl_area.tbl_name + ' where ';
    sql_fmt += Tbl_area.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + ( Tbl_area.struct['name'] == null  ? 'name' : Tbl_area.struct['name'].key )  + ' = {name} ';
    return sql_fmt;
}


// get view select sql 
Tbl_area.prototype._get_view_select_sql = function(){
    var sql_fmt = 'select ';
    for(var elem in Tbl_area.struct){
        if(Tbl_area.struct[elem].is_view == 1 && Tbl_area.struct[elem].is_col == 1){
            sql_fmt += Tbl_area.struct[elem].key;
            sql_fmt += Tbl_area.struct[elem].is_last_view_col == 1 ? ' ' : ', ';
        }
    }
    sql_fmt += 'from '+ Tbl_area.tbl_name + ' ';
    sql_fmt += 'where ' +Tbl_area.struct['is_del'].key + ' = 0 ';
    return sql_fmt;
}

// sql: get_list_sql 
Tbl_area.prototype._get_list_sql = function(){
    return this._get_view_select_sql();
}

// sql: get_search_sql 
Tbl_area.prototype._get_search_sql = function(){
    var sql_fmt = 'and ( ';
    for(var elem in Tbl_area.struct){
        if(Tbl_area.struct[elem].is_view == 1 && Tbl_area.struct[elem].is_col == 1 ){
            sql_fmt += Tbl_area.struct[elem].key + ' like "%{search}%" ';
            sql_fmt += Tbl_area.struct[elem].is_last_view_col == 1 ? ') ' : 'or ';
       }
    }
    return this._get_view_select_sql() + sql_fmt;
}

// sql: get_detail_sql 
Tbl_area.prototype._get_detail_sql = function(){
    return this._get_view_select_sql() + 'and ' + Tbl_area.struct['id'].key + '= "{id}" ';
}

// sql: get_update_info_sql 
Tbl_area.prototype._get_update_info_sql = function(){
    return this._get_view_select_sql() + 'and ' + Tbl_area.struct['id'].key + '= "{id}" ';
}

// sql: get_create_info_sql 
Tbl_area.prototype._get_create_info_sql = function(){
    return this._get_view_select_sql() + 'limit 0, 1 ';
}


// get custom data:

// data: get_list_title
Tbl_area.prototype._get_list_title = function(){
    var list_title = [];
    var i=0;
    for(var elem in Tbl_area.struct){
        if(Tbl_area.struct[elem].is_view == 1){
            list_title[i++] = Tbl_area.struct[elem].key_text;
        }
    }
    return list_title;
}

// data: get_data
Tbl_area.prototype._get_data = function(res){
    var data = [];
    var k=0;
    var i=0;
    for(var elem in Tbl_area.struct){
        if(Tbl_area.struct[elem].is_view==1){
            if(k==0){
               data[i] = [];
            }
            data[i][k++] = { key: Tbl_area.struct[elem].key, type: Tbl_area.struct[elem].key_type };
            data[i][k] = {
                key: ( Tbl_area.struct[elem].value_type == 'number'
                             ? (res == null ? null : res[Tbl_area.struct[elem].key])
                             : (res == null || Tbl_area.struct[elem].is_col!=1 ? '' : res[Tbl_area.struct[elem].key]) ),
                type: Tbl_area.struct[elem].value_type,
            };
            if(Tbl_area.struct[elem].value_type == 'number'){
                data[i][k]['min'] = 0;
                data[i][k]['max'] = 100000000;
            }
            if((k%2)==1){
                data[i][k]['col_nm'] = Tbl_area.struct[elem].key;
            }
            k ++;
            if( (k % 4) == 0 ){
                k = 0;
                i ++;
            }
        }
    }

    return data;
}

// data: get_detail_info
Tbl_area.prototype._get_detail = function(res){
    var data = {};
    data[Tbl_area.struct['id'].key] = res[Tbl_area.struct['id'].key];
    data['title'] = Tbl_area.titles.detail;
    data['content'] = this._get_data(res);
    data['parent_url'] = Tbl_area.url.list;
    return data;
}

// data: get_update_info
Tbl_area.prototype._get_update_info = function(res){
    var data = {};
    data[Tbl_area.struct['id'].key] = res[Tbl_area.struct['id'].key];
    data['title'] = Tbl_area.titles.update;
    data['content'] = this._get_data(res);
    data['parent_url'] = Tbl_area.url.list;
    return data;
}

// data: get_create_info
Tbl_area.prototype._get_create_info = function(){
    var data = {};
    data[Tbl_area.struct['id'].key] = null;
    data['title'] = Tbl_area.titles.create;
    data['content'] = this._get_data(null);
    data['parent_url'] = Tbl_area.url.list;
    return data;
}



// base cmd:

// cmd: add
Tbl_area.prototype.add = function(req, resp, ctx){
    console.log( "Tbl_area: add");
    //if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = this._get_add_sql();
    return this._dbop_insert(sql_fmt, req, resp, ctx);
}

// cmd: is_exist
Tbl_area.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_area: is_exist");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = this._get_is_exist_sql();
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}

// cmd: update
Tbl_area.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_area: update");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = this._get_update_sql();
    return this._dbop_update(sql_fmt, req, resp, ctx);
}

// check req array
Tbl_area.prototype._check_req_data = function (arr_data, ctx){
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
Tbl_area.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "Tbl_area: add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }

    var sql_fmt = this._get_add_sql();
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

// cmd: remove
Tbl_area.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_area: remove");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;
    
    var sql_fmt = this._get_remove_sql();
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

// cmd: recover
Tbl_area.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_area: recover");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = this._get_recover_sql();
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

// cmd: select_with_name
Tbl_area.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_area: select_with_name");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = this._get_select_with_name_sql();
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

// cmd: select_with_key
Tbl_area.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_area: select_with_key");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = this._get_select_with_key_sql();
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

// cmd: select
Tbl_area.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_area: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = this._get_select_sql();
	return this._dbop_select(sql_fmt, req, resp, ctx);
}



// custom cmd:

// cmd: list
Tbl_area.prototype.cmd_list = function(req, resp, ctx){
    console.log( "Tbl_area: cmd_list");
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;

    req["cnt"] = Tbl_area.m_page_cfg.size;
    req["start"] = ( req.page.cur - 1 ) * Tbl_area.m_page_cfg.size;

    var sql_fmt =  this._get_list_sql();
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

// cmd: search
Tbl_area.prototype.cmd_search = function(req, resp, ctx){
    console.log( "Tbl_area: cmd_search");
    if(req.search == null || req.search == "" ){
        return this.cmd_list(req,resp,ctx);
    }

    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "search",      true, 0,255) == false) return false;
    req["start"] = ( req.page.cur - 1 ) * Tbl_area.m_page_cfg.size;
    req["cnt"] = Tbl_area.m_page_cfg.size;
   
 	var sql_fmt = this._get_search_sql();
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

// cmd: get_detail
Tbl_area.prototype.cmd_get_detail = function(req, resp, ctx){
    console.log( "Tbl_area: cmd_get_detail");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = this._get_detail_sql();
    return this._dbop_cmd_get_detail(sql_fmt, req, resp, ctx);
}

// cmd: get_update_info
Tbl_area.prototype.cmd_get_update_info = function(req, resp, ctx){
    console.log( "Tbl_area: cmd_get_update_info");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = this._get_update_info_sql();
    return this._dbop_cmd_get_update_info(sql_fmt, req, resp, ctx);
}

// cmd: get_create_info
Tbl_area.prototype.cmd_get_create_info = function(req, resp, ctx){
    console.log( "Tbl_area: cmd_get_create_info");

    var sql_fmt = this._get_create_info_sql();
    return this._dbop_cmd_get_create_info(sql_fmt, req, resp, ctx);
}



// dbop of custom cmd:

// dbop: list / search
Tbl_area.prototype._dbop_cmd_list = function(sql_fmt, req, resp, ctx){

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
                            resp.data = {
                                title :  Tbl_area.titles.list,
                                list_title : dao_obj._get_list_title(), 
                                content : results,
                                page : {
                                    cur: req.page.cur,
                                    total : parseInt( n_results[0].cnt / Tbl_area.m_page_cfg.size ) + ( n_results[0].cnt % Tbl_area.m_page_cfg.size != 0 ? 1 : 0),                                   size : Tbl_area.m_page_cfg.size,
                                },
                                url : Tbl_area.url,
                            };
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
Tbl_area.prototype._dbop_cmd_get_detail = function(sql_fmt, req, resp, ctx){
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
                resp.data = dao_obj._get_detail(results[0]);
           }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

// dbop: get_update_info
Tbl_area.prototype._dbop_cmd_get_update_info = function(sql_fmt, req, resp, ctx){
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
                resp.data = dao_obj._get_update_info(results[0]);
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}

// dbop: get_create_info
Tbl_area.prototype._dbop_cmd_get_create_info = function(sql_fmt, req, resp, ctx){
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
                resp.data = dao_obj._get_create_info();
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}



// 
var cur = new Tbl_area;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
