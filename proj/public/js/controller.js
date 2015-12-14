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


myapp
.controller('boardCtrl', ['$scope', '$http', function($scope, $http){
    debug(fn_pre , "BoardCtrl--OK");

    $scope.board = m_board;

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
