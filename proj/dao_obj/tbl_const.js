var util = require("util");

exports.gender = {
    items: [
        {key: 1, show_as: '男'},
        {key: 2, show_as: '女'},
        {key: 0, show_as: '未知'},
    ],
};

exports.yes_no = {
    items: [
        {key: 0, show_as: '否'},
        {key: 1, show_as: '是'},
    ],
};

exports.ship_class_1 = {
    items: [
        {key: 1, show_as: '银行'},
        {key: 2, show_as: '资产管理公司'},
        {key: 3, show_as: '租赁公司'},
        {key: 4, show_as: '其他'},
    ],
};

exports.ship_class_2 = {
    filter_ref_xy: {x: 1, y: 3},
    items: [
        {key: 1001, show_as: '四大国有银行'},
        {key: 1002, show_as: '股份制商业银行'},
        {key: 1003, show_as: '地方性银行'},
        {key: 1004, show_as: '民营银行'},
        {key: 2001, show_as: '信达资管'},
        {key: 2002, show_as: '华融资管'},
        {key: 2003, show_as: '长城资管'},
        {key: 2004, show_as: '东方资管'},
        {key: 3001, show_as: '银监会所属租赁公司'},
        {key: 3002, show_as: '非银监会所属租赁公司'},
        {key: 4001, show_as: '其他'},
     ],
};



exports.lp_type = {
    items: [
        {key: 1, show_as: 'p2p'},
        {key: 2, show_as: '行业内高净值人群'},
        {key: 3, show_as: '私人银行'},
        {key: 4, show_as: '境外资金'},
    ],
};

exports.visitor_type = {
    items: [
        {key: 1, show_as: '买方', url: 'dao_tbl_buyer'},
        {key: 2, show_as: '卖方', url: 'dao_tbl_seller'},
        {key: 3, show_as: 'LP', url: 'dao_tbl_lp'},
        {key: 4, show_as: '客户', url: 'dao_tbl_customer'},
    ],
};

exports.value_instead = function(args){
    var vins = '';
    for(var i=0; i< args.items.length; i++){
        vins += ' when ' + args.items[i].key + ' then "' + args.items[i].show_as + '" ';
    }
    //vins += ' else "' + args.items[args.items.length-1].show_as + '" end ';
    vins += ' end ';
    return vins;
};

exports.op_type_select = function(args){
    return  {
        editable:1,
        op_type: 'select',
        op_args: args ,
    };
}

exports.show_type_select = function(args){
    return  {
        op_type: 'show_select',
        op_args: args ,
    };
}

exports.op_type_dialog = function(abs_url){
    return {
        editable:1,
        op_type: 'dialog',
        op_args: {url:abs_url},
    };
}

exports.op_type_text = function(){
    return {
        editable:1,
    };
}

exports.op_type_text_span = function(_cols){
    return {
        editable:1,
        cols:_cols,
    };
}

exports.op_type_text_area = function(){
    return {
        editable:1,
        multi_line:1,
    };
}

exports.copy_elem = function(_dest, _src){
    for( var elem in _src ){
        _dest[elem] = _src[elem];
    }
}
