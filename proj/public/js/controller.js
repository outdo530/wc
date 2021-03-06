/*
 * todo-list:
 * OK 2016.01.07 - 1. split the controls and functions
 * OK 2016.01.09 - 2. title navy :   create,detail,update -> add : parent_url = "#" + Tbl_area.url.list
 * OK 3. prompt some op-success msg after creating or updating data
 * OK 4. Error Page 
 * OK 5. dialog confirm
 * 6. Cookie login 
 * 7. change the seq to id in the tbl-area
 */
'use strict'
//#include models.js
var fn_pre = 'controller.js-->'


Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 
    "d+" : this.getDate(),                    
    "h+" : this.getHours(),                   
    "m+" : this.getMinutes(),                 
    "s+" : this.getSeconds(),                 
    "q+" : Math.floor((this.getMonth()+3)/3), 
    "S"  : this.getMilliseconds()             
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  
Date.prototype.toString = function(){
    return this.Format('yyyy-MM-dd hh:mm:ss')
}



function __format_page_info(page){
    //return String.format("第{0}页，共{1}页，{2}条/页", page.cur, page.total, page.size);
    return String.format("第{0}页，共{1}页", page.cur, page.total);
}
function __login_get_func_list($http, user_info, $location, cb ){
    cb($location);
}

function __error_info(prefix, rsp){
    //TODO: direct to error page 
    console.log("Error Info: ------------- start")
    console.log(prefix);
    console.log(rsp);
    alert('错误:' + rsp.result_string); //TODO: to a diaglog
    console.log("Error Info: ------------- end")
}

function __handle_date_modify(content){
    for( var i in content){
        for(var j in content[i]){
            if(content[i][j].type == "datetime-local"){
                content[i][j].key = new Date(content[i][j].key);
                //content[i][j].key = new Date('2015-02-19 13:44:34.103');
            }
        }
    }
}

function __http_req($http, sub_url, req, cb){
    $http.post(base_url + sub_url, req)
    .success( function(data, status, headers, config){
        if(data != null && data.result == 0){
            if(cb != null) cb(data);
        }
        else{
            __error_info('get result != 0:', data);
        }
    })
    .error( function(data, status, headers, config){
        __error_info('http get data error! \n' 
        + String.format("status {0}, headers {1}, config {2}", status, headers, config) + '\n',
        data);
    });
    ; //--$http
}

function ____get_list(sub_url, $scope, $http, cur, cb){
    var req = {
        cmd : 'cmd_list',
        page : {
            'cur' : cur,
        },
    }
    __http_req($http, sub_url, req
    , function(rsp){
        $scope.cruds = rsp.data;
        $scope.page_str = __format_page_info($scope.cruds.page);
        if(cb != null) cb(rsp.data);
    });
}
function ____get_list_search(sub_url, $scope, $http, cur, cb){
    var req = {
        cmd : 'cmd_search',
        page : {
            'cur' : cur,
        },
        search : $scope.search,
    }
    __http_req($http, sub_url, req
    , function(rsp){ 
        $scope.cruds = rsp.data;
        $scope.page_str = __format_page_info($scope.cruds.page);
        $scope.search = req.search;
        if(cb != null) cb(rsp.data);
    });
}
function ____delete_seq_list(sub_url, cruds, vid, $http){
    var req = {
        cmd : 'remove',
        id : vid,
    };
    __http_req($http, sub_url, req
    , function(rsp){
        console.log("delete the seq OK");
        for(var con in cruds.content){
            if( cruds.content[con].id = vid){
                cruds.content.splice(con, 1);
                break;
            }
        }
    });
}

function __reset_input_box(content){
    var content_len = content.length;
    for(var i = 0;  i < content_len; i++){
        var len = content[i].length;
        for(var v =0;  v < len; v++){
            var item = content[i][v];
            if(item.editable == 1){
                var tp = item.type;
                if(tp == "number"){
                    item.key = 0;
                }
                else if(tp == "text"){
                    item.key = "";
                }
                else if(tp == "datetime-local"){
                    item.key = new Date();
                }
                else if(tp == "label"){
                    // silence
                }
                else{
                    error(fn_pre, "ERROR:can not find the type of the input box!!!!, type:" + tp);
                }
            }
        }
    }
}

function __gen_req_from_info(op_cmd, crud){
    var req = {
        cmd : op_cmd,
    };
    for(var con in crud.content){
        for(var it in crud.content[con]){
            if(it % 2 != 0){
                var key = crud.content[con][it].col_nm;
                var val = crud.content[con][it].key;
                if(key != null){ 
                    req[key] = (typeof(val) != "undefined" && val != null) ? val.toString() : val;
                }
            }
        }
    }
    return req;
}

