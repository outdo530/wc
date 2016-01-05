var inherits = require("util").inherits;
var Dao = require("../dao");
function Tbl_area(){
    Dao.call(this);

    // title in Chinese
    Tbl_area.list_title = [  "#", "First Name",       "Last Name",         "UserName",     "Update?",    "Delete?", ];
    //page size cfg for all app
    Tbl_area.m_page_cfg = { size : 6, };

    Tbl_area.url = {
        list:   '/area_list',
        create: '#/area_create',
        update: '#/area_update',
        detail: '#/area_detail',
    };

    Tbl_area.detail = [
        {
            key : 'seq',
            key_text : Tbl_area.list_title[0], 
            key_type: 'label',
            value : null,
            value_type : 'number',
        },
        {
            key : 'first_name',
            key_text : Tbl_area.list_title[1], 
            key_type: 'label',
            value : '',
            value_type : 'text',
        },
        {
            key : 'last_name',
            key_text : Tbl_area.list_title[2], 
            key_type: 'label',
            value : '',
            value_type : 'text',
        },
        {
            key : 'user_name',
            key_text : Tbl_area.list_title[3], 
            key_type: 'label',
            value : '',
            value_type : 'text',
        },
        {
            key : 'update',
            key_text : Tbl_area.list_title[4], 
            key_type: 'label',
            value : 'OK?',
            value_type : 'text',
        },
        {
            key : 'delete',
            key_text : Tbl_area.list_title[5], 
            key_type: 'label',
            value : 'NO?',
            value_type : 'text',
        },
  
    ];

    Tbl_area.content = [
        [
            {key : Tbl_area.detail[0].key_text, type : Tbl_area.detail[0].key_type},
            {key : Tbl_area.detail[0].value, type : Tbl_area.detail[0].value_type},
            {key : Tbl_area.detail[1].key_text, type : Tbl_area.detail[1].key_type},
            {key : Tbl_area.detail[1].value, type : Tbl_area.detail[1].value_type},
        ],
        [
            {key : Tbl_area.detail[2].key_text, type : Tbl_area.detail[2].key_type},
            {key : Tbl_area.detail[2].value, type : Tbl_area.detail[2].value_type},
            {key : Tbl_area.detail[3].key_text, type : Tbl_area.detail[3].key_type},
            {key : Tbl_area.detail[3].value, type : Tbl_area.detail[3].value_type},
 
        ],
        [
            {key : Tbl_area.detail[4].key_text, type : Tbl_area.detail[4].key_type},
            {key : Tbl_area.detail[4].value, type : Tbl_area.detail[4].value_type},
            {key : Tbl_area.detail[5].key_text, type : Tbl_area.detail[5].key_type},
            {key : Tbl_area.detail[5].value, type : Tbl_area.detail[5].value_type},
 
        ],
    ];

    this._tab["cmd_list"]    = this.cmd_list;
    this._tab["cmd_search"]    = this.cmd_search;
    this._tab["cmd_get_detail"]    = this.cmd_get_detail;
    this._tab["cmd_get_create_info"]    = this.cmd_get_create_info;
 
 
}
inherits(Tbl_area, Dao);


var util = require("util");
var ErrorCode = require("../error_code");
var tools = require("../tools");


Tbl_area.prototype.add = function(req, resp, ctx){
    //if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "insert into tbl_area set first_name = '{first_name}', last_name = '{last_name}', user_name = '{user_name}', remark = '{remark}', crt_ts = now(), is_del = 0;";
    return this._dbop_insert(sql_fmt, req, resp, ctx);
}

Tbl_area.prototype.is_exist = function(req, resp, ctx){
    console.log( "Tbl_area: is_exist");
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "select title from tbl_area where title = '{title}' and is_del = 0"
    return this._dbop_is_exist(sql_fmt, req, resp, ctx);
}


Tbl_area.prototype.update = function(req, resp, ctx){
    console.log( "Tbl_area: update");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    req.seq = req.id;
    var sql_fmt = "update tbl_area set first_name = '{first_name}', last_name = '{last_name}', user_name = '{user_name}', remark = '{remark}', upd_ts = now(), is_del = 0 where seq = '{seq}' and is_del = 0;";
   return this._dbop_update(sql_fmt, req, resp, ctx);
}

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
        if(this.check_field(arr_data[i], ctx, "title",       true, 0,64) == false) return false;
        //if(this.check_field(arr_data[i], ctx, "parent_id",  false, 1) == false) return false;
    }
    return true;
}

Tbl_area.prototype.add_multi_rows = function(req, resp, ctx){
    console.log( "Area:add_multi_rows");
    if(this._check_req_data(req.data, ctx) == false){
        console.error("check req failed");
        return false;
    }

    var sql_fmt = "insert into tbl_area set title = '{title}', url = '{url}', templateurl = '{templateurl}', controller = '{controller}', item_name = '{item_name}', is_navy = '{is_navy}', remark = '{remark}', crt_ts = now(), is_del = 0;";
    return this._dbop_add_multi_rows(sql_fmt, req, resp, ctx);
}

