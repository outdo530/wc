var util = require("util");


exports.yes_no = {
    items: [
        {key: 1, show_as: '是'},
        {key: 0, show_as: '否'},
    ],
}

exports.op_type_select = function(args){
    return  {
        editable:1,
        op_type: 'select',
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