function __on_delete_seq(sub_url, cruds, crud, $http){
    debug(fn_pre , "delete the crud: " + crud.id);
    var ret = confirm('Are you sure to delete it!'); //TODO: to a diaglog
    if(ret)
        ____delete_seq_list(sub_url, cruds, crud.id, $http);
}
function __on_search($scope, $location, search){
    debug(fn_pre, "on search :" + search);
    if( typeof(search) != "undefined" && search != null){
        var dest_url = $scope.cruds.url.list.substr(1) + "/" + search;
        debug(fn_pre, "dest_url search: " + dest_url);
        $location.path(dest_url);
    }else{
        var dest_url = $scope.cruds.url.list.substr(1);
        debug(fn_pre, "dest_url list: " + dest_url);
        $location.path(dest_url);
    }
}

function __on_prepage(crud, sub_url, $scope, $http, cb_list_or_search, cruds, $location, set_cb_event){
    if(crud.page.cur > 1){
        crud.page.cur--;
        if(cb_list_or_search != null)
            cb_list_or_search(sub_url, $scope, $http, crud.page.cur, function(cruds){
                if(set_cb_event != null)
                    set_cb_event($scope, sub_url, cruds, $http, $location, cb_list_or_search);
            });
    }
    else{
        debug(fn_pre, "Reached the first page!");
        alert("到达第一页了");
    }
}
function __on_nextpage(crud, sub_url, $scope, $http, cb_list_or_search, cruds, $location, set_cb_event){
    if(crud.page.cur < crud.page.total){
        crud.page.cur++;
        if(cb_list_or_search != null)
            cb_list_or_search(sub_url, $scope, $http, crud.page.cur, function(cruds){
                if(set_cb_event != null)
                    set_cb_event($scope, sub_url, cruds, $http, $location, cb_list_or_search);
            });
    }
    else{
        debug(fn_pre, "Reached the last page!");
        alert("到达最后一页了");
    }
}


/*********** controls   start ********************************/

function ctrl_login($scope, $http, $location){
    debug(fn_pre , "loginCtrl--OK");
    $scope.login = {
        //TODO: get cookie
        show_if_error : false,
        err_msg : "Error User Name",
        user_nm : "Chenglun",
        password : "12345678",
    };

    $scope.on_login = function(login){
        __login_get_func_list($http, $scope.login, $location, function($location){
            //$scope.login.show_if_error = true;
            //$scope.login.err_msg = "login password error";
            var dest_url = "/boards"
            $location.path(dest_url);
            debug(fn_pre, "path dest_url : " + dest_url);
        });
    };
}//--.controller(loginCtrl
function ctrl_board($scope, $http){
    debug(fn_pre , "BoardCtrl--OK");
    __http_req($http, "/dao_tbl_func", {cmd:'cmd_get_board', start:0, cnt:10000}
    , function(rsp){
            $scope.board = rsp.data;
    });
}


function __on_search_or_list_it($scope, sub_url, cruds, $http, $location, cb_list_or_search){
    $scope.on_delete_seq = function(crud){
        __on_delete_seq(sub_url, cruds, crud, $http);
    }
    $scope.on_search = function(search){
        __on_search($scope, $location, search);
    }
    $scope.on_prepage = function(crud){
        __on_prepage(crud, sub_url, $scope, $http, cb_list_or_search, cruds, $location, __on_search_or_list_it);
    }
    $scope.on_nextpage = function(crud){
        __on_nextpage(crud, sub_url, $scope, $http, cb_list_or_search, cruds, $location, __on_search_or_list_it);
    }
}


function ctrl_list(sub_url, $scope, $http, $location, $routeParams){
    debug(fn_pre , "crudListCtrl--OK");
    debug_obj($routeParams);

    if("search" in $routeParams){
       $scope.search = $routeParams["search"] 
        ____get_list_search(sub_url, $scope, $http, 1, function(cruds){
            __on_search_or_list_it($scope, sub_url, cruds, $http, $location, ____get_list_search);
        });
    }
    else{
        ____get_list(sub_url, $scope, $http, 1, function(cruds){
            __on_search_or_list_it($scope, sub_url, cruds, $http, $location, ____get_list);
        });
    }
}

