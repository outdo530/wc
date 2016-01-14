/*
 * todo-list:
 * OK 2016.01.07 - 1. split the controls and functions
 * OK 2016.01.09 - 2. title navy :   create,detail,update -> add : parent_url = "#" + Tbl_area.url.list
 * 3. prompt some op-success msg after creating or updating data
 * 4. Error Page 
 * 5. dialog confirm
 * 6. Cookie login 
 * 7. change the seq to id in the tbl-area
 */
'use strict'
//#include models.js
var fn_pre = 'controller.js-->'


function __format_page_info(page){
    return String.format("第{0}页，共{1}页，{2}条/页", page.cur, page.total, page.size);
}
function __login_get_func_list($http, user_info, $location, cb ){
    cb($location);
}

function __error_info(prefix, rsp){
    //TODO: direct to error page 
    console.log("Error Info: ------------- start")
    console.log(prefix);
    console.log(rsp);
    console.log("Error Info: ------------- end")
}
function __http_req($http, sub_url, req, cb){
    $http.post(base_url + sub_url, req)
    .success( function(data, status, headers, config){
        if(data != null && data.result == 0)
            if(cb != null) cb(data);
        else{
            __error_info('get result != 0:', rsp);
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
        console.log(rsp.data);
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
        console.log(cruds);
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
            var tp = content[i][v].type;
            if(tp == "number"){
                content[i][v].key = 0;
            }
            else if(tp == "text"){
                content[i][v].key = "";
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

function __gen_req_from_info(op_cmd, crud){
    var req = {
        cmd : op_cmd,
    };
    for(var con in crud.content){
        for(var it in crud.content[con]){
            if(it % 2 != 0){
                var key = crud.content[con][it].col_nm;
                var val = crud.content[con][it].key;
                if(key != null) req[key] = val
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

function __on_prepage(crud, sub_url, $scope, $http, cb_list_or_search){
    if(crud.page.cur > 1){
        crud.page.cur--;
        if(cb_list_or_search != null)
            cb_list_or_search(sub_url, $scope, $http, crud.page.cur, null);
    }
    else{
        debug(fn_pre, "Reached the first page!");
        alert("到达第一页了");
    }
}
function __on_nextpage(crud, sub_url, $scope, $http, cb_list_or_search){
    if(crud.page.cur < crud.page.total){
        crud.page.cur++;
        if(cb_list_or_search != null)
            cb_list_or_search(sub_url, $scope, $http, crud.page.cur, null);
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
        __on_prepage(crud, sub_url, $scope, $http, cb_list_or_search);
    }
    $scope.on_nextpage = function(crud){
        __on_nextpage(crud, sub_url, $scope, $http, cb_list_or_search);
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
        console.log("chenglun");
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
        $scope.click_to_open = function(crud){
            var req = { cmd : 'cmd_list',   page : {'cur' : 1,} };
            var sub_url = '/dao_tbl_customer'
            __http_req($http, sub_url, req
            , function(rsp){
                $scope.cruds = rsp.data;
                $scope.page_str = __format_page_info($scope.cruds.page);
                ngDialog.openConfirm(  { 
                    template: 'template/crud_select.html',
                    scope : $scope,
                    }
                )
                .then(
                   function (val){
                    console.log(" confirm value : " + val);
                   },
                   function (reason){
                    console.log(" cancel reason : " + reason);
                   }
                );
            });//__http_req
    }
    });// __http_req
}

function ctrl_create(sub_url, $scope, $http){
    debug(fn_pre , "crudCreateCtrl--OK");
    var req = {
        cmd : 'cmd_get_create_info',
    }
    __http_req($http, sub_url, req
    , function(rsp){
        $scope.crud_create = rsp.data;
        console.log(rsp.data);
        $scope.on_create = function(crud){
            debug(fn_pre, "on_confirm");
            console.log(crud);
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
    });
}




function ctrl_select(sub_url, $scope, $http, $location, $routeParams){
    debug(fn_pre , "crudSelectCtrl--OK");
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


/*********** controls   end ********************************/
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
myapp.controller('crudCreateCtrl_area', ['$scope', '$http',
function ($scope, $http){
    ctrl_create("/dao_tbl_area", $scope, $http);
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
myapp.controller('crudCreateCtrl_customer', ['$scope', '$http',
function ($scope, $http){
    ctrl_create("/dao_tbl_customer", $scope, $http);
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
myapp.controller('crudCreateCtrl_seller', ['$scope', '$http',
function ($scope, $http){
    ctrl_create("/dao_tbl_seller", $scope, $http);
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
myapp.controller('crudCreateCtrl_buyer', ['$scope', '$http',
function ($scope, $http){
    ctrl_create("/dao_tbl_buyer", $scope, $http);
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
myapp.controller('crudCreateCtrl_lp', ['$scope', '$http',
function ($scope, $http){
    ctrl_create("/dao_tbl_lp", $scope, $http);
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
myapp.controller('crudCreateCtrl_user', ['$scope', '$http',
function ($scope, $http){
    ctrl_create("/dao_tbl_user", $scope, $http);
}]);
myapp.controller('crudSelectCtrl_user', ['$scope', '$http', '$location', '$routeParams',
function ($scope, $http, $location, $routeParams){
    ctrl_select("/dao_tbl_user", $scope, $http, $location, $routeParams);
}]);


