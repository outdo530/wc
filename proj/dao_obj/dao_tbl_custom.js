var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_custom(){
    Dao.call(this);

    // dao table name
    this.tbl_name = 'tbl_custom';

    // title
    this.title = 'Custom';

    // view struct
    Tbl_custom.struct = [
        { key: 'id', key_text: '编号', key_type: 'label', value_def: null, value_type: 'text', is_column: 1},
        { key: 'nm',  key_text: '名称', key_type: 'label', value_def: '', value_type: 'text', is_column: 1},
        { key: 'contact_nm',  key_text: '联系人名称', key_type: 'label', value_def: '', value_type: 'text', is_column: 1},
        { key: 'fix_phone',  key_text: '固话', key_type: 'label', value_def: '', value_type: 'text', is_column: 1},
        { key: 'mobile',  key_text: '手机', key_type: 'label', value_def: '', value_type: 'text', is_column: 1},
        { key: 'addr',  key_text: '地址', key_type: 'label', value_def: '', value_type: 'text', is_column: 1},
        { key: 'type',  key_text: '类型', key_type: 'label', value_def: '', value_type: 'text', is_column: 1},
        { key: 'update',  key_text: '更新?', key_type: 'label', value_def: '', value_type: 'text', is_column: 0},
        { key: 'delete',  key_text: '删除?', key_type: 'label', value_def: '', value_type: 'text', is_column: 0},
    ];

    // page size cfg for all app
    Tbl_custom.m_page_cfg = { size : 6, };

    // titles
    Tbl_custom.titles = [
        list: this.title, search: this.title, detail: this.title + ' Detail', update: this.title + ' Update', ceate: this.title + ' Create'
    ];

    // url
    Tbl_custom.url = {
        list :   '/area_list',
        create : '#/area_create',
        update : '#/area_update',
        detail : '#/area_detail',
    };

    this._tab["cmd_list"]    = this.cmd_list;
    this._tab["cmd_search"]    = this.cmd_search;
    this._tab["cmd_get_detail"]    = this.cmd_get_detail;
    this._tab["cmd_get_create_info"]    = this.cmd_get_create_info;


}
inherits(Tbl_custom, Dao);


var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");

// get list title
Tbl_custom.prototype.get_list_title = function(){
    var list_title = [];
    for(int i=0; i<Tbl_custom.struct; i++){
        list_title[i] = Tbl_custom.struct[i].key_text;
    }
    return list_title;
}

// get list sql 
Tbl_custom.prototype.get_list_sql = function(){
    var sql_fmt = "select ";
    for(int i=0; i<Tbl_custom.struct; i++){
        if(Tbl_custom.struct[i].is_column == 1){
            sql_fmt += Tbl_custom.struct[i].key;
            sql_fmt += ' ';
        }
    }
    sql_fmt += 'from ';
    sql_fmt += this.tbl_name;
    sql_fmt += ' where is_del = 0';
    return sql_fmt;
}

// get detail info
Tbl_custom.prototype.get_detail_info = function(res){
    var data = [];
    var j=0,k=0;
    for(int i=0; i<Tbl_custom.struct; i++){
        if( (k % 4) == 0 ){ j++; K = 0; }
        data[j][k++] = { key: Tbl_custom.struct[i].key, type: Tbl_custom.struct[i].key_type };
        data[j][k++] = { key: res[Tbl_custom.struct[i].key], type: Tbl_custom.struct[i].value_type };
    }
    return data;
}

// get create info
Tbl_custom.prototype.get_create_info = function(){
    var data = [];
    var j=0,k=0;
    for(int i=0; i<Tbl_custom.struct; i++){
        if( (k % 4) == 0 ){ j++; K = 0; }
        data[j][k++] = { key: Tbl_custom.struct[i].key, type: Tbl_custom.struct[i].key_type };
        data[j][k++] = { key: Tbl_custom.struct[i].value_def, type: Tbl_custom.struct[i].value_type };
    }
    return data;
}