function ctrl_detail(sub_url, $scope, $routeParams, $http){
    debug(fn_pre , "crudDetailCtrl--OK");

    var crud_id =  $routeParams["crud_id"];
    debug(fn_pre , "detail --> crud id is : " + crud_id);

    var req = {
        cmd : 'cmd_get_detail',
        id :crud_id,
    };
    __http_req($http, sub_url, req
    , function(rsp){
        __handle_date_modify(rsp.data.content);
        $scope.crud_detail = rsp.data;
    });
}


function ctrl_update(sub_url, $scope, $routeParams, $http, ngDialog){
    debug(fn_pre , "crudUpdateCtrl--OK");

    var crud_id =  $routeParams["crud_id"];
    debug(fn_pre , "update-->crud id is : " + crud_id);

    var req = {
        cmd : 'cmd_get_update_info',
        id :crud_id,
    };
    __http_req($http, sub_url, req
    , function(rsp){
        $scope.crud_update = rsp.data; 
        $scope.on_confirm = function(crud){
            debug(fn_pre, "crudUpdateCtrl-on_confirm");
            __http_req($http, sub_url, __gen_req_from_info('update', crud)
            , function(rsp){
                console.log("update OK");
                alert("update OK!");
            });
        }
        $scope.on_cancel = function(crud){
             window.history.back();
        }
        $scope.on_reset = function(crud){
            __reset_input_box(crud.content);
        }
        $scope.click_to_open = function(crud, item){
            
            var req = { cmd : 'cmd_list',   page : {'cur' : 1,} };
            var sub_url = item.op_args.url;
            var ref_item = item;
            __http_req($http, sub_url, req
            , function(rsp){
                $scope.cruds = rsp.data;
                $scope.page_str = __format_page_info($scope.cruds.page);
                
                ngDialog.openConfirm(  { 
                        template: 'template/crud_select.html',
                        className : 'ngdialog-theme-default custom-width',
                        controller : 'dialog_ctrl',
                        scope : $scope,
                    }
                )
                .then(
                    function (val){
                        console.log("dialog --> confirm value : " + val);
                        if(val != null) 
                            ref_item.key = parseInt(val);
                        
                    },
                    function (reason){
                        console.log(" cancel reason : " + reason);
                    }
                );
            });//__http_req
        } // $scope.click_to_open
    });// __http_req
}

function ctrl_create(sub_url, $scope, $http, ngDialog){
    debug(fn_pre , "crudCreateCtrl--OK");
    var req = {
        cmd : 'cmd_get_create_info',
    }
    __http_req($http, sub_url, req
    , function(rsp){
        $scope.crud_create = rsp.data;
        $scope.on_create = function(crud){
            debug(fn_pre, "on_confirm");
            __http_req($http, sub_url, __gen_req_from_info('add', crud)
            , function(rsp){
                console.log("create OK");
                alert("create OK!");
            });
        }
        $scope.on_cancel = function(crud){
             window.history.back();
        }
        $scope.on_reset = function(crud){
            __reset_input_box(crud.content);
        }
        $scope.click_to_open = function(crud, item){
            var req = { cmd : 'cmd_list',   page : {'cur' : 1,} };
            var sub_url = item.op_args.url;
            var ref_item = item;
            __http_req($http, sub_url, req
            , function(rsp){
                $scope.cruds = rsp.data;
                $scope.page_str = __format_page_info($scope.cruds.page);
                ngDialog.openConfirm(  { 
                        template: 'template/crud_select.html',
                        className : 'ngdialog-theme-default custom-width',
                        controller : 'dialog_ctrl',
                        scope : $scope,
                    }
                )
                .then(
                    function (val){
                        console.log(" confirm value : " + val);
                        ref_item.key = parseInt(val);
                    },
                    function (reason){
                        console.log(" cancel reason : " + reason);
                    }
                );
            });//__http_req
    } // $scope.click_to_open
    });
}

function ctrl_select(sub_url, $scope, $http, $location, $routeParams){
    debug(fn_pre , "crudSelectCtrl--OK");
    debug_obj($routeParams);

    ____get_list(sub_url, $scope, $http, 1, function(cruds){
        //special for select_list_title 
        cruds.list_title = cruds.list_title.slice(0, cruds.list_title.length-2);

        $scope.on_delete_seq = function(crud){
            __on_delete_seq(sub_url, cruds, crud, $http);
        }
        $scope.on_search = function(search){
            ____get_list_search(sub_url, $scope, $http, 1, function(cruds){
                console.log("search hit && http get and ok log it");
            });
        }
        $scope.on_prepage = function(crud){
            __on_prepage(crud, sub_url, $scope, $http, ____get_list);
        }
        $scope.on_nextpage = function(crud){
            __on_nextpage(crud, sub_url, $scope, $http, ____get_list);
        }
    });
}


