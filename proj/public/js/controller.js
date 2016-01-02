'use strict'
//#include models.js
var fn_pre = 'controller.js-->'


function __format_page_info(page){
    return String.format("第{0}页，共{1}页，{2}条/页", page.cur, page.total, page.size);
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
            else{
                error(fn_pre, "ERROR:can not find the type of the input box!!!!, type:" + tp);
            }
        }
    }
}


function __login_get_func_list($http, user_info, $location, cb ){
    if(is_mock_test_mode  == false){
        console.log(" login http request!");
    }
    else{
    }
    cb($location);
}

myapp
.controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
    debug(fn_pre , "loginCtrl--OK");

    if(is_mock_test_mode  == false){
        $scope.login = {
            //TODO: get cookie
            err_msg : "Error User Name",
            user_nm : "Chenglun",
            password : "12345678",
        }

        $scope.on_login = function(login){
            __login_get_func_list($http, $scope.login, $location, function($location){
                var dest_url = "/boards"
                $location.path(dest_url);
                debug(fn_pre, "path dest_url : " + dest_url);
            });
        }
    }
    else{
        $scope.login = {
            err_msg : "Error User Name",
            user_nm : "Chenglun",
            password : "12345678",
        }
        $scope.on_login = function(login){
            var dest_url = "/boards"
            $location.path(dest_url);
            debug(fn_pre, "path dest_url : " + dest_url);
        }
    }

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

myapp
.controller('boardCtrl', ['$scope', '$http', function($scope, $http){
    debug(fn_pre , "BoardCtrl--OK");

    if(is_mock_test_mode  == false){
        __get_board($scope, $http);        
    }
    else{
        $scope.board = m_board;
    }
    

}])//--.controller(boardCtrl
.controller('crudListCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    debug(fn_pre , "crudListCtrl--OK");
    debug_obj($routeParams);

    if("search" in $routeParams){
        $scope.cruds = m_search_areas;
    }
    else{
        $scope.cruds = m_list_areas;
    }

    $scope.page_str = __format_page_info($scope.cruds.page);
    $scope.on_delete_seq = function(crud){
        debug(fn_pre , "delete the crud: " + crud.seq);
        alert(fn_pre + "delete the crud: " + crud.seq);
        //TODO: delete code -- req
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
            $scope.page_str = __format_page_info(crud.page);
            //TODO: Refresh the cruds  -- req
        }
        else{
            debug(fn_pre, "Reached the first page!");
            alert("到达第一页了");
        }
    }
    $scope.on_nextpage = function(crud){
        if(crud.page.cur < crud.page.total){
            crud.page.cur++;
            $scope.page_str = __format_page_info(crud.page);
            //TODO: Refresh the cruds  -- req
        }
        else{
            debug(fn_pre, "Reached the last page!");
            alert("到达最后一页了");
        }
    }
}])//--.controller(crudListCtrl

.controller('crudDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    debug(fn_pre , "crudDetailCtrl--OK");

    $scope.crud_detail = m_area_detail;
    var crud_id =  $routeParams["crud_id"];
    debug(fn_pre , "detail --> crud id is : " + crud_id);

    //TODO: detail return -- req

}])//--.controller(crudDetailCtrl


.controller('crudUpdateCtrl', ['$scope', '$routeParams', '$http', 
    function($scope, $routeParams, $http){
    debug(fn_pre , "crudUpdateCtrl--OK");

    $scope.crud_update = m_area_update;

    var crud_id =  $routeParams["crud_id"];
    debug(fn_pre , "update-->crud id is : " + crud_id);

    $scope.on_confirm = function(crud){
        debug(fn_pre, "on_confirm");
        //TODO: update confirm  -- req
    }
    $scope.on_cancel = function(crud){
         window.history.back();
    }
    $scope.on_reset = function(crud){
        __reset_input_box(crud.content);
    }

}])//--.controller(crudUpdateCtrl


.controller('crudCreateCtrl', ['$scope', '$http', function($scope, $http){
    debug(fn_pre , "crudCreateCtrl--OK");
    $scope.crud_create = m_area_create;
    $scope.on_confirm = function(crud){
        debug(fn_pre, "on_confirm");
        //TODO: create confirm  -- req
    }
    $scope.on_cancel = function(crud){
         window.history.back();
    }
    $scope.on_reset = function(crud){
        __reset_input_box(crud.content);
    }
}])//--.controller(crudCreateCtrl

; //--controller.js