//
Tbl_custom.prototype.add = function(req, resp, ctx){
    //if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "insert into tbl_area set first_name = '{first_name}', last_name = '{last_name}', user_name = '{user_name}', remark = '{remark}', crt_ts = now(), is_del = 0;";
    return this._dbop_insert(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_custom: is_exist");
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "select title from tbl_area where title = '{title}' and is_del = 0"
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}


Tbl_custom.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_custom: update");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    req.seq = req.id;
    var sql_fmt = "update tbl_area set first_name = '{first_name}', last_name = '{last_name}', user_name = '{user_name}', remark = '{remark}', upd_ts = now(), is_del = 0 where seq = '{seq}' and is_del = 0;";
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
    console.log( "Area:add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }

    var sql_fmt = "insert into tbl_area set title = '{title}', url = '{url}', templateurl = '{templateurl}', controller = '{controller}', item_name = '{item_name}', is_navy = '{is_navy}', remark = '{remark}', crt_ts = now(), is_del = 0;";
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_custom: remove");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;
    
    req.seq = req.id;
    var sql_fmt = "update tbl_area set is_del = '1' where seq = '{seq}'";
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_custom: recover");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    req.seq = req.id;
    var sql_fmt = "update tbl_area set is_del = '0' where seq = '{seq}'";
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_custom: select_with_name");
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "select * from tbl_area where title = '{title}' and is_del = 0";
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_custom: select_with_key");
    if(this.check_field(req, ctx, "id",        true, 1) == false) return false;

    req.seq = req.id;
    var sql_fmt = "select * from tbl_area where seq = '{seq}' and is_del = 0"
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

// list / search
Tbl_custom.prototype._dbop_cmd_list = function(sql_fmt, req, resp, ctx){

    var sql_fmt_content = sql_fmt + " limit {start}, {cnt};";

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
                console.log(tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}));
                mysql_conn.query(
                    tools.format_object(sql_fmt_count, {sql: tools.format_object(sql_fmt, req)}),
                    function (n_err, n_results, n_fields){
                        if(n_err){
                            console.log("err: ", n_err);
                            resp.result = ErrorCode.db_sel_failed;
                            resp.result_string = "Select failed: " + err;
                        }
                        else{
                            resp.result = 0;
                            resp.result_string = "OK";
                            resp.data = {
                                title :  "Area",
                                list_title : Tbl_custom.list_title, 
                                content : results,
                                page : {
                                    cur: req.page.cur,
                                    total : parseInt( n_results[0].cnt / Tbl_custom.m_page_cfg.size ) + ( n_results[0].cnt % Tbl_area.m_page_cfg.size != 0 ? 1 : 0),                                   size : Tbl_area.m_page_cfg.size,
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


Tbl_custom.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_custom: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = "select * from tbl_area where is_del = 0 limit {start}, {cnt};";
	return this._dbop_select(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.cmd_list = function(req, resp, ctx){
    console.log( "Tbl_custom: cmd_list");
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;

    req["cnt"] = Tbl_custom.m_page_cfg.size;
    req["start"] = ( req.page.cur - 1 ) * Tbl_custom.m_page_cfg.size;

    var sql_fmt =  " select seq, first_name, last_name, user_name from tbl_area where is_del = 0 order by seq asc "

	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

Tbl_custom.prototype.cmd_search = function(req, resp, ctx){
    console.log( "Tbl_custom: cmd_search");

    if(req.search == null || req.search == "" ){
        return this.cmd_list(req,resp,ctx);
    }
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "search",      true, 0,255) == false) return false;
    req["start"] = ( req.page.cur - 1 ) * Tbl_custom.m_page_cfg.size;
    req["cnt"] = Tbl_custom.m_page_cfg.size;

   
 	var sql_fmt = "select seq, first_name, last_name, user_name from tbl_area where is_del = 0 and ( first_name like '%{search}%' or last_name like '%{search}%' or user_name like '%{search}%' ) order by seq asc ";
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}


// list / search
Tbl_custom.prototype._dbop_cmd_get_detail = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
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
                var data = Tbl_custom.content;
                if(results.length == 1){
                    data[0][1].key = results[0].seq;
                    data[0][3].key = results[0].first_name;
                    data[1][1].key = results[0].last_name;
                    data[1][3].key = results[0].user_name;
                }
                resp.data = {
                    seq : results[0].seq,
                    title : "detail",
                    content : data,
                };
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}




// detail
Tbl_custom.prototype.cmd_get_detail = function(req, resp, ctx){
    console.log( "Tbl_custom: cmd_get_detail");
    if(this.check_field(req, ctx, "id",        true, 1) == false) return false;

    req.seq = req.id;
    var sql_fmt = "select * from tbl_area where seq = '{seq}' and is_del = 0"
    return this._dbop_cmd_get_detail(sql_fmt, req, resp, ctx);
}

// create info
Tbl_custom.prototype._dbop_cmd_get_create_info = function(sql_fmt, req, resp, ctx){
    var dao_obj = this;
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
                var data = Tbl_custom.content;
                data[0][1].key = null;
                data[0][3].key = '';
                data[1][1].key = '';
                data[1][3].key = '';
                resp.data = {
                    seq : null,
                    title : "create",
                    content : data,
                };
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}


// create info
Tbl_custom.prototype.cmd_get_create_info = function(req, resp, ctx){
    console.log( "Tbl_custom: cmd_get_create_info");

    var sql_fmt = 'select * from tbl_area where seq = 0';
    return this._dbop_cmd_get_create_info(sql_fmt, req, resp, ctx);
}





var cur = new Tbl_custom;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
