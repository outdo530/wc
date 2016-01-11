var mapping = [
];

function insert_mapping(url, path){
	var dao_obj = require(path);
    if(dao_obj == null){
        console.error(url.substr(1) + " object is null");
		return ;
    }   
	mapping[mapping.length] = {
		"url" 	: url,
		"cb" 	: dao_obj,
	}
}

insert_mapping("/handle_c", "./dao_obj/handle_c.js");

insert_mapping("/dao_tbl_user", "./dao_obj/dao_tbl_user.js");
insert_mapping("/dao_tbl_func", "./dao_obj/dao_tbl_func.js");
insert_mapping("/dao_tbl_area", "./dao_obj/dao_tbl_area.js");
insert_mapping("/dao_tbl_customer", "./dao_obj/dao_tbl_customer.js");
insert_mapping("/dao_tbl_buyer", "./dao_obj/dao_tbl_buyer.js");
insert_mapping("/dao_tbl_seller", "./dao_obj/dao_tbl_seller.js");
insert_mapping("/dao_tbl_lp", "./dao_obj/dao_tbl_lp.js");


console.log(mapping)
exports.Route = mapping
