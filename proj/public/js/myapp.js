'use strict'


var is_mock_test_mode = false;  // test with models.js

// app cfg ====> 
var base_url = "http://192.168.0.101:30000"

var fn_pre = 'myapp.js-->'

debug(fn_pre , " start");

var myapp = angular.module('myRouteApp',['ngRoute',])

debug(fn_pre , " end");

