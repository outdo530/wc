'use strict'


var is_mock_test_mode = false;  // test with models.js

// app cfg ====> 
//var base_url = "http://127.0.0.1:30000"
var base_url = ""

var fn_pre = 'myapp.js-->'

debug(fn_pre , " start");

var myapp = angular.module('myRouteApp',['ngRoute',])

debug(fn_pre , " end");

