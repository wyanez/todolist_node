var server = require('./server');
var router = require('./router');

var requestHandlers = require("./requestHandler");

var handle = {}
handle["/"] = requestHandlers.list;
handle["/list"] = requestHandlers.list;
handle["/add"] = requestHandlers.add;
handle["/remove"] = requestHandlers.remove;

server.start(router.route,handle);