/*********** controls   end ********************************/
myapp.filter("filter_from_key", function(){
    return function (array_obj, key){
        if(key != null){
            var ret = new Array();
            for(var obj in array_obj){
                if(array_obj[obj].key.toString().indexOf(key) == 0){
                    ret.push(array_obj[obj]);
                }
            }
            return ret;
        }
        return array_obj;
    };
});


myapp.controller('loginCtrl', ['$scope', '$http', '$location', ctrl_login]);
myapp.controller('boardCtrl', ['$scope', '$http', ctrl_board]);



// area
myapp.controller('crudListCtrl_area', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_list("/dao_tbl_area", $scope, $http, $location, $routeParams);
}]);
myapp.controller('crudDetailCtrl_area', ['$scope', '$routeParams', '$http', 
function($scope, $routeParams, $http){
    ctrl_detail("/dao_tbl_area", $scope, $routeParams, $http);
}]);
myapp.controller('crudUpdateCtrl_area', ['$scope', '$routeParams', '$http', 'ngDialog', 
function($scope, $routeParams, $http, ngDialog){
     ctrl_update("/dao_tbl_area", $scope, $routeParams, $http, ngDialog);
}]);
myapp.controller('crudCreateCtrl_area', ['$scope', '$http', 'ngDialog',
function ($scope, $http, ngDialog){
    ctrl_create("/dao_tbl_area", $scope, $http, ngDialog);
}]);
myapp.controller('crudSelectCtrl_area', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select("/dao_tbl_area", $scope, $http, $location, $routeParams);
}]);

// customer
myapp.controller('crudListCtrl_customer', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_list("/dao_tbl_customer", $scope, $http, $location, $routeParams);
}]);
myapp.controller('crudDetailCtrl_customer', ['$scope', '$routeParams', '$http', 
function($scope, $routeParams, $http){
    ctrl_detail("/dao_tbl_customer", $scope, $routeParams, $http);
}]);
myapp.controller('crudUpdateCtrl_customer', ['$scope', '$routeParams', '$http', 'ngDialog', 
function($scope, $routeParams, $http, ngDialog){
     ctrl_update("/dao_tbl_customer", $scope, $routeParams, $http, ngDialog);
}]);
myapp.controller('crudCreateCtrl_customer', ['$scope', '$http', 'ngDialog',
function ($scope, $http, ngDialog){
    ctrl_create("/dao_tbl_customer", $scope, $http, ngDialog);
}]);
myapp.controller('crudSelectCtrl_customer', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select("/dao_tbl_customer", $scope, $http, $location, $routeParams);
}]);

// seller
myapp.controller('crudListCtrl_seller', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_list("/dao_tbl_seller", $scope, $http, $location, $routeParams);
}]);
myapp.controller('crudDetailCtrl_seller', ['$scope', '$routeParams', '$http', 
function($scope, $routeParams, $http){
    ctrl_detail("/dao_tbl_seller", $scope, $routeParams, $http);
}]);
myapp.controller('crudUpdateCtrl_seller', ['$scope', '$routeParams', '$http', 'ngDialog', 
function($scope, $routeParams, $http, ngDialog){
     ctrl_update("/dao_tbl_seller", $scope, $routeParams, $http, ngDialog);
}]);
myapp.controller('crudCreateCtrl_seller', ['$scope', '$http', 'ngDialog',
function ($scope, $http, ngDialog){
    ctrl_create("/dao_tbl_seller", $scope, $http, ngDialog);
}]);
myapp.controller('crudSelectCtrl_seller', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select("/dao_tbl_seller", $scope, $http, $location, $routeParams);
}]);

// buyer
myapp.controller('crudListCtrl_buyer', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_list("/dao_tbl_buyer", $scope, $http, $location, $routeParams);
}]);
myapp.controller('crudDetailCtrl_buyer', ['$scope', '$routeParams', '$http', 
function($scope, $routeParams, $http){
    ctrl_detail("/dao_tbl_buyer", $scope, $routeParams, $http);
}]);
myapp.controller('crudUpdateCtrl_buyer', ['$scope', '$routeParams', '$http', 'ngDialog', 
function($scope, $routeParams, $http, ngDialog){
     ctrl_update("/dao_tbl_buyer", $scope, $routeParams, $http, ngDialog);
}]);
myapp.controller('crudCreateCtrl_buyer', ['$scope', '$http', 'ngDialog',
function ($scope, $http, ngDialog){
    ctrl_create("/dao_tbl_buyer", $scope, $http, ngDialog);
}]);
myapp.controller('crudSelectCtrl_buyer', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select("/dao_tbl_buyer", $scope, $http, $location, $routeParams);
}]);

