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
    for(var elem in info.struct){
        if(info.struct[elem].is_col==1 && (info.struct[elem].is_view==1 || info.struct[elem].is_detail==1 )){
            //if( info.struct[elem].op == null || info.struct[elem].op['op_type'] != 'show_select' ){
                sql_fmt += ( info.tbl_name2 != null ? info.struct[elem].tbl : '' ) + info.struct[elem].key;
            //}
            //else{
            //    sql_fmt += '( case ' + ( info.tbl_name2 != null ? info.struct[elem].tbl : '' ) + info.struct[elem].key
            //        + tbl_const.value_instead(info.struct[elem].op.op_args) + ' ) as ' + info.struct[elem].key;
           // }
            sql_fmt += ', ';
        }
    }
    sql_fmt = sql_fmt.substr(0, sql_fmt.length-2) + ' ';
    sql_fmt += 'from '+ info.tbl_name + ( info.tbl_name2 != null ? ( info.tbl_alias + ', ' + info.tbl_name2 + info.tbl_alias2 + ' '  ) : ' ' );
    sql_fmt += 'where ' +  ( info.tbl_name2 != null ? info.struct['is_del'].tbl : '' )  + info.struct['is_del'].key + ' = 0 '
        + ( info.tbl_name2 != null ? ( 'and ' + info.struct['is_del2'].tbl + info.struct['is_del2'].key + ' = 0 and ' + info.join_condition ) : ' ' );
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
    return this._get_detail_select_sql(info) + 'and ' +( info.tbl_name2 != null ? info.struct['is_del'].tbl:'' ) + info.struct['id'].key + '= "{id}" ';
}

// sql: get_update_info_sql 
exports._get_update_info_sql = function(info){
    return this._get_detail_select_sql(info) + 'and ' +( info.tbl_name2 != null ? info.struct['is_del'].tbl:'' ) + info.struct['id'].key + '= "{id}" ';
}

// sql: get_create_info_sql 
exports._get_create_info_sql = function(info){
    return this._get_detail_select_sql(info) + 'limit 0, 1 ';
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


// data: get_data
exports._get_detail_content = function(info, res){
    var data = [];
    var k=0;
    var i=0;
    for(var elem in info.struct){
        if(info.struct[elem].is_col==1 && (info.struct[elem].is_view==1 || info.struct[elem].is_detail==1 )){
            if(k==0){
               data[i] = [];
            }
            data[i][k++] = { key: info.struct[elem].key_text, type: info.struct[elem].key_type };
            data[i][k] = {
                key: ( info.struct[elem].value_type == 'number'
                             ? (res == null ? info.struct[elem].value_def : parseInt(res[info.struct[elem].key]))
                             : (res == null || info.struct[elem].is_col!=1 ? info.struct[elem].value_def : res[info.struct[elem].key]) ),
                type: info.struct[elem].value_type,
            };
            if(info.struct[elem].value_type == 'number'){
                data[i][k]['min'] = 0;
                data[i][k]['max'] = 100000000;
            }
            if((k%2)==1){
                data[i][k]['col_nm'] = info.struct[elem].key;
                tbl_const.copy_elem(data[i][k], info.struct[elem].op);
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

// data: get_detail_info
exports._get_detail = function(info, res){
    var data = {};
    data[info.struct['id'].key] = res[info.struct['id'].key];
    data['title'] = info.titles.detail;
    data['content'] = this._get_detail_content(info, res);
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
    data['content'] = this._get_detail_content(info, res);
    data['parent'] = {
    	url: info.url.list,
	    title: info.title,
    };
    return data;
}

// data: get_create_info
exports._get_create_info = function(info){
    var data = {};
    data[info.struct['id'].key] = null;
    data['title'] = info.titles.create;
    data['content'] = this._get_detail_content(info, null);
    data['parent'] = {
    	url: info.url.list,
	    title: info.title,
    };
    return data;
}



