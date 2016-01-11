var client = require('./client');
var test_util = require("./test_util");

var util = require("util");
var inherits = require("util").inherits;

var tbl = 'dao_tbl_user';

var host = "127.0.0.1";  // localhost
var port = 3000;
var url = "/" + tbl;

req = [
	// and route 
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },
	{cmd:'add', emp_no:'fn1', real_nm:'ln1', gender:'un1', email:'un1', mobile:'un1', fix_phone:'un1', id_card_no:'un1', enter_date:'un1', left_date:'un1', user_type:'un1', emp_no:'fn1', sign_id:'ln1', nick_nm:'un1', },

    // select
	{
		'cmd':'select',
		'start':0,
		'cnt':100,
	},
	
];


console.log('Starting test' + tbl);

var i = 0;

function test(){
	if( i < req.length ){

        req[i].emp_no = 'emp_no' + (i+1);
        req[i].real_nm = 'real_nm' + (i+1);
        req[i].gender =  (i+1);
        req[i].email = 'email' + (i+1);
        req[i].mobile = 'mobile' + (i+1);
        req[i].fix_phone = 'fix_phone' + (i+1);
        req[i].id_card_no = 'id_card_no' + (i+1);
        req[i].enter_date = 'enter_date' + (i+1);
        req[i].left_date = 'left_date' + (i+1);
        req[i].user_type =  (i+1);
        req[i].sign_id = 'sign_id' + (i+1);
        req[i].nick_nm = 'nick_nm' + (i+1);

	    client.call(host, port, url, req[i], function(res, msg){
			if(msg.obj != null &&  msg.obj.length > 0 )
			{
                if( i+1 < req.length ){
				    req[i+1].id = msg.obj[0].id;
                }
			}
			i++;
			test();
		});
	}
	else{
		console.log('End of test' + tbl);
	}
}

test();
