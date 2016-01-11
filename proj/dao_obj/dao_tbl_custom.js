var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_custom(){
    Dao.call(this);

    // dao table name
    Tbl_custom.tbl_name = 'tbl_custom';

    // title
    Tbl_custom.title = 'Custom';

    // view struct
    Tbl_custom.struct = [
        { key: 'id', key_text: '编号', key_type: 'label', value_def: null, value_type: 'number', is_col: 1},
        { key: 'nm',  key_text: '名称', key_type: 'label', value_def: '', value_type: 'text', is_col: 1},
        { key: 'contact_nm',  key_text: '联系人名称', key_type: 'label', value_def: '', value_type: 'text', is_col: 1},
        { key: 'fix_phone',  key_text: '固话', key_type: 'label', value_def: '', value_type: 'text', is_col: 1},
        { key: 'mobile',  key_text: '手机', key_type: 'label', value_def: '', value_type: 'text', is_col: 1},
        { key: 'addr',  key_text: '地址', key_type: 'label', value_def: '', value_type: 'text', is_col: 1},
        { key: 'type',  key_text: '类型', key_type: 'label', value_def: '', value_type: 'text', is_col: 1, is_last_col: 1},
        { key: 'update',  key_text: '更新?', key_type: 'label', value_def: '', value_type: 'text', is_col: 0},
        { key: 'delete',  key_text: '删除?', key_type: 'label', value_def: '', value_type: 'text', is_col: 0},
    ];

    //page size cfg for all app
    Tbl_custom.m_page_cfg = { size : 6, };

    // titles
    Tbl_custom.titles = {
        list : Tbl_custom.title,
        search: Tbl_custom.title,
        detail: Tbl_custom.title + ' Detail',
        update: Tbl_custom.title + ' Update',
        create: Tbl_custom.title + ' Create'
    };

    // url
    Tbl_custom.url = {
        list :   '/custom_list',
        create : '#/custom_create',
        update : '#/custom_update',
        detail : '#/custom_detail',
    };

    this._tab["cmd_list"]    = this.cmd_list;
    this._tab["cmd_search"]    = this.cmd_search;
    this._tab["cmd_get_detail"]    = this.cmd_get_detail;
    this._tab["cmd_get_update_info"]    = this.cmd_get_update_info;
    this._tab["cmd_get_create_info"]    = this.cmd_get_create_info;
}
inherits(Tbl_custom, Dao);

var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");

// get list title
Tbl_custom._get_list_title = function(){
    var list_title = [];
    for(var i=0; i<Tbl_custom.struct.length; i++){
        list_title[i] = Tbl_custom.struct[i].key_text;
    }
    return list_title;
}

// get select sql 
Tbl_custom._get_select_sql = function(){
    var sql_fmt = "select ";
    for(var i=0; i<Tbl_custom.struct.length; i++){
        if(Tbl_custom.struct[i].is_col == 1){
            sql_fmt += Tbl_custom.struct[i].key;
            sql_fmt += Tbl_custom.struct[i].is_last_col == 1 ? ' ' : ', ';
        }
    }
    sql_fmt += 'from ';
    sql_fmt += Tbl_custom.tbl_name;
    sql_fmt += ' where is_del = 0';
    return sql_fmt;
}

// get detail info
Tbl_custom._get_detail = function(res){
    var s = '{ "' + Tbl_custom.struct[0].key + '": null, "title": "' + Tbl_custom.titles.detail + '", "content": [ ' ;
    var k=0;
    for(var i=0; i<Tbl_custom.struct.length; i++){
        if(k==0){
           s += '[ ';
        }
        s += '{ "key": "' + Tbl_custom.struct[i].key + '", "type": "' + Tbl_custom.struct[i].key_type + '" }, ';
        s += '{ "key": ' + ( Tbl_custom.struct[i].value_type == 'number'
                         ? res[Tbl_custom.struct[i].key]
                         : ('"' + res[Tbl_custom.struct[i].key]+ '"') )
            + ', "type": "' + Tbl_custom.struct[i].value_type + '"';
        if( i ==0 ){
            s += ', "min": 0, "max": 100000000';
        }
        if((k%2)==0){
            s += ', "col_nm": "' + Tbl_custom.struct[i].key + '"';
        }
        s += ' },';

        k += 2;
        if( (k % 4) == 0 ){
            k = 0; 
            s += ' ],';
        }
    }
    s += ' ] }';

    return eval('('+ s + ')');
}

