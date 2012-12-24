var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

var appURL = 'http://localhost:8888';

function add(request,response){
	console.log('[requestHandler] Action add was called.');

	//Redirecciono a list
	response.writeHead(301, {'Location':appURL + '/list', 'Expires': (new Date).toGMTString()});
	response.end();
}

function list(request,response){
	console.log('[requestHandler] Action list was called.');
	
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('<h1>ToDo List</h1>');
	response.end();
}

function remove(request,response){
	console.log('[requestHandler] Action remove was called.');
    
    //Redirecciono a list
    response.writeHead(301, {'Location':appURL + '/list', 'Expires': (new Date).toGMTString()});
    response.end();
}    

exports.add = add;
exports.list = list;
exports.remove = remove;
