'use strict'

var fn_pre = "route.js-->"
//#include models.js
debug(fn_pre , "start");

myapp
.config( ['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider){
        debug(fn_pre , "config->--OK");

        var route = m_route;

        debug(fn_pre , "route sub_func : ");
        for(var i in route.sub_func){
            debug_obj(route.sub_func[i]);
            $routeProvider.when(route.sub_func[i].url,     {
                templateUrl: route.sub_func[i].templateUrl,   
                controller: route.sub_func[i].controller,
            });
        }
        
        debug(fn_pre , "default, url : ", route.default_url);
        $routeProvider.otherwise({
            redirectTo: route.default_url
        });
    }
])

; //--angular

debug(fn_pre , "end");