// get update info
Tbl_custom._get_update_info = function(res){
    var s = '{ "' + Tbl_custom.struct[0].key + '": null, "title": "' + Tbl_custom.titles.update + '", "content": [ ' ;
    var k=0;
    for(var i=0; i<Tbl_custom.struct.length; i++){
        if(k==0){
           s += '[ ';
        }
        s += '{ "key": "' + Tbl_custom.struct[i].key + '", "type": "' + Tbl_custom.struct[i].key_type + '" }, ';
        s += '{ "key": ' + ( Tbl_custom.struct[i].value_type == 'number'
                         ? res[Tbl_custom.struct[i].key]
                         : ('"' + res[Tbl_custom.struct[i].key]+ '"') )
            + ', "type": "' + Tbl_custom.struct[i].value_type + '"';
        if( i ==0 ){
            s += ', "min": 0, "max": 100000000';
        }
        if((k%2)==0){
            s += ', "col_nm": "' + Tbl_custom.struct[i].key + '"';
        }
        s += ' },';

        k += 2;
        if( (k % 4) == 0 ){
            k = 0; 
            s += ' ],';
        }
    }
    s += ' ] }';

    return eval('('+ s + ')');
}

// get create info
Tbl_custom._get_create_info = function(){
    var s = '{ "' + Tbl_custom.struct[0].key + '": null, "title": "' + Tbl_custom.titles.create + '", "content": [ ' ;
    var k=0;
    for(var i=0; i<Tbl_custom.struct.length; i++){
        if(k==0){
           s += '[ ';
        }
        s += '{ "key": "' + Tbl_custom.struct[i].key + '", "type": "' + Tbl_custom.struct[i].key_type + '" }, ';
        s += '{ "key": ' + ( Tbl_custom.struct[i].value_type == 'number'
                         ? Tbl_custom.struct[i].value_def
                         : ('"' + Tbl_custom.struct[i].value_def + '"') )
            + ', "type": "' + Tbl_custom.struct[i].value_type + '"';
        if( i ==0 ){
            s += ', "min": 0, "max": 100000000';
        }
        if((k%2)==0){
            s += ', "col_nm": "' + Tbl_custom.struct[i].key + '"';
        }
        s += ' },';

        k += 2;
        if( (k % 4) == 0 ){
            k = 0; 
            s += ' ],';
        }
    }
    s += ' ] }';

    return eval('('+ s + ')');
}

