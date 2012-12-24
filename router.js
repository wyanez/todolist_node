function route(handle,pathname,response,request){
	console.log("[router] Processing request for "+pathname);

	if (typeof handle[pathname] == 'function'){
		handle[pathname](response,request);
	}
	else{
		var msg = "[router] Error: No request handler found for "+pathname;
		console.log(msg);
		response.writeHead(404,{"Content-type": "text/html"});
		response.write("404 Not Found: "+msg);
		response.end();
	}
}

exports.route = route;
