var util = require("util");
var tbl_const = require("./tbl_const");

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz
  var o = { 
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

Date.prototype.toString = function()   {  return this.Format("yyyy-MM-dd hh:mm:ss");   }  

// get base sql:

// sql: get_set_sql
exports._get_set_sql = function(info){
    var sql_fmt = 'set ';
    for(var elem in info.struct){
        //if(info.struct[elem].is_to_set == 1 && info.struct[elem].op!=null && info.struct[elem].op.editable==1){
        if(info.struct[elem].is_to_set == 1 ){
            sql_fmt += info.struct[elem].key + ' = ';
            switch(info.struct[elem].value_type)
            {
                case 'number':
                    sql_fmt += '{' + info.struct[elem].key + '}, ';
                    break;
                default:
                    sql_fmt += '"{' + info.struct[elem].key + '}", ';
            }
        }
    }
    return sql_fmt;
}

// sql: get_add_sql
exports._get_add_sql = function(info){
    var sql_fmt = 'insert into ' + info.tbl_name + ' ' + this._get_set_sql(info);
    sql_fmt += info.struct['crt_ts'].key + ' = now(), ';
    sql_fmt += info.struct['is_del'].key + ' = 0 ';
    return sql_fmt;
}

// sql: get_update_sql
exports._get_update_sql = function(info){
    var sql_fmt = 'update ' + info.tbl_name + ' ' + this._get_set_sql(info);
    sql_fmt += info.struct['upd_ts'].key + ' = now() ';
    sql_fmt += 'where ' + info.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + info.struct['id'].key + ' = {id} ';
    return sql_fmt;
}

// sql: get_remove_sql
exports._get_remove_sql = function(info){
    var sql_fmt = 'update ' + info.tbl_name + ' set ';
    sql_fmt += info.struct['is_del'].key + ' = 1 ';
    sql_fmt += 'where ' +info.struct['id'].key + ' = {id} ';
    return sql_fmt;
}

// sql: get_recover_sql
exports._get_recover_sql = function(info){
    var sql_fmt = 'update ' + info.tbl_name + ' set ';
    sql_fmt += info.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'where ' +info.struct['id'].key + ' = {id} ';
    return sql_fmt;
}

// sql: get_select_sql
exports._get_select_sql = function(info){
    var sql_fmt = 'select * from ' + info.tbl_name + ' where ';
    sql_fmt += info.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'limit {start}, {cnt} ';
    return sql_fmt;
}

// sql: get_select_with_name_sql
exports._get_select_with_name_sql = function(info){
    var sql_fmt = 'select * from ' + info.tbl_name + ' where ';
    sql_fmt += info.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + ( info.struct['name'] == null  ? 'name' : info.struct['name'].key ) + ' = {name} ';
    return sql_fmt;
}

// sql: get_select_with_key_sql
exports._get_select_with_key_sql = function(info){
    var sql_fmt = 'select * from ' + info.tbl_name + ' where ';
    sql_fmt += info.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + info.struct['id'].key  + ' = {id} ';
    return sql_fmt;
}

// sql: get_is_exist_sql
exports._get_is_exist_sql = function(info){
    var sql_fmt = 'select ' + info.struct['id'].key + ' from ' + info.tbl_name + ' where ';
    sql_fmt += info.struct['is_del'].key + ' = 0 ';
    sql_fmt += 'and ' + ( info.struct['name'] == null  ? 'name' : info.struct['name'].key )  + ' = {name} ';
    return sql_fmt;
}



// get custom sql:

// get list select sql 
exports._get_list_select_sql = function(info){
    var sql_fmt = 'select ';
    for(var elem in info.struct){
        if(info.struct[elem].is_col==1 && (info.struct[elem].is_view==1 || info.struct[elem].is_list==1 )){
            if( info.struct[elem].op == null || (info.struct[elem].op['op_type'] != 'select' && info.struct[elem].op['op_type'] != 'show_select' ) ){
                sql_fmt += ( info.tbl_name2 != null ? info.struct[elem].tbl : '' ) + info.struct[elem].key;
            }
            else{
                sql_fmt += '( case ' + ( info.tbl_name2 != null ? info.struct[elem].tbl : '' ) + info.struct[elem].key
                    + tbl_const.value_instead(info.struct[elem].op.op_args) + ' ) as ' + info.struct[elem].key;
            }
            sql_fmt += ', ';
        }
    }
    sql_fmt = sql_fmt.substr(0, sql_fmt.length-2) + ' ';
    sql_fmt += 'from '+ info.tbl_name + ( info.tbl_name2 != null ? ( info.tbl_alias + ', ' + info.tbl_name2 + info.tbl_alias2 + ' '  ) : ' ' );
    sql_fmt += 'where ' +  ( info.tbl_name2 != null ? info.struct['is_del'].tbl : '' )  + info.struct['is_del'].key + ' = 0 '
        + ( info.tbl_name2 != null ? ( 'and ' + info.struct['is_del2'].tbl + info.struct['is_del2'].key + ' = 0 and ' + info.join_condition ) : ' ' );
    return sql_fmt;
}

// get detail select sql 
exports._get_detail_select_sql = function(info){
    var sql_fmt = 'select ';
    var struct = info.struct;
    for(var elem in struct){
        if(struct[elem].is_col==1 && (struct[elem].is_view==1 || struct[elem].is_detail==1 )){
            //if( struct[elem].op == null || struct[elem].op['op_type'] != 'show_select' ){
                sql_fmt += struct[elem].key;
            //}
            //else{
           //     sql_fmt += '( case ' + struct[elem].key
           //         + tbl_const.value_instead(struct[elem].op.op_args) + ' ) as ' + struct[elem].key;
           // }
            sql_fmt += ', ';
        }
    }
    
    sql_fmt = sql_fmt.substr(0, sql_fmt.length-2);
    sql_fmt += ' from '+ info.tbl_name;
    sql_fmt += ' where is_del = 0 and id = {id}';
    return sql_fmt;
}

// get detail info select sql 
exports._get_detail_info_select_sql = function(info, visitor_type){
    if( info == null || visitor_type == null || parseInt(visitor_type) < 1 || parseInt(visitor_type) >4 ) return "";
    var n = parseInt(visitor_type) - 1;
    var sql_fmt = 'select ';
    var struct = info.visitor_struct[n];
    for(var elem in struct){
        if(struct[elem].is_col==1 && (struct[elem].is_view==1 || struct[elem].is_detail==1 )){
                sql_fmt += struct[elem].tbl + struct[elem].key;
            sql_fmt += ', ';
        }
    }
    
    sql_fmt = sql_fmt.substr(0, sql_fmt.length-2);
    sql_fmt += ' from '+ info.tbl_visitor_name[n];
    sql_fmt += ' where ' + info.join_condition[n];
    return sql_fmt;
}

// sql: get_list_sql 
exports._get_list_sql = function(info){
    return this._get_list_select_sql(info) + 'order by ' +( info.tbl_name2 != null ? info.struct['is_del'].tbl:'' ) + info.struct['id'].key +' desc ';
}

// sql: get_search_sql 
exports._get_search_sql = function(info){
    var sql_fmt = 'and ( ';
    for(var elem in info.struct){
        if(info.struct[elem].is_col==1 && (info.struct[elem].is_view==1 || info.struct[elem].is_list==1 )){
            sql_fmt += ( info.tbl_name2 != null ? info.struct[elem].tbl : '' ) + info.struct[elem].key + ' like "%{search}%" ';
            sql_fmt += 'or ';
       }
    }
    sql_fmt = sql_fmt.substr(0, sql_fmt.length-3) + ') ';
    return this._get_list_select_sql(info) + sql_fmt + 'order by ' +( info.tbl_name2 != null ? info.struct['is_del'].tbl:'' ) +  info.struct['id'].key +' desc ';
}

// sql: get_detail_sql 
exports._get_detail_sql = function(info){
    return this._get_detail_select_sql(info);
}

// sql: get_detail_info_sql 
exports._get_detail_info_sql = function(info, visitor_type){
    return this._get_detail_info_select_sql(info, visitor_type);
}

// sql: get_update_info_sql 
exports._get_update_info_sql = function(info){
    return this._get_detail_select_sql(info);
}

// sql: get_create_info_sql 
exports._get_create_info_sql = function(info){
    return '';
}


// get custom data:

// data: get_list_title
exports._get_list_title = function(info){
    var list_title = [];
    var i=0;
    for(var elem in info.struct){
        if(info.struct[elem].is_view == 1 || info.struct[elem].is_list == 1){
            list_title[i++] = info.struct[elem].key_text;
        }
    }

    return list_title;
}

// data: get_list_key
exports._get_list_key = function(info){
    var list_key = [];
    var i=0;
    for(var elem in info.struct){
        if(info.struct[elem].is_list == 1){
            list_key[i++] = info.struct[elem].key;
        }
    }
    return list_key;
}

// data: get_update_or_create_data
exports._get_content = function(info, res){
    var data = [];
    var k=0;
    var i=0;
    var struct = info.struct;
    for(var elem in struct){
        if(struct[elem].is_col==1 && (struct[elem].is_view==1 || struct[elem].is_detail==1 )){
            if(k==0){
               data[i] = [];
            }
            data[i][k++] = { key: struct[elem].key_text, type: struct[elem].key_type };
            data[i][k] = {
                key: ( struct[elem].value_type == 'number'
                     ? (res == null ? struct[elem].value_def : parseInt(res[struct[elem].key]))
                     : (res == null || struct[elem].is_col!=1 ? struct[elem].value_def : res[struct[elem].key]) ),
                type: struct[elem].value_type,
                //vt: typeof(res == null ? struct[elem].value_def : res[struct[elem].key]),

            };
            if(struct[elem].value_type == 'number'){
                data[i][k]['min'] = 0;
                data[i][k]['max'] = 100000000;
            }
            if((k%2)==1){
                data[i][k]['col_nm'] = struct[elem].key;
                tbl_const.copy_elem(data[i][k], struct[elem].op);
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

// data: get_detail_info_data
exports._get_detail_info_content = function(info, res, visitor_type){
    var data = [];
    var k=0;
    var i=0;
    console.log("res: ",res);
    var struct = info.visitor_struct[visitor_type-1];
    for(var elem in struct){
        if(struct[elem].is_col==1 && (struct[elem].is_view==1 || struct[elem].is_detail==1 )){
            if(k==0){
               data[i] = [];
            }
            data[i][k++] = { key: struct[elem].key_text, type: struct[elem].key_type };
            data[i][k] = {
                key: ( struct[elem].value_type == 'number'
                             ? (res == null ? struct[elem].value_def : parseInt(res[struct[elem].key]))
                             : (res == null || struct[elem].is_col!=1 ? struct[elem].value_def : res[struct[elem].key]) ),
                type: struct[elem].value_type,
                //vt: typeof(res == null ? struct[elem].value_def : res[struct[elem].key]),
            };
            if(struct[elem].value_type == 'number'){
                data[i][k]['min'] = 0;
                data[i][k]['max'] = 100000000;
            }
            if((k%2)==1){
                data[i][k]['col_nm'] = struct[elem].key;
                tbl_const.copy_elem(data[i][k], struct[elem].op);
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


// data: get_detail_data
exports._get_detail_content = function(info, res1, res2){
    var data = [];
    var k=0;
    var i=0;
    var res = res1;
    var struct = info.struct;
    for(var elem in struct){
        if(struct[elem].is_col==1 && (struct[elem].is_view==1 || struct[elem].is_detail==1 )){
            if(k==0){
               data[i] = [];
            }
            data[i][k++] = { key: struct[elem].key_text, type: struct[elem].key_type };
            data[i][k] = {
                key: ( struct[elem].value_type == 'number'
                     ? (res == null ? struct[elem].value_def : parseInt(res[struct[elem].key]))
                     //: struct[elem].value_type == 'datetime-local'
                     //? new Date(res == null ? struct[elem].value_def : res[struct[elem].key]).Format('yyyy-MM-dd hh:mm:ss')
                     : (res == null || struct[elem].is_col!=1 ? struct[elem].value_def : res[struct[elem].key]) ),
                type: struct[elem].value_type,
                //vt: typeof(res == null ? struct[elem].value_def : res[struct[elem].key]),
            };

/*
            switch(struct[elem].value_type){
            case 'number':
                data[i][k]['key'] = res == null ? struct[elem].value_def : parseInt(res[struct[elem].key]);
                break;
            case 'datetime-local':
                data[i][k]['key'] = new Date(res == null ? struct[elem].value_def : res[struct[elem].key]).Format("yyyy-MM-dd hh:mm:ss");
                break;
            default:
                data[i][k]['key'] = (res == null || struct[elem].is_col!=1) ? struct[elem].value_def : res[struct[elem].key] ;
            }
            data[i][k]['type'] = struct[elem].value_type;
*/
            if(struct[elem].value_type == 'number'){
                data[i][k]['min'] = 0;
                data[i][k]['max'] = 100000000;
            }
            if((k%2)==1){
                data[i][k]['col_nm'] = struct[elem].key;
                tbl_const.copy_elem(data[i][k], struct[elem].op);
            }
            k ++;
            if( (k % 4) == 0 ){
                k = 0;
                i ++;
            }
        }
    }
    struct = info.visitor_struct[res==null?3:res["visitor_type"]-1];
    res = res2;
    for(var elem in struct){
        if(struct[elem].is_col==1 && (struct[elem].is_view==1 || struct[elem].is_detail==1 )){
            if(k==0){
               data[i] = [];
            }
            data[i][k++] = { key: struct[elem].key_text, type: struct[elem].key_type };
            data[i][k] = {
                key: ( struct[elem].value_type == 'number'
                             ? (res == null ? struct[elem].value_def : parseInt(res[struct[elem].key]))
                             : (res == null || struct[elem].is_col!=1 ? struct[elem].value_def : res[struct[elem].key]) ),
                type: struct[elem].value_type,
                //vt: typeof(res == null ? struct[elem].value_def : res[struct[elem].key]),

            };
            if(struct[elem].value_type == 'number'){
                data[i][k]['min'] = 0;
                data[i][k]['max'] = 100000000;
            }
            if((k%2)==1){
                data[i][k]['col_nm'] = struct[elem].key;
                tbl_const.copy_elem(data[i][k], struct[elem].op);
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

// data: get_list_data
exports._get_list_data = function(info, res, cur, total){
    for(var i in res){
        res[i]["start_dt"] = (res[i]["start_dt"]).toString();
        res[i]["end_dt"] = (res[i]["end_dt"]).toString();
    }

    var data = {
        title :  info.titles.list,
        list_title : this._get_list_title(info), 
        list_key : this._get_list_key(info), 
        content : res, 
        page : {
            cur: cur,
            total : parseInt( total / info.m_page_cfg.size ) + ( total % info.m_page_cfg.size != 0 ? 1 : 0),
            size : info.m_page_cfg.size,
        },
        url : info.url,
    };
    return data;
}

// data: get_search_data
exports._get_search_data = function(info, res, cur, total){
    for(var i in res){
        res[i]["start_dt"] = (res[i]["start_dt"]).toString();
        res[i]["end_dt"] = (res[i]["end_dt"]).toString();
    }

     var data = {
        title :  info.titles.search,
        list_title : this._get_list_title(info), 
        list_key : this._get_list_key(info), 
        content : res, 
        page : {
            cur: cur,
            total : parseInt( total / info.m_page_cfg.size ) + ( total % info.m_page_cfg.size != 0 ? 1 : 0),
            size : info.m_page_cfg.size,
        },
        url : info.url,
    };
    return data;
}

// data: get_detail
exports._get_detail = function(info, res, res2){
    var data = {};
    data[info.struct['id'].key] = res[info.struct['id'].key];
    data['title'] = info.titles.detail;
    data['content'] = this._get_detail_content(info, res, res2);
    data['parent'] = {
    	url: info.url.list,
	    title: info.title,
    };
    return data;
}

// data: get_update_info
exports._get_update_info = function(info, res){
    var data = {};
    data[info.struct['id'].key] = res[info.struct['id'].key];
    data['title'] = info.titles.update;
    data['content'] = this._get_content(info, res);
    data['parent'] = {
    	url: info.url.list,
	    title: info.title,
    };
    return data;
}

// data: get_detail_info
exports._get_detail_info = function(info, res, visitor_type){
    var data = {};
    //data[info.struct['id'].key] = res[info.struct['id'].key];
    //data['title'] = info.titles.update;
    //data['content'] = this._get_detail_info_content(info, res, visitor_type);
    //data['parent'] = {
    //	url: info.url.list,
	//    title: info.title,
    //};
    //return data;
    return this._get_detail_info_content(info, res, visitor_type);
}


// data: get_create_info
exports._get_create_info = function(info){
    var data = {};
    data[info.struct['id'].key] = null;
    data['title'] = info.titles.create;
    data['content'] = this._get_content(info, null);
    data['parent'] = {
    	url: info.url.list,
	    title: info.title,
    };
    return data;
}



