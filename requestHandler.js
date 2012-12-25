var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

var appURL = 'http://localhost:8888';

function list(request,response){
    console.log('[requestHandler] Action list was called.');
    
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h1>ToDo List</h1>');
    response.end();
}

function add(request,response){
	console.log('[requestHandler] Action add was called.');
	redirect_to('/list',response);
}

function remove(request,response){
	console.log('[requestHandler] Action remove was called.');
    redirect_to('/list',response);
}    

function redirect_to(action,response){
    //Redirecciono a list
    console.log('[requestHandler] Redirect to '+action);
    response.writeHead(301, {'Location':appURL + action, 'Expires': (new Date).toGMTString()});
    response.end();
}

exports.add = add;
exports.list = list;
exports.remove = remove;