// lp
myapp.controller('crudListCtrl_lp', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_list("/dao_tbl_lp", $scope, $http, $location, $routeParams);
}]);
myapp.controller('crudDetailCtrl_lp', ['$scope', '$routeParams', '$http', 
function($scope, $routeParams, $http){
    ctrl_detail("/dao_tbl_lp", $scope, $routeParams, $http);
}]);
myapp.controller('crudUpdateCtrl_lp', ['$scope', '$routeParams', '$http', 'ngDialog', 
function($scope, $routeParams, $http, ngDialog){
     ctrl_update("/dao_tbl_lp", $scope, $routeParams, $http, ngDialog);
}]);
myapp.controller('crudCreateCtrl_lp', ['$scope', '$http', 'ngDialog',
function ($scope, $http, ngDialog){
    ctrl_create("/dao_tbl_lp", $scope, $http, ngDialog);
}]);
myapp.controller('crudSelectCtrl_lp', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select("/dao_tbl_lp", $scope, $http, $location, $routeParams);
}]);

// user
myapp.controller('crudListCtrl_user', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_list("/dao_tbl_user", $scope, $http, $location, $routeParams);
}]);
myapp.controller('crudDetailCtrl_user', ['$scope', '$routeParams', '$http', 
function($scope, $routeParams, $http){
    ctrl_detail("/dao_tbl_user", $scope, $routeParams, $http);
}]);
myapp.controller('crudUpdateCtrl_user', ['$scope', '$routeParams', '$http', 'ngDialog', 
function($scope, $routeParams, $http, ngDialog){
     ctrl_update("/dao_tbl_user", $scope, $routeParams, $http, ngDialog);
}]);
myapp.controller('crudCreateCtrl_user', ['$scope', '$http', 'ngDialog', 
function ($scope, $http, ngDialog){
    ctrl_create("/dao_tbl_user", $scope, $http, ngDialog);
}]);
myapp.controller('crudSelectCtrl_user', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select("/dao_tbl_user", $scope, $http, $location, $routeParams);
}]);

// dao_tbl_user__customer
myapp.controller('crudListCtrl_user_customer', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_list("/dao_tbl_user__customer", $scope, $http, $location, $routeParams);
}]);
myapp.controller('crudDetailCtrl_user_customer', ['$scope', '$routeParams', '$http', 
function($scope, $routeParams, $http){
    ctrl_detail("/dao_tbl_user__customer", $scope, $routeParams, $http);
}]);




