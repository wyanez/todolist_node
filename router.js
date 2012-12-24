function route(handle,pathname,request,response){
	console.log("[router] Processing request for "+pathname);

	if (typeof handle[pathname] == 'function'){
		handle[pathname](request,response);
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
