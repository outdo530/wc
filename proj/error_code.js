var ErrorCode={
    OK:0,   
    
    /*  1000 ~ 1999 fatal error  */
    cmd_not_exist       : 1000,
    req_null            : 1001,
    req_body_not_exist  : 1002,
	cmd_not_implement	: 1003,

    /* 2000 ~ 2999 logical error */
    field_absent        : 2000,
    field_too_short     : 2001,
    field_too_long      : 2002,
    field_type_error    : 2003,

    /* 10000 ~ 10999  db error */
    db_ins_failed       : 10000,
    db_upd_failed       : 10001,
    db_del_failed       : 10002,
    db_sel_failed       : 10003,
}

module.exports =  ErrorCode
