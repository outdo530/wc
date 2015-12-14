'use strict'

String.format = function() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for ( var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

function error(fn_pre, str){
    console.log(fn_pre + str);
}
function error_obj(obj){
   console.log(obj);
}
function debug(fn_pre, str ){
    console.log(fn_pre + str);
}
function debug_obj(obj){
   console.log(obj);
}
