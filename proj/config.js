var  bae_cfg = {
    database: {
        host : 'sqld.duapp.com',
        port : 4050,
        user : '9d8zbCPF1BgurkxQLHQ7cruS',
        password : 'GcjtPCIoGF3q20tz8OlPNZGZ6HtGwRc8',
        database : 'QsdfflYxnLYrudOmcNDx',
        multipleStatements: true,
    },
    server : {
        ip : '127.0.0.1',
        port :18080,
    },
    print_req_debug_info : false,
}

var cfg = {
    database: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : 'ccelee',
        database : 'wc',
        multipleStatements: true,
    },
    server : {
        ip : '127.0.0.1',
        port :3000,
    },
    print_req_debug_info : false,
}

var is_local_deploy = true
module.exports = is_local_deploy ? cfg : bae_cfg