myapp.controller('crudUpdateCtrl_user_customer', ['$scope', '$routeParams', '$http', 'ngDialog', 
function($scope, $routeParams, $http, ngDialog){
    // ctrl_update("/dao_tbl_user__customer", $scope, $routeParams, $http, ngDialog);
    var url = "/dao_tbl_user__customer"
    debug(fn_pre , "crudUpdateCtrl--OK");

    var crud_id =  $routeParams["crud_id"];
    debug(fn_pre , "update-->crud id is : " + crud_id);

    var req = {
        cmd : 'cmd_get_update_info',
        id :crud_id,
    };
    __http_req($http, url, req
    , function(rsp){
        var parent_url = url;

        __handle_date_modify(rsp.data.content);
        $scope.crud_update = rsp.data;

        $scope.on_confirm = function(crud){
            debug(fn_pre, "crudUpdateCtrl-on_confirm");
            __http_req($http, url, __gen_req_from_info('update', crud)
            , function(rsp){
                console.log("update OK");
                alert("update OK!");
            });
        }
        $scope.on_cancel = function(crud){
             window.history.back();
        }
        $scope.on_reset = function(crud){
            __reset_input_box(crud.content);
        }
        $scope.select_on_changed = function(crud, item){
            console.log("select_on_changed:");
            crud.content_detail = null;
            crud.content[1][1].key = null;
        }
        $scope.click_to_open = function(crud, item){
            
            var req = { cmd : 'cmd_list',   page : {'cur' : 1,} };
            //get the sub_url for  visit type ######
            var ref_obj = $scope.crud_update.content[0][3];
            var sub_url = ref_obj.op_args.items[ref_obj.key-1].url;
            $scope.sub_url = sub_url

            var ref_item = item;
            var parent_scope = $scope; //save the root scope to change detail
            __http_req($http, sub_url, req
            , function(rsp){
                $scope.cruds = rsp.data; //scope is the dialog info from backend
                $scope.page_str = __format_page_info($scope.cruds.page);
                var p_scope = parent_scope;
                ngDialog.openConfirm(  { 
                        template: 'template/crud_select.html',
                        className : 'ngdialog-theme-default custom-width',
                        controller : 'dialog_tbl_user__customer',
                        scope : $scope,
                    }
                )
                .then(
                    function (val){
                        console.log("dialog --> confirm value : " + val);
                        if(val != null) {
                            ref_item.key = parseInt(val);
                            //get the result
                            var req = {
                                cmd:'cmd_get_detail_info', 
                                visitor_type: ref_obj.key,
                                visitor_id: ref_item.key,
                            };
                            console.log("parent_url " + parent_url)
                            __http_req($http, parent_url, req, function(rsp){
                                p_scope.crud_update.content_detail = rsp.data.content_detail;
                            });
                        }
                    },
                    function (reason){
                        console.log(" cancel reason : " + reason);
                    }
                );
            });//__http_req
        } // $scope.click_to_open
    });// __http_req
}]);
myapp.controller('crudCreateCtrl_user_customer', ['$scope', '$http', 'ngDialog', 
function ($scope, $http, ngDialog){
    debug(fn_pre , "crudCreateCtrl--OK");

    var url = "/dao_tbl_user__customer";
    var req = {
        cmd : 'cmd_get_create_info',
    }
    __http_req($http, url, req
    , function(rsp){
        var parent_url = url;

        __handle_date_modify(rsp.data.content);
        $scope.crud_create = rsp.data;

        $scope.on_create = function(crud){
            debug(fn_pre, "on_confirm");
            __http_req($http, url, __gen_req_from_info('add', crud)
            , function(rsp){
                console.log("create OK");
                alert("create OK!");
            });
        }
        $scope.on_cancel = function(crud){
             window.history.back();
        }
        $scope.on_reset = function(crud){
            __reset_input_box(crud.content);
        }
        $scope.select_on_changed = function(crud, item){
            console.log("select_on_changed:");
            crud.content_detail = null;
            crud.content[1][1].key = null;
        }
        //console.log(new Date());
        $scope.click_to_open = function(crud, item){
            var req = { cmd : 'cmd_list',   page : {'cur' : 1,} };

            //get the sub_url from the ref item --- 
            var ref_obj = $scope.crud_create.content[0][3];
            var sub_url = ref_obj.op_args.items[ref_obj.key-1].url;
            $scope.sub_url = sub_url // save the sub_url for dialog_tbl_user_customer  to get the dialog select UI

            var ref_item = item;
            var parent_scope = $scope;
            __http_req($http, sub_url, req
            , function(rsp){
                $scope.cruds = rsp.data;
                $scope.page_str = __format_page_info($scope.cruds.page);
                ngDialog.openConfirm(  { 
                        template: 'template/crud_select.html',
                        className : 'ngdialog-theme-default custom-width',
                        controller : 'dialog_tbl_user__customer',
                        scope : $scope,
                    }
                )
                .then(
                    function (val){
                        console.log(" confirm value : " + val);
                        if(val != null) {
                            ref_item.key = parseInt(val);
                            //get the result
                            var req = {
                                cmd:'cmd_get_detail_info', 
                                visitor_type: ref_obj.key,
                                visitor_id: ref_item.key,
                            };
                            console.log("parent_url " + parent_url)
                            __http_req($http, parent_url, req, function(rsp){
                                parent_scope.crud_create.content_detail = rsp.data.content_detail;
                            });
                        }
                    },
                    function (reason){
                        console.log(" cancel reason : " + reason);
                    }
                );
            });//__http_req
    } // $scope.click_to_open
    });
}]);
myapp.controller('crudSelectCtrl_user_customer', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select("/dao_tbl_user__customer", $scope, $http, $location, $routeParams);
}]);
myapp.controller('dialog_tbl_user__customer', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select($scope.sub_url, $scope, $http, $location, $routeParams);
}]);


myapp.controller('dialog_ctrl', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select("/dao_tbl_customer", $scope, $http, $location, $routeParams);
}]);

