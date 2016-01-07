'use strict'

// route info model
var m_route = {
    default_url: '/login',
    sub_func: [
        {id: 0, url: '/login',                  templateUrl: 'template/login.html',         controller:'loginCtrl'      },
        {id: 1, url: '/boards',                 templateUrl: 'template/boards.html',        controller:'boardCtrl'      },
        {id: 2, url: '/area_list',              templateUrl: 'template/crud_list.html',     controller:'crudListCtrl'   },
        {id: 3, url: '/area_detail/:crud_id',   templateUrl: 'template/crud_detail.html',   controller:'crudDetailCtrl' },
        {id: 4, url: '/area_update/:crud_id',   templateUrl: 'template/crud_update.html',   controller:'crudUpdateCtrl' },
        {id: 5, url: '/area_create',            templateUrl: 'template/crud_create.html',   controller:'crudCreateCtrl' },
        {id: 6, url: '/area_list/:search',      templateUrl: 'template/crud_list.html',   controller:'crudListCtrl' },
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
            {key: 1,            type : 'number', min:0, max:100000000, col_nm:"seq"},
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
            {key: "",           type : 'number', min:0, max:100000000, col_nm:"seq"},      
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