Tbl_area.prototype.remove = function(req, resp, ctx){
    console.log( "Tbl_area: remove");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;
    
    req.seq = req.id;
    var sql_fmt = "update tbl_area set is_del = '1' where seq = '{seq}'";
    return this._dbop_remove(sql_fmt, req, resp, ctx);
}

Tbl_area.prototype.recover = function(req, resp, ctx){
    console.log( "Tbl_area: recover");
    if(this.check_field(req, ctx, "id",        true, 0) == false) return false;

    req.seq = req.id;
    var sql_fmt = "update tbl_area set is_del = '0' where seq = '{seq}'";
    return this._dbop_recover(sql_fmt, req, resp, ctx);
}

Tbl_area.prototype.select_with_name = function(req, resp, ctx){
    console.log( "Tbl_area: select_with_name");
    if(this.check_field(req, ctx, "title",       true, 0,64) == false) return false;

    var sql_fmt = "select * from tbl_area where title = '{title}' and is_del = 0";
    return this._dbop_select_with_name(sql_fmt, req, resp, ctx);
}

Tbl_area.prototype.select_with_key = function(req, resp, ctx){
    console.log( "Tbl_area: select_with_key");
    if(this.check_field(req, ctx, "id",        true, 1) == false) return false;

    req.seq = req.id;
    var sql_fmt = "select * from tbl_area where seq = '{seq}' and is_del = 0"
    return this._dbop_select_with_key(sql_fmt, req, resp, ctx);
}

// list / search
Tbl_area.prototype._dbop_cmd_list = function(sql_fmt, req, resp, ctx){

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
                                list_title : Tbl_area.list_title, 
                                content : results,
                                page : {
                                    cur: req.page.cur,
                                    total : parseInt( n_results[0].cnt / Tbl_area.m_page_cfg.size ) + ( n_results[0].cnt % Tbl_area.m_page_cfg.size != 0 ? 1 : 0),                                   size : Tbl_area.m_page_cfg.size,
                                },
                                url : Tbl_area.url,
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


Tbl_area.prototype.select = function(req, resp, ctx){
    console.log( "Tbl_area: select");
    if(this.check_field(req, ctx, "start",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "cnt",        true, 1) == false) return false;

	var sql_fmt = "select * from tbl_area where is_del = 0 limit {start}, {cnt};";
	return this._dbop_select(sql_fmt, req, resp, ctx);
}

Tbl_area.prototype.cmd_list = function(req, resp, ctx){
    console.log( "Tbl_area: cmd_list");
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;

    req["cnt"] = Tbl_area.m_page_cfg.size;
    req["start"] = ( req.page.cur - 1 ) * Tbl_area.m_page_cfg.size;

    var sql_fmt =  " select seq, first_name, last_name, user_name from tbl_area where is_del = 0 order by seq asc "

	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}

Tbl_area.prototype.cmd_search = function(req, resp, ctx){
    console.log( "Tbl_area: cmd_search");

    if(req.search == null || req.search == "" ){
        return this.cmd_list(req,resp,ctx);
    }
    if(this.check_field(req.page, ctx, "cur",      true, 0) == false) return false;
    if(this.check_field(req, ctx, "search",      true, 0,255) == false) return false;
    req["start"] = ( req.page.cur - 1 ) * Tbl_area.m_page_cfg.size;
    req["cnt"] = Tbl_area.m_page_cfg.size;

   
 	var sql_fmt = "select seq, first_name, last_name, user_name from tbl_area where is_del = 0 and ( first_name like '%{search}%' or last_name like '%{search}%' or user_name like '%{search}%' ) order by seq asc ";
	return this._dbop_cmd_list(sql_fmt, req, resp, ctx);
}


// list / search
Tbl_area.prototype._dbop_cmd_get_detail = function(sql_fmt, req, resp, ctx){
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
                var data = Tbl_area.content;
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
Tbl_area.prototype.cmd_get_detail = function(req, resp, ctx){
    console.log( "Tbl_area: cmd_get_detail");
    if(this.check_field(req, ctx, "id",        true, 1) == false) return false;

    req.seq = req.id;
    var sql_fmt = "select * from tbl_area where seq = '{seq}' and is_del = 0"
    return this._dbop_cmd_get_detail(sql_fmt, req, resp, ctx);
}

// create info
Tbl_area.prototype._dbop_cmd_get_create_info = function(sql_fmt, req, resp, ctx){
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
                resp.data = {
                    seq : 0,
                    title : "create",
                    content : Tbl_area.content,
                };
            }
            mysql_conn.end();
            dao_obj.render_resp(resp, ctx);
        }
    );
    return  true;
}


// create info
Tbl_area.prototype.cmd_get_create_info = function(req, resp, ctx){
    console.log( "Tbl_area: cmd_get_create_info");

    var sql_fmt = 'select * from tbl_area where seq = 0';
    return this._dbop_cmd_get_create_info(sql_fmt, req, resp, ctx);
}





var cur = new Tbl_area;
module.exports = function (req, res, next){
    cur.handle(req, res, next);
}
