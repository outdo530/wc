'use strict'

var base_url = "http://192.168.163.128:3000";

console.log("main--start");

angular.module('myRouteApp',['ngRoute',])
.config( ['$routeProvider',
    function ($routeProvider){
        console.log("app_route.js->config->--OK");
        $routeProvider
            .when('/boards',  {
                templateUrl:'template/boards.html',
                controller: 'boardCtrl',
            })
            .when('/area_list', {
                templateUrl:'template/area_list.html',
                controller: 'areaListCtrl',
            })
            .when('/area_detail/:area_id', {
                templateUrl:'template/area_detail.html',
                controller: 'areaDetailCtrl',
            })
            .when('/area_update/:area_id', {
                templateUrl:'template/area_update.html',
                controller: 'areaUpdateCtrl',
            })
            .when('/area_create', {
                templateUrl:'template/area_create.html',
                controller: 'areaCreateCtrl',
            })
            .when('/area_search/:search', {
                templateUrl:'template/area_list.html',
                controller: 'areaSearchCtrl',
            })
            .otherwise({
                redirectTo:'/boards'
            })
        ;//--$routeProvider
    }
])
.controller('boardCtrl', ['$scope', '$http', function($scope, $http){
    console.log("BoardCtrl--OK");

    $scope.board = {
        title : "Panel",
        panels : [
            {
                title : "Area",
                contents : [
                    {href : "#/area_list",    item_name : "Area List"},
                    {href : "#/area_create",  item_name : "Area Create"},
                ],
            },
            {
                title : "Area",
                contents : [
                    {href : "#/area_list",    item_name : "Area List"},
                    {href : "#/area_create",  item_name : "Area Create"},
                ],
            },
            {
                title : "Area",
                contents : [
                    {href : "#/area_list",    item_name : "Area List"},
                    {href : "#/area_create",  item_name : "Area Create"},
                ],
            },
            {
                title : "Area",
                contents : [
                    {href : "#/area_list",    item_name : "Area List"},
                    {href : "#/area_create",  item_name : "Area Create"},
                ],
            },
            {
                title : "Area",
                contents : [
                    {href : "#/area_list",    item_name : "Area List"},
                    {href : "#/area_create",  item_name : "Area Create"},
                ],
            },
            {
                title : "Area",
                contents : [
                    {href : "#/area_list",    item_name : "Area List"},
                    {href : "#/area_create",  item_name : "Area Create"},
                ],
            },
        ],
    };

}])//--.controller(boardCtrl
.controller('areaListCtrl', ['$scope', '$http', function($scope, $http){
    console.log("areaListCtrl--OK");
    $scope.areas = {
        title : [  "#", "First Name",       "Last Name",         "UserName",     "Update?",    "Delete?", ],
        content:[
            { seq : 1, first_name : "Mark1", last_name : "Otto1", user_name : "mdo1", },
            { seq : 2, first_name : "Mark2", last_name : "Otto2", user_name : "mdo2", },
            { seq : 3, first_name : "Mark3", last_name : "Otto3", user_name : "mdo3", },
            { seq : 4, first_name : "Mark4", last_name : "Otto4", user_name : "mdo4", },
            { seq : 5, first_name : "Mark5", last_name : "Otto5", user_name : "mdo5", },
        ],
    };

    $scope.delete_seq = function(area){
        console.log("delete the area: " + area.seq);
        alert("delete the area: " + area.seq);
    }
}])//--.controller(areaListCtrl

.controller('areaSearchCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    console.log("areaSearchCtrl--OK");
    console.log("search it : ", $routeParams);

    $scope.areas = {
        title : [  "#", "First Name",       "Last Name",         "UserName",     "Update?",    "Delete?", ],
        content:[
            { seq : 1, first_name : "Mark1", last_name : "Otto1", user_name : "mdo1", },
    /*      { seq : 2, first_name : "Mark2", last_name : "Otto2", user_name : "mdo2", },
            { seq : 3, first_name : "Mark3", last_name : "Otto3", user_name : "mdo3", },
            { seq : 4, first_name : "Mark4", last_name : "Otto4", user_name : "mdo4", },
            { seq : 5, first_name : "Mark5", last_name : "Otto5", user_name : "mdo5", },*/
        ],
    };


    $scope.delete_seq = function(area){
        console.log("delete the area: " + area.seq);
        alert("delete the area: " + area.seq);
    }
}])//--.controller(areaSearchCtrl

.controller('areaDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    console.log("areaDetailCtrl--OK");

    var area_id =  $routeParams["area_id"];
    console.log("detail --> area id is : " + area_id);
    alert("detail --> area id is : " + area_id);

}])//--.controller(areaDetailCtrl


.controller('areaUpdateCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    console.log("areaUpdateCtrl--OK");

    var area_id =  $routeParams["area_id"];
    console.log("update-->area id is : " + area_id);
    alert("update-->area id is : " + area_id);

}])//--.controller(areaUpdateCtrl


.controller('areaCreateCtrl', ['$scope', '$http', function($scope, $http){
    console.log("areaCreateCtrl--OK");
}])//--.controller(areaCreateCtrl

; //--angular

console.log("main--end");
