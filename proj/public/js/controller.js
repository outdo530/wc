'use strict'
//#include models.js
var fn_pre = 'controller.js-->'


function __format_page_info(page){
    return String.format("第{0}页，共{1}页，{2}条/页", page.cur, page.total, page.size);
}



function __login_get_func_list($http, user_info, $location, cb ){
    cb($location);
}

myapp
.controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
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

}])//--.controller(loginCtrl

function __get_board($scope, $http){
    var req = {
        cmd : 'cmd_get_board',
        start : 0,
        cnt : 10000,
    }
    $http.post(base_url + "/dao_tbl_func", req)
    .success( function(data, status, headers, config){
        $scope.board = data.data;
        console.log(data.data);
    })
    .error( function(data, status, headers, config){
        console.log(String.format("status {0}, headers {1}, config {2}", status, headers, config));
        //TODO:direct to error page??????
    })
    ; //--$http
}

myapp.controller('boardCtrl', ['$scope', '$http', function($scope, $http){
    debug(fn_pre , "BoardCtrl--OK");
    __get_board($scope, $http);        
}])//--.controller(boardCtrl

function __get_list_search($scope, $http, cur, cb){
    var req = {
        cmd : 'cmd_search',
            page : {
                'cur' : cur,
            },
            search : $scope.search,
    }
    var search = $scope.search;
    $http.post(base_url + "/dao_tbl_area", req)
    .success( function(data, status, headers, config){
        $scope.cruds = data.data;
        $scope.page_str = __format_page_info($scope.cruds.page);
        $scope.search = search;
        console.log(data.data);
        if(cb != null) cb();
    })
    .error( function(data, status, headers, config){
        console.log(String.format("status {0}, headers {1}, config {2}", status, headers, config));
        //TODO:direct to error page??????
    })
    ; //--$http
}

function __get_list($scope, $http, cur, cb){
    var req = {
        cmd : 'cmd_list',
            page : {
                'cur' : cur,
            },
    }
    $http.post(base_url + "/dao_tbl_area", req)
    .success( function(data, status, headers, config){
        $scope.cruds = data.data;
        $scope.page_str = __format_page_info($scope.cruds.page);
        console.log(data.data);
        if(cb != null) cb();
    })
    .error( function(data, status, headers, config){
        console.log(String.format("status {0}, headers {1}, config {2}", status, headers, config));
        //TODO:direct to error page??????
    })
    ; //--$http
}

function __delete_seq_list(vid, $http){
    var req = {
        cmd : 'remove',
        id : vid,
    }
    $http.post(base_url + "/dao_tbl_area", req)
    .success( function(data, status, headers, config){
        if(data.result == 0){
            console.log("delete the seq OK");
        }
        else{
            //TODO: delete failed
            console.log("delete the seq failed");
        }
    })
    .error( function(data, status, headers, config){
        console.log(String.format("status {0}, headers {1}, config {2}", status, headers, config));
        //TODO:direct to error page??????
    })
    ; //--$http
}

myapp.controller('crudListCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    debug(fn_pre , "crudListCtrl--OK");
    debug_obj($routeParams);

    if("search" in $routeParams){
       $scope.search = $routeParams["search"] 
        __get_list_search($scope, $http, 1, function(){

            $scope.on_delete_seq = function(crud){
                debug(fn_pre , "delete the crud: " + crud.seq);
                alert(fn_pre + "delete the crud: " + crud.seq);
                __delete_seq_list(crud.seq, $http);
                //TODO: delete code with callback --> del $scope.cruds.seq == curd.seq
            }
            $scope.on_search = function(search){
                debug(fn_pre, "on search :" + search);
                if(search != undefined){
                    var dest_url = $scope.cruds.url.list + "/" + search;
                    debug(fn_pre, "dest_url : " + dest_url);
                    $location.path(dest_url);
                }else{
                    var dest_url = $scope.cruds.url.list;
                    debug(fn_pre, "dest_url : " + dest_url);
                    $location.path(dest_url);
                }
            }
            $scope.on_prepage = function(crud){
                if(crud.page.cur > 1){
                    crud.page.cur--;
                    //$scope.page_str = __format_page_info(crud.page);
                    //TODO: Refresh the cruds  -- req
                    __get_list_search($scope, $http, crud.page.cur, null);
                }
                else{
                    debug(fn_pre, "Reached the first page!");
                    alert("到达第一页了");
                }
            }
            $scope.on_nextpage = function(crud){
                if(crud.page.cur < crud.page.total){
                    crud.page.cur++;
                    //$scope.page_str = __format_page_info(crud.page);
                    //TODO: Refresh the cruds  -- req
                    __get_list_search($scope, $http, crud.page.cur, null);
                }
                else{
                    debug(fn_pre, "Reached the last page!");
                    alert("到达最后一页了");
                }
            }
        });
    }
    else{
        __get_list($scope, $http, 1, function(){

            $scope.on_delete_seq = function(crud){
                debug(fn_pre , "delete the crud: " + crud.seq);
                alert(fn_pre + "delete the crud: " + crud.seq);
                //TODO: delete code -- req
                __delete_seq_list(crud.seq, $http);
            }
            $scope.on_search = function(search){
                debug(fn_pre, "on search :" + search);
                if(search != undefined){
                    var dest_url = $scope.cruds.url.list + "/" + search;
                    debug(fn_pre, "dest_url : " + dest_url);
                    $location.path(dest_url);
                }else{
                    var dest_url = $scope.cruds.url.list;
                    debug(fn_pre, "dest_url : " + dest_url);
                    $location.path(dest_url);
                }
            }
            $scope.on_prepage = function(crud){
                if(crud.page.cur > 1){
                    crud.page.cur--;
                    //$scope.page_str = __format_page_info(crud.page);
                    //TODO: Refresh the cruds  -- req
                    __get_list($scope, $http, crud.page.cur, null);
                }
                else{
                    debug(fn_pre, "Reached the first page!");
                    alert("到达第一页了");
                }
            }
            $scope.on_nextpage = function(crud){
                if(crud.page.cur < crud.page.total){
                    crud.page.cur++;
                    //$scope.page_str = __format_page_info(crud.page);
                    //TODO: Refresh the cruds  -- req
                    __get_list($scope, $http, crud.page.cur, null);
                }
                else{
                    debug(fn_pre, "Reached the last page!");
                    alert("到达最后一页了");
                }
            }
        });
    }

}])//--.controller(crudListCtrl
;

