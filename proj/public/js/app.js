'use strict'

var base_url = "http://inchsky.gicp.net:3000"

angular.module('myApp',[])
.controller('PhoneListCtrl', ['$scope', '$http', function($scope, $http){
    var req = {
        cmd : 'aaa',
        data:$scope.age,
    }
    $http.post(base_url + "/handle_c", req)
    .success( function(data, status, headers, config){
        $scope.phones = data.phones;
    })
    .error( function(data, status, headers, config){
        console.log(String.format("status {0}, headers {1}, config {2}", status, headers, config));
    })
    ; //--$http

    $scope.orderProp = 'age';

}]);//--.controller(PhoneListCtrl
