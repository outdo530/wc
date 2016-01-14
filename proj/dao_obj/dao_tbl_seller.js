var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_seller(){
    Dao.call(this);

    // title
    Tbl_seller.title = 'Seller';

    // dao table name
    Tbl_seller.tbl_name = 'tbl_'+Tbl_seller.title.toLowerCase();

    // view struct
    Tbl_seller.struct = {
        id: { key: 'id', key_text: '编号', key_type: 'label', value_def: null, value_type: 'number', is_col:1, is_view:1, },
        cust_id: { key: 'cust_id',  key_text: '客户id', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
        property_desc: { key: 'property_desc',  key_text: '船舶资产描述', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
        bad_property_desc: { key: 'bad_property_desc',  key_text: '船舶不良资产描述', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
        class_1: { key: 'class_1',  key_text: '姓', key_type: 'Class1', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
        class_2: { key: 'class_2',  key_text: '姓', key_type: 'Class2', value_def: '', value_type: 'text', is_col:1, is_to_set:1, is_view:1, },
        class_3: { key: 'class_3',  key_text: '用户名', key_type: 'Class3', value_def: '', value_type: 'text', is_col:1, is_to_set:1,  is_view:1, is_last_view_col:1},
        remark: { key: 'remark',  key_text: '备注', key_type: 'label', value_def: '', value_type: 'text', is_col:1, is_to_set:1, },
        crt_ts: { key: 'crt_ts',  key_text: '创建时间', key_type: 'label', value_def: '', value_type: 'text', is_col:1, },
        upd_ts: { key: 'upd_ts',  key_text: '修改时间', key_type: 'label', value_def: '', value_type: 'text', is_col:1, },
        is_del: { key: 'is_del',  key_text: '已删除?', key_type: 'label', value_def: '', value_type: 'text', is_col:1, },
        upd: { key: 'update',  key_text: '更新?', key_type: 'label', value_def: '', value_type: 'text', is_view:1, },
        del: { key: 'delete',  key_text: '删除?', key_type: 'label', value_def: '', value_type: 'text', is_view:1, },
    };

    //page size cfg for all app
    Tbl_seller.m_page_cfg = { size : 6, };

    // titles
    Tbl_seller.titles = {
        list : Tbl_seller.title,
        search: Tbl_seller.title,
        detail: 'Detail',
        update: 'Update',
        create: 'Create'
    };

    // url
    Tbl_seller.url = {
        list :   '#/'+Tbl_seller.title.toLowerCase()+'_list',
        create : '#/'+Tbl_seller.title.toLowerCase()+'_create',
        update : '#/'+Tbl_seller.title.toLowerCase()+'_update',
        detail : '#/'+Tbl_seller.title.toLowerCase()+'_detail',
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



// get sql:

// sql: get_set_sql
Tbl_seller._get_set_sql = function(){
    var sql_fmt = 'set ';
    for(var elem in Tbl_seller.struct){
        if(Tbl_seller.struct[elem].is_to_set == 1){
            sql_fmt += Tbl_seller.struct[elem].key + ' = "{' + Tbl_seller.struct[elem].key + '}", ';
        }
    }
    return sql_fmt;
}

// sql: get_add_sql
Tbl_seller._get_add_sql = function(){
    var sql_fmt = 'insert into ' + Tbl_seller.tbl_name + ' ' + Tbl_seller._get_set_sql();
    sql_fmt += Tbl_seller.struct['crt_ts'].key + ' = now(), ';
    sql_fmt += Tbl_seller.struct['is_del'].key + ' = 0 ';
    return sql_fmt;
}

// sql: get_update_sql
Tbl_seller._get_update_sql = function(){
    var sql_fmt = 'update ' + Tbl_seller.tbl_name + ' ' + Tbl_seller._get_set_sql();
    sql_fmt += Tbl_seller.struct['upd_ts'].key + ' = now() ';
    sql_fmt += 'where ' + Tbl_seller.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + Tbl_seller.struct['id'].key + ' = {id} ';
    return sql_fmt;
}

// sql: get_remove_sql
Tbl_seller._get_remove_sql = function(){
    var sql_fmt = 'update ' + Tbl_seller.tbl_name + ' set ';
    sql_fmt += Tbl_seller.struct['is_del'].key + ' = 1 ';
    sql_fmt += 'where ' +Tbl_seller.struct['id'].key + ' = {id} ';
    return sql_fmt;
}

// sql: get_recover_sql
Tbl_seller._get_recover_sql = function(){
    var sql_fmt = 'update ' + Tbl_seller.tbl_name + ' set ';
    sql_fmt += Tbl_seller.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'where ' +Tbl_seller.struct['id'].key + ' = {id} ';
    return sql_fmt;
}

// sql: get_select_sql
Tbl_seller._get_select_sql = function(){
    var sql_fmt = 'select * from ' + Tbl_seller.tbl_name + ' where ';
    sql_fmt += Tbl_seller.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'limit {start}, {cnt} ';
    return sql_fmt;
}

// sql: get_select_with_name_sql
Tbl_seller._get_select_with_name_sql = function(){
    var sql_fmt = 'select * from ' + Tbl_seller.tbl_name + ' where ';
    sql_fmt += Tbl_seller.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + ( Tbl_seller.struct['name'] == null  ? 'name' : Tbl_seller.struct['name'].key ) + ' = {name} ';
    return sql_fmt;
}

// sql: get_select_with_key_sql
Tbl_seller._get_select_with_key_sql = function(){
    var sql_fmt = 'select * from ' + Tbl_seller.tbl_name + ' where ';
    sql_fmt += Tbl_seller.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + Tbl_seller.struct['id'].key  + ' = {id} ';
    return sql_fmt;
}

// sql: get_is_exist_sql
Tbl_seller._get_is_exist_sql = function(){
    var sql_fmt = 'select ' + Tbl_seller.struct['id'].key + ' from ' + Tbl_seller.tbl_name + ' where ';
    sql_fmt += Tbl_seller.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + ( Tbl_seller.struct['name'] == null  ? 'name' : Tbl_seller.struct['name'].key )  + ' = {name} ';
    return sql_fmt;
}


// get view select sql 
Tbl_seller._get_view_select_sql = function(){
    var sql_fmt = 'select ';
    for(var elem in Tbl_seller.struct){
        if(Tbl_seller.struct[elem].is_view == 1 && Tbl_seller.struct[elem].is_col == 1){
            sql_fmt += Tbl_seller.struct[elem].key;
            sql_fmt += Tbl_seller.struct[elem].is_last_view_col == 1 ? ' ' : ', ';
        }
    }
    sql_fmt += 'from '+ Tbl_seller.tbl_name + ' ';
    sql_fmt += 'where ' +Tbl_seller.struct['is_del'].key + ' = 0 ';
    return sql_fmt;
}

// sql: get_list_sql 
Tbl_seller._get_list_sql = function(){
    return Tbl_seller._get_view_select_sql();
}

// sql: get_search_sql 
Tbl_seller._get_search_sql = function(){
    var sql_fmt = 'and ( ';
    for(var elem in Tbl_seller.struct){
        if(Tbl_seller.struct[elem].is_view == 1 && Tbl_seller.struct[elem].is_col == 1 ){
            sql_fmt += Tbl_seller.struct[elem].key + ' like "%{search}%" ';
            sql_fmt += Tbl_seller.struct[elem].is_last_view_col == 1 ? ') ' : 'or ';
       }
    }
    return Tbl_seller._get_view_select_sql() + sql_fmt;
}

// sql: get_detail_sql 
Tbl_seller._get_detail_sql = function(){
    return Tbl_seller._get_view_select_sql() + 'and ' + Tbl_seller.struct['id'].key + '= "{id}" ';
}

// sql: get_update_info_sql 
Tbl_seller._get_update_info_sql = function(){
    return Tbl_seller._get_view_select_sql() + 'and ' + Tbl_seller.struct['id'].key + '= "{id}" ';
}

// sql: get_create_info_sql 
Tbl_seller._get_create_info_sql = function(){
    return Tbl_seller._get_view_select_sql() + 'limit 0, 1 ';
}


// get custom data:

// data: get_list_title
Tbl_seller._get_list_title = function(){
    var list_title = [];
    var i=0;
    for(var elem in Tbl_seller.struct){
        if(Tbl_seller.struct[elem].is_view == 1){
            list_title[i++] = Tbl_seller.struct[elem].key_text;
        }
    }
    return list_title;
}


// data: get_data
Tbl_seller._get_data = function(res){
    var s = '[ ';
    var k=0;
    for(var elem in Tbl_seller.struct){
        if(Tbl_seller.struct[elem].is_view==1){
            if(k==0){
               s += '[ ';
            }
            s += '{ key: "' + Tbl_seller.struct[elem].key_text + '", type: "' + Tbl_seller.struct[elem].key_type + '" }, ';
            s += '{ key: ' + ( Tbl_seller.struct[elem].value_type == 'number'
                             ? (res == null ? 'null' : res[Tbl_seller.struct[elem].key])
                             : (res == null || Tbl_seller.struct[elem].is_col!=1 ? '""' : ('"' + res[Tbl_seller.struct[elem].key]+ '"')) )
                + ', type: "' + Tbl_seller.struct[elem].value_type + '"';
            if(Tbl_seller.struct[elem].value_type == 'number'){
                s += ', min: 0, max: 100000000';
            }
            if((k%2)==0){
                s += ', col_nm: "' + Tbl_seller.struct[elem].key + '"';
            }
            s += ' },';

            k += 2;
            if( (k % 4) == 0 ){
                k = 0; 
                s += ' ],';
            }
        }
    }
    if(k==2)  s += ' ],';
    s += ' ]';

    return s;
}

// data: get_list_key
Tbl_seller._get_list_key = function(){
    var list_key = [];
    var i=0;
    for(var elem in Tbl_seller.struct){
        if(Tbl_seller.struct[elem].is_to_set == 1){
            list_key[i++] = Tbl_seller.struct[elem].key;
        }
    }
    return list_key;
}

// data: get_detail_info
Tbl_seller._get_detail = function(res){
    var s = '{ '
        + Tbl_seller.struct['id'].key + ': ' + res[Tbl_seller.struct['id'].key] + ', '
        + 'title: "' + Tbl_seller.titles.detail + '", '
        + 'content: ' + Tbl_seller._get_data(res) + ','
        + 'parent_url: "' + Tbl_seller.url.list + '" '
        + ' }';
    return eval('('+ s + ')');
}

// data: get_update_info
Tbl_seller._get_update_info = function(res){
    var s = '{ '
        + Tbl_seller.struct['id'].key + ': ' + res[Tbl_seller.struct['id'].key] + ', '
        + 'title: "' + Tbl_seller.titles.update + '", '
        + 'content: ' + Tbl_seller._get_data(res) + ','
        + 'parent_url: "' + Tbl_seller.url.list + '" '
        + ' }';
    return eval('('+ s + ')');
}

// data: get_create_info
Tbl_seller._get_create_info = function(){
    var s = '{ '
        + Tbl_seller.struct['id'].key + ': null, '
        + 'title: "' + Tbl_seller.titles.create + '", '
        + 'content: ' + Tbl_seller._get_data(null) + ','
        + 'parent_url: "' + Tbl_seller.url.list + '" '
        + ' }';
    return eval('('+ s + ')');
}



// base cmd:

// cmd: add
Tbl_seller.prototype.add = function(req, resp, ctx){
    console.log( "Tbl_seller: add");
    //if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = Tbl_seller._get_add_sql();
    return this._dbop_insert(sql_fmt, req, resp, ctx);
}

// cmd: is_exist
Tbl_seller.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_seller: is_exist");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = Tbl_seller._get_is_exist_sql();
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}

// cmd: update
Tbl_seller.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_seller: update");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt =Tbl_seller._get_update_sql();
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

    var sql_fmt = Tbl_seller._get_add_sql();
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

// cmd: remove
Tbl_seller.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_seller: remove");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;
    
    var sql_fmt = Tbl_seller._get_remove_sql();
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

// cmd: recover
Tbl_seller.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_seller: recover");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = Tbl_seller._get_recover_sql();
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

// cmd: select_with_name
Tbl_seller.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_seller: select_with_name");
    if(this.check_field(req, ctx, "name",       true, 0,255) == false) return false;

    var sql_fmt = Tbl_seller._get_select_with_name_sql();
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

// cmd: select_with_key
Tbl_seller.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_seller: select_with_key");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = Tbl_seller._get_select_with_key_sql();
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

// cmd: select
Tbl_seller.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_seller: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = Tbl_seller._get_select_sql();
	return this._dbop_select(sql_fmt, req, resp, ctx);
}



// custom cmd:

// cmd: list
Tbl_seller.prototype.cmd_list = function(req, resp, ctx){
    console.log( "Tbl_seller: cmd_list");
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;

    req["cnt"] = Tbl_seller.m_page_cfg.size;
    req["start"] = ( req.page.cur - 1 ) * Tbl_seller.m_page_cfg.size;

    var sql_fmt =  Tbl_seller._get_list_sql();
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

// cmd: search
Tbl_seller.prototype.cmd_search = function(req, resp, ctx){
    console.log( "Tbl_seller: cmd_search");
    if(req.search == null || req.search == "" ){
        return this.cmd_list(req,resp,ctx);
    }

    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "search",      true, 0,255) == false) return false;
    req["start"] = ( req.page.cur - 1 ) * Tbl_seller.m_page_cfg.size;
    req["cnt"] = Tbl_seller.m_page_cfg.size;
   
 	var sql_fmt = Tbl_seller._get_search_sql();
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

// cmd: get_detail
Tbl_seller.prototype.cmd_get_detail = function(req, resp, ctx){
    console.log( "Tbl_seller: cmd_get_detail");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = Tbl_seller._get_detail_sql();
    return this._dbop_cmd_get_detail(sql_fmt, req, resp, ctx);
}

// cmd: get_update_info
Tbl_seller.prototype.cmd_get_update_info = function(req, resp, ctx){
    console.log( "Tbl_seller: cmd_get_update_info");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = Tbl_seller._get_update_info_sql();
    return this._dbop_cmd_get_update_info(sql_fmt, req, resp, ctx);
}

// cmd: get_create_info
Tbl_seller.prototype.cmd_get_create_info = function(req, resp, ctx){
    console.log( "Tbl_seller: cmd_get_create_info");

    var sql_fmt = Tbl_seller._get_create_info_sql();
    return this._dbop_cmd_get_create_info(sql_fmt, req, resp, ctx);
}



// dbop of custom cmd:

// dbop: list / search
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
                            resp.data = {
                                title :  Tbl_seller.titles.list,
                                list_title : Tbl_seller._get_list_title(), 
                                list_key    : Tbl_seller._get_list_key(), 
                                content : results,
                                page : {
                                    cur: req.page.cur,
                                    total : parseInt( n_results[0].cnt / Tbl_seller.m_page_cfg.size ) + ( n_results[0].cnt % Tbl_seller.m_page_cfg.size != 0 ? 1 : 0),                                   size : Tbl_seller.m_page_cfg.size,
                                },
                                url : Tbl_seller.url,
                            };
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
                resp.data = Tbl_seller._get_detail(results[0]);
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
                resp.data = Tbl_seller._get_update_info(results[0]);
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
                resp.data = Tbl_seller._get_create_info();
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