function __get_detail($http, in_seq, cb){
    var req = {
        cmd : 'cmd_get_detail',
        id : in_seq
    }
    $http.post(base_url + "/dao_tbl_area", req)
    .success( function(data, status, headers, config){
        if(cb != null) cb(data);
    })
    .error( function(data, status, headers, config){
        console.log(String.format("status {0}, headers {1}, config {2}", status, headers, config));
        //TODO:direct to error page??????
    })
    ; //--$http
}

myapp.controller('crudDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    debug(fn_pre , "crudDetailCtrl--OK");

    //$scope.crud_detail = m_area_detail;
    var crud_id =  $routeParams["crud_id"];
    debug(fn_pre , "detail --> crud id is : " + crud_id);
    __get_detail($http, crud_id, function(rsp){
        //TODO: ???error check 
        $scope.crud_detail = rsp.data;
        console.log(rsp.data);
    });
}])//--.controller(crudDetailCtrl
;


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
//TODO:
function __update_commit($http, req_data, cb){
    var req = {
        cmd : 'update',
        data : req_data
    }
    $http.post(base_url + "/dao_tbl_area", req)
    .success( function(data, status, headers, config){
        if(cb != null) cb(data);
    })
    .error( function(data, status, headers, config){
        console.log(String.format("status {0}, headers {1}, config {2}", status, headers, config));
        //TODO:direct to error page??????
    })
    ; //--$http
}
myapp.controller('crudUpdateCtrl', ['$scope', '$routeParams', '$http', 
    function($scope, $routeParams, $http){
    debug(fn_pre , "crudUpdateCtrl--OK");

    var crud_id =  $routeParams["crud_id"];
    debug(fn_pre , "update-->crud id is : " + crud_id);
    __get_detail($http, crud_id, function(rsp){
        //TODO: ???error check 
        $scope.crud_update = rsp.data; 
        console.log(rsp.data);

        $scope.on_confirm = function(crud){
            debug(fn_pre, "on_confirm");
            //TODO:  commit ??????
            /*__update_commit($http, $scope.crud_update, function(rsp){
                alert("Update OK");
            });*/
        }
        $scope.on_cancel = function(crud){
             window.history.back();
        }
        $scope.on_reset = function(crud){
            __reset_input_box(crud.content);
        }
    });

}])//--.controller(crudUpdateCtrl
;

function __get_create_info($http, cb){
    var req = {
        cmd : 'cmd_get_create_info',
    }
    $http.post(base_url + "/dao_tbl_area", req)
    .success( function(data, status, headers, config){
        if(cb != null) cb(data);
    })
    .error( function(data, status, headers, config){
        console.log(String.format("status {0}, headers {1}, config {2}", status, headers, config));
        //TODO:direct to error page??????
    })
    ; //--$http
}

myapp.controller('crudCreateCtrl', ['$scope', '$http', function($scope, $http){
    debug(fn_pre , "crudCreateCtrl--OK");

    __get_create_info($http, function(rsp){
        $scope.crud_create = rsp.data;

        $scope.on_create = function(crud){
            debug(fn_pre, "on_confirm");
            //TODO: create confirm  -- req   
            
        }
        $scope.on_cancel = function(crud){
             window.history.back();
        }
        $scope.on_reset = function(crud){
            __reset_input_box(crud.content);
        }
    });
}])//--.controller(crudCreateCtrl

; //--controller.js
