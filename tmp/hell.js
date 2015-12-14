var http=require("http");
var i = 0;
http.createServer(function(req, resp){
	console.log(req.url)
	resp.writeHead(200, {"Content-Type":"text/plain"});
	i = i+1;
	console.log("hello");
	resp.write("test" + i.toString());
	resp.end();
}).listen(8888);
