'use strict'

// route info model
var m_route = {
    default_url: '/login',
    sub_func: [
        {id: 0, url: '/login',                  templateUrl: 'template/login.html',         controller:'loginCtrl'      },
        {id: 1, url: '/boards',                 templateUrl: 'template/boards.html',        controller:'boardCtrl'      },
        // area
        {id: 2, url: '/area_list',              templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_area'   },
        {id: 3, url: '/area_detail/:crud_id',   templateUrl: 'template/crud_detail.html',   controller:'crudDetailCtrl_area' },
        {id: 4, url: '/area_update/:crud_id',   templateUrl: 'template/crud_update.html',   controller:'crudUpdateCtrl_area' },
        {id: 5, url: '/area_create',            templateUrl: 'template/crud_create.html',   controller:'crudCreateCtrl_area' },
        {id: 6, url: '/area_list/:search',      templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_area' },
        {id: 7, url: '/area_select',            templateUrl: 'template/crud_select.html',   controller:'crudSelectCtrl_area' },
        // customer
        {id: 8, url: '/customer_list',              templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_customer'   },
        {id: 9, url: '/customer_detail/:crud_id',   templateUrl: 'template/crud_detail.html',   controller:'crudDetailCtrl_customer' },
        {id: 10, url: '/customer_update/:crud_id',   templateUrl: 'template/crud_update.html',   controller:'crudUpdateCtrl_customer' },
        {id: 11, url: '/customer_create',            templateUrl: 'template/crud_create.html',   controller:'crudCreateCtrl_customer' },
        {id: 12, url: '/customer_list/:search',      templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_customer' },
        {id: 13, url: '/customer_select',            templateUrl: 'template/crud_select.html',   controller:'crudSelectCtrl_customer' },
	    // seller
        {id: 14, url: '/seller_list',              templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_seller'   },
        {id: 15, url: '/seller_detail/:crud_id',   templateUrl: 'template/crud_detail.html',   controller:'crudDetailCtrl_seller' },
        {id: 16, url: '/seller_update/:crud_id',   templateUrl: 'template/crud_update.html',   controller:'crudUpdateCtrl_seller' },
        {id: 17, url: '/seller_create',            templateUrl: 'template/crud_create.html',   controller:'crudCreateCtrl_seller' },
        {id: 18, url: '/seller_list/:search',      templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_seller' },
        {id: 19, url: '/seller_select',            templateUrl: 'template/crud_select.html',   controller:'crudSelectCtrl_seller' },
		// buyer
        {id: 20, url: '/buyer_list',              templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_buyer'   },
        {id: 21, url: '/buyer_detail/:crud_id',   templateUrl: 'template/crud_detail.html',   controller:'crudDetailCtrl_buyer' },
        {id: 22, url: '/buyer_update/:crud_id',   templateUrl: 'template/crud_update.html',   controller:'crudUpdateCtrl_buyer' },
        {id: 23, url: '/buyer_create',            templateUrl: 'template/crud_create.html',   controller:'crudCreateCtrl_buyer' },
        {id: 24, url: '/buyer_list/:search',      templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_buyer' },
        {id: 25, url: '/buyer_select',            templateUrl: 'template/crud_select.html',   controller:'crudSelectCtrl_buyer' },
		// lp
        {id: 26, url: '/lp_list',              templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_lp'   },
        {id: 27, url: '/lp_detail/:crud_id',   templateUrl: 'template/crud_detail.html',   controller:'crudDetailCtrl_lp' },
        {id: 28, url: '/lp_update/:crud_id',   templateUrl: 'template/crud_update.html',   controller:'crudUpdateCtrl_lp' },
        {id: 29, url: '/lp_create',            templateUrl: 'template/crud_create.html',   controller:'crudCreateCtrl_lp' },
        {id: 30, url: '/lp_list/:search',      templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_lp' },
        {id: 31, url: '/lp_select',            templateUrl: 'template/crud_select.html',   controller:'crudSelectCtrl_lp' },
		// user
        {id: 32, url: '/user_list',              templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_user'   },
        {id: 33, url: '/user_detail/:crud_id',   templateUrl: 'template/crud_detail.html',   controller:'crudDetailCtrl_user' },
        {id: 34, url: '/user_update/:crud_id',   templateUrl: 'template/crud_update.html',   controller:'crudUpdateCtrl_user' },
        {id: 35, url: '/user_create',            templateUrl: 'template/crud_create.html',   controller:'crudCreateCtrl_user' },
        {id: 36, url: '/user_list/:search',      templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_user' },
        {id: 37, url: '/user_select',            templateUrl: 'template/crud_select.html',   controller:'crudSelectCtrl_user' },

		//user__customer 
        {id: 38, url: '/user__customer_list',    templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_user_customer'   },
        {id: 39, url: '/user__customer_detail/:crud_id',   templateUrl: 'template/crud_detail.html',   controller:'crudDetailCtrl_user_customer' },
        {id: 40, url: '/user__customer_update/:crud_id',   templateUrl: 'template/crud_update.html',   controller:'crudUpdateCtrl_user_customer' },
        {id: 41, url: '/user__customer_create',            templateUrl: 'template/crud_create.html',   controller:'crudCreateCtrl_user_customer' },
        {id: 42, url: '/user__customer_list/:search',      templateUrl: 'template/crud_list.html',     controller:'crudListCtrl_user_customer' },
        {id: 43, url: '/user__customer_select',            templateUrl: 'template/crud_select.html',   controller:'crudSelectCtrl_user_customer' },
    ],
};

// board info model
var m_board = {
    title : "Panel",
    panels : [
        {
            title : "Area111111111",
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

//page size cfg for all app
var m_page_cfg = {
        size : 20,
};

// area list info model
var m_list_areas = {
    title : "Area",
    list_title : [  "#", "First Name",       "Last Name",         "UserName",     "Update?",    "Delete?", ],
    content:[
        { seq : 1, first_name : "Mark1", last_name : "Otto1", user_name : "mdo1", },
        { seq : 2, first_name : "Mark2", last_name : "Otto2", user_name : "mdo2", },
        { seq : 3, first_name : "Mark3", last_name : "Otto3", user_name : "mdo3", },
        { seq : 4, first_name : "Mark4", last_name : "Otto4", user_name : "mdo4", },
        { seq : 5, first_name : "Mark5", last_name : "Otto5", user_name : "mdo5", },
    ],
    page : {
        cur : 1,
        total : 10,
        size : m_page_cfg.size,
    },
    url:{
        list:   '/area_list',
        create: '#/area_create',
        update: '#/area_update',
        detail: '#/area_detail',
        select_seq: '#/area_select',
    },
};

//area search info model
var m_search_areas = {
    title : "Area",
    list_title : [  "#", "First Name",       "Last Name",         "UserName",     "Update?",    "Delete?", ],
    content:[
        { seq : 1, first_name : "Mark1", last_name : "Otto1", user_name : "mdo1", },
    ],
    page : {
        cur : 1,
        total : 10,
        size : m_page_cfg.size,
    },
    url:{
        list:   '/area_list',
        create: '#/area_create',
        update: '#/area_update',
        detail: '#/area_detail',
    },
};


var m_area_detail = {
    seq : 1,
    title : "detail",
    content : [
        [
            {key: "seq",        type : 'label'},         
            {key: 1,            type : 'number', min:0, max:100000000,    col_nm:"seq"},      
            {key: "First Name", type : 'label'},
            {key: 'Cheng',      type : "text",      col_nm:"first_name"},
        ],

        [
            {key: "Last Name",  type: 'label'},
            {key: "Lun",        type: 'text',       col_nm:"last_name"},
            {key: "User Name",  type: 'label'},
            {key: "haha",       type: 'text',       col_nm:"user_name"},
        ],
        [
            {key: "Update ?",   type: 'label'}, 
            {key: "OK?",        type: 'text'},
            {key: "Delete ?",   type: 'label'},
            {key: "No?",        type: 'text'},
        ],
    ]
};

var m_area_update = {
    seq : 1,
    title : "Area Update",
    content : [
        [
            {key: "seq",        type : 'label'},         
            {key: 1,            type : 'number', min:0, max:100000000, col_nm:"seq",},
            {key: "First Name", type : 'label'},
            {key: 'Cheng',      type : "text",  col_nm:"first_name"},
        ],

        [
            {key: "Last Name",  type: 'label'},
            {key: "Lun",        type: 'text', col_nm:"last_name"},
            {key: "User Name",  type: 'label'},
            {key: "haha",       type: 'text', col_nm:"user_name"},
        ],
        [
            {key: "Update ?",   type: 'label'}, 
            {key: "OK?",        type: 'text'},
            {key: "Delete ?",   type: 'label'},
            {key: "No?",        type: 'text'},
        ],
    ]
};

var m_area_create = {
    seq : 1,
    title : "Area Create",
    content : [
        [
            {key: "seq",        type : 'label'},         
            {key: "",           type : 'number', min:0, max:100000000, col_nm:"seq", select_url:'#/area_select'},      
            {key: "First Name", type : 'label'},
            {key: "",           type : "text",  col_nm:"first_name"},
        ],

        [
            {key: "Last Name",  type: 'label'},
            {key: "",           type: 'text', col_nm:"last_name"},
            {key: "User Name",  type: 'label'},
            {key: "",           type: 'text', col_nm:"user_name"},
        ],
        [
            {key: "Update ?",   type: 'label'}, 
            {key: "",           type: 'text'},
            {key: "Delete ?",   type: 'label'},
            {key: "",           type: 'text'},
        ],
    ]
};
