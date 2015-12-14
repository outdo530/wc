#!/usr/bin/python


cfg = {
    "key_value":{ 
        "crt_dt" : "now()",
        "is_del" : "0",
		"upd_dt" : "now()",
	},
	"select":{
	},
	"update":{
	},
}



def get_value_from_cfg(key):
    if key in cfg["key_value"]:
        return cfg["key_value"][key]
    return "'{%s}'"% key
#end def


def is_create_tab(arr):
	if len(arr)  >= 3 and arr[0] == "create" and arr[1] == "table" : 
		return True
	#endif
	return False
#end def

def is_left_flag(arr):
	if len(arr) >= 1 and arr[0][0] == "(":
		return True
	#end if
	return False
#end def
def is_right_flag(arr):
	if len(arr) >= 1 and arr[0][0] == ")":
		return True
	#end if
	return False
#end def

def is_pk(arr):
	if len(arr) >= 3 and arr[0] == "primary" and arr[1] == "key":
		return True
	#end if
	return False
#end def

def gen_insert_sql(tab):
	str = ""
	for i in range(0, len(tab["cols"])):
		if tab["cols"][i]  != "upd_dt" and  tab["cols"][i] != tab["pk"]:
			str = str  + ( "%s = %s, " % (tab["cols"][i], get_value_from_cfg(tab["cols"][i])))
	#end for
	return "insert into %s set %s;" % (tab["tab_name"], str[0:-2])
#end def
def gen_update_sql(tab):
	str = ""
	for i in range(0, len(tab["cols"])):
		if tab["cols"][i] != tab["pk"] and tab["cols"][i] != "crt_dt" and tab["cols"][i] != "is_del":
			str = str  + ( "%s = %s, " % (tab["cols"][i], get_value_from_cfg(tab["cols"][i])))
	#end for
	return "update %s set %s where %s = %s and is_del = 0" % (tab["tab_name"], str[0:-2], tab["pk"], "'{%s}'" % tab["pk"])
#end def
def gen_delete_sql(tab):
	return "update %s set is_del = 1 where %s = '{%s}'" % (tab["tab_name"], tab["pk"], tab["pk"])
#end def
def gen_select_sql(tab):
	str = ""
	for i in range(1, len(tab["cols"])):
		if tab["cols"][i] != "is_del" and tab["cols"][i] != "crt_dt" and  tab["cols"][i] != "upd_dt" and tab["cols"][i] != "user_id":
			str = str  + ( "%s, " % tab["cols"][i])
	#end for
	return "select %s from %s where is_del = 0 limit {start}, {cnt}" % (str[0:-2], tab["tab_name"])
#end def
def gen_select_pk_sql(tab):
	str = ""
	for i in range(1, len(tab["cols"])):
		if tab["cols"][i] != "is_del" and tab["cols"][i] != "crt_dt" and  tab["cols"][i] != "upd_dt" and tab["cols"][i] != "user_id":
			str = str  + ( "%s, " % tab["cols"][i])
	#end for
	return "select %s from %s where %s = '{%s}' and is_del = 0" % ( str[0:-2], tab["tab_name"], tab["pk"], tab["pk"])
#end def

def gen_recover(tab):
	return "update %s set is_del = 0 where %s = '{%s}'" % (tab["tab_name"], tab["pk"], tab["pk"])

def gen_sql(tabs):
	for it in tabs:
		item = {}
		item["insert"] = gen_insert_sql(it)
		item["update"] = gen_update_sql(it)
		item["delete"] = gen_delete_sql(it)
		item["select"] = gen_select_sql(it)
		item["select_pk"] 	= gen_select_pk_sql(it)
		item["recover"] 	= gen_recover(it)
		it["sql"] = item
#end def	

def main(path):
	config = []
	f = open(path)
	lines = f.readlines();
	is_col_started = False
	for l in lines:
		#print l[0:-1]
		line = l.strip()
		if len(line) == 0:
			continue
		l_arr = line.split()
		if len(l_arr) == 0:
			continue
		if is_create_tab(l_arr):
			a_tab = {}
			a_tab["tab_name"] = l_arr[2]
			config.append(a_tab)
			is_col_started = False
		elif is_left_flag(l_arr):
			config[-1]["cols"] = []
			is_col_started = True
		elif is_right_flag(l_arr):	
			is_col_started = False
		elif is_pk(l_arr):
			config[-1]["pk"] = l_arr[2][1:-1]
		elif is_col_started == True:
			config[-1]["cols"].append(l_arr[0])
		else:
			pass
			#print l_arr
		#endif
	f.close()
	gen_sql(config)
	import json
	print json.dumps(config, sort_keys=True, indent=2)
#end def

if __name__ == "__main__":
	sql_file_path = "./qs_database.sql"
	main(sql_file_path)
	
