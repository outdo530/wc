'use strict'

var fn_pre = "route.js-->"
//#include models.js
debug(fn_pre , "start");

function init_m_route($routeProvider){
    var route = m_route;
    //debug(fn_pre , "route sub_func : ");
    for(var i in route.sub_func){
        // debug_obj(route.sub_func[i]);
        $routeProvider.when(route.sub_func[i].url,     {
            templateUrl: route.sub_func[i].templateUrl,   
            controller: route.sub_func[i].controller,
        });
    }
    //debug(fn_pre , "default, url : ", route.default_url);
    
    /*$routeProvider.when('/login', {
        templateUrl: 'template/login.html',
        controller: 'loginCtrl',
    });*/

    $routeProvider.otherwise({
        redirectTo: route.default_url
    });
}

myapp
.config( ['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider){
        debug(fn_pre , "config->--OK");
        init_m_route($routeProvider);
    }
])

; //--angular

debug(fn_pre , "end");
