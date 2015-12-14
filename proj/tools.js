var util = require("util");

exports.format_object = function(str, obj){
    if( typeof(obj) == "object"){
        var reg = new RegExp("{([_a-z][_a-z0-9]*)}", "gi");
        str = str.replace(reg, 
            function(word){
                var str =   obj[word.slice(1,-1)];
                return str == null ? "" : str
                });
    }
    return str;
}

exports.format_object_array = function (fmt, obj_array){
    if(util.isArray(obj_array) == true){
        var str = "";
        for(var i in obj_array){
            str = str + exports.format_object(fmt, obj_array[i]);
        }
        return str
    }
}
