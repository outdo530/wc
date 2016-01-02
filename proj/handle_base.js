var util = require("util");
var inherits = require("util").inherits;
var ErrorCode = require("./error_code");

function HandleBase(){
    this._tab = {}
}
HandleBase.prototype.call_it = function (req, resp, ctx){
    if(req.cmd != null){
        if(req.cmd in this._tab){
            if(false == this._tab[req.cmd].call(this, req, resp, ctx)){
                console.error("error: handle a cmd failed : " + req.cmd);
				return false;
            }
        }
        else{
            console.error("error: can not find the handle of the cmd :", req.cmd);
			this.easy_render_resp(ErrorCode.cmd_not_exist, "can not find the handle of the cmd  :" + req.cmd, ctx);
        }
    }
    else{
        this.easy_render_resp(ErrorCode.cmd_not_exist, "can not find key [cmd] in req", ctx);
    }
	return true;
}

HandleBase.prototype.handle = function(req, res, next){
    var resp = {}
    var ctx = {"hreq":req, "hres":res, "hnext":next};
    if(req != null && req.body != null && res != null){
        console.log("\n..... Request :", req.body); 
        resp["cmd"] = req.body.cmd + "_rsp";
        if(false == this.call_it(req.body, resp, ctx)){
			res.end();
		}
    }
    else{
        if(res != null){
            this.easy_render_resp( req  == null ? ErrorCode.req_null : ErrorCode.req_body_not_exist, "req or req.body of http client is null!", ctx);
        }
        else{
            console.error("handler: Big error: can not find the response of http client!");
        }
    }
}
HandleBase.prototype.easy_render_resp = function (ret, ret_str, ctx){
    this.render_resp({'result':ret, 'result_string':ret_str}, ctx);
}
HandleBase.prototype.render_resp = function (resp, ctx){
    if(resp != null && ctx.hres != null){
        ctx.hres.jsonp(resp);
		ctx.hres.end();
        console.log( "Response:", util.inspect(resp,{ depth: 3/*, colors: true*/}));
    }
    else if (resp == null){
        console.error("maybe code error, the response is not set!"); 
    }
    else{
        console.error("Big error: can not find the response of http client!");
    }
}

HandleBase.prototype.check_field = function (req, ctx, f_nm, exist, min_len, max_len){
    var hbo = this;
    if(req != null && ctx != null && f_nm != null){
        if(exist == true){
            var f_v = req[f_nm];
            if(f_v == null){
                this.easy_render_resp(ErrorCode.field_absent, "field must present : " + f_nm, ctx);
                return false;
            }
            var tp = typeof(f_v);
            if(tp == "string"){
                function check_len(len_f_v){
                    if(min_len != null){
                        if(len_f_v < min_len){
                            hbo.easy_render_resp(ErrorCode.field_too_short, "field length must >= min_len: " + f_nm, ctx);
                            return false;
                        }
                    }
                    if(max_len != null){
                        if(len_f_v > max_len){
                            hbo.easy_render_resp(ErrorCode.field_too_long, "field length must <= max_len: " + f_nm, ctx);
                            return false;
                        }
                    }
                    return true;
                }
                return check_len(f_v.length);
            }
            else if( tp == "number"){
                return check_len(f_v);
            }
            else{
                console.error("the field type is not number or string, field:" + f_nm)
                return false;
            }
        }
        return true;
    }
    console.error("req == null || ctx == null || f_nm == null");
    return false;
}
module.exports = HandleBase;