//
Tbl_custom.prototype.add = function(req, resp, ctx){

    var sql_fmt = "insert into tbl_custom set first_name = '{first_name}', last_name = '{last_name}', user_name = '{user_name}', remark = '{remark}', crt_ts = now(), is_del = 0;";
    return this._dbop_insert(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_custom: is_exist");
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "select title from tbl_custom where title = '{title}' and is_del = 0"
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}


Tbl_custom.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_custom: update");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = "update tbl_custom set first_name = '{first_name}', last_name = '{last_name}', user_name = '{user_name}', remark = '{remark}', upd_ts = now(), is_del = 0 where seq = '{id}' and is_del = 0;";
   return this._dbop_update(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype._check_req_data = function (arr_data, ctx){
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

Tbl_custom.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "Tbl_custom: add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }

    var sql_fmt = "insert into tbl_custom set title = '{title}', url = '{url}', templateurl = '{templateurl}', controller = '{controller}', item_name = '{item_name}', is_navy = '{is_navy}', remark = '{remark}', crt_ts = now(), is_del = 0;";
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_custom: remove");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;
    
    var sql_fmt = "update tbl_custom set is_del = '1' where seq = '{id}'";
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_custom: recover");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    var sql_fmt = "update tbl_custom set is_del = '0' where seq = '{id}'";
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_custom: select_with_name");
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "select * from tbl_custom where title = '{title}' and is_del = 0";
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_custom: select_with_key");
    if(this.check_field(req, ctx, "id",        true, 1) == false) return false;

    var sql_fmt = "select * from tbl_custom where seq = '{id}' and is_del = 0"
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_custom: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = "select * from tbl_custom where is_del = 0 limit {start}, {cnt};";
	return this._dbop_select(sql_fmt, req, resp, ctx);
}

// db list / search
Tbl_custom.prototype._dbop_cmd_list = function(sql_fmt, req, resp, ctx){

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
                var sql_fmt_count = "select count(1) cnt from ({sql}) v_list_custom";
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
                                title :  Tbl_custom.titles.list,
                                list_title : Tbl_custom._get_list_title(), 
                                content : results,
                                page : {
                                    cur: req.page.cur,
                                    total : parseInt( n_results[0].cnt / Tbl_custom.m_page_cfg.size ) + ( n_results[0].cnt % Tbl_custom.m_page_cfg.size != 0 ? 1 : 0),                                   size : Tbl_area.m_page_cfg.size,
                                },
                                url : Tbl_custom.url,
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



// cmd list
Tbl_custom.prototype.cmd_list = function(req, resp, ctx){
    console.log( "Tbl_custom: cmd_list");
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;

    req["cnt"] = Tbl_custom.m_page_cfg.size;
    req["start"] = ( req.page.cur - 1 ) * Tbl_custom.m_page_cfg.size;

    var sql_fmt =  Tbl_custom._get_select_sql();
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

// cmd search
Tbl_custom.prototype.cmd_search = function(req, resp, ctx){
    console.log( "Tbl_custom: cmd_search");
    if(req.search == null || req.search == "" ){
        return this.cmd_list(req,resp,ctx);
    }

    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "search",      true, 0,255) == false) return false;
    req["start"] = ( req.page.cur - 1 ) * Tbl_custom.m_page_cfg.size;
    req["cnt"] = Tbl_custom.m_page_cfg.size;
   
 	var sql_fmt = Tbl_custom._get_select_sql() + " and ( first_name like '%{search}%' or last_name like '%{search}%' or user_name like '%{search}%' )";
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}


// db get detail
Tbl_custom.prototype._dbop_cmd_get_detail = function(sql_fmt, req, resp, ctx){
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
                resp.data = Tbl_custom._get_detail(results[0]);
           }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}


// cmd get detail
Tbl_custom.prototype.cmd_get_detail = function(req, resp, ctx){
    console.log( "Tbl_custom: cmd_get_detail");
    if(this.check_field(req, ctx, "id",        true, 1) == false) return false;

    var sql_fmt = Tbl_custom._get_select_sql() + " and " + Tbl_custom.struct[0].key + " = '{id}'";
    return this._dbop_cmd_get_detail(sql_fmt, req, resp, ctx);
}

// db get update info
Tbl_custom.prototype._dbop_cmd_get_update_info = function(sql_fmt, req, resp, ctx){
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
                resp.data = Tbl_custom._get_update_info(results[0]);
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}


// cmd get update info
Tbl_custom.prototype.cmd_get_update_info = function(req, resp, ctx){
    console.log( "Tbl_custom: cmd_get_update_info");
    if(this.check_field(req, ctx, "id",        true, 1) == false) return false;

    var sql_fmt = Tbl_custom._get_select_sql() + " and " + Tbl_custom.struct[0].key + " = '{id}'";
    return this._dbop_cmd_get_update_info(sql_fmt, req, resp, ctx);
}


// db get create info
Tbl_custom.prototype._dbop_cmd_get_create_info = function(sql_fmt, req, resp, ctx){
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
                resp.data = Tbl_custom._get_create_info();
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}


// cmd get create info
Tbl_custom.prototype.cmd_get_create_info = function(req, resp, ctx){
    console.log( "Tbl_custom: cmd_get_create_info");

    var sql_fmt = Tbl_custom._get_select_sql() + ' limit 0, 1';
    return this._dbop_cmd_get_create_info(sql_fmt, req, resp, ctx);
}





var cur = new Tbl_custom;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
