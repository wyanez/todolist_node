//Simple ToDoList App with NodeJS
//William Yanez - 24/12/2012
 
var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');


var appURL = 'http://localhost:8888';

//Variables para la conexion con MongoDB
var models = require('./models')
var mongoose = require('mongoose');
var toDo = mongoose.model('todo');


function list(request,response){
    console.log('[requestHandler] Action list was called.');
    
    toDo.find({}, function(err,todos) {
        if (err) return response.send(err);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1>ToDo List</h1>');
        response.write('<ul>');

        console.log(todos);
        todos.forEach(function(todo) {
            response.write('<li>' + todo.title + ' <a href="remove?id='+todo._id+'">remove</a></li>'); ;
        })
        print_form(response);
        response.end(); 
    });
}

function add(request,response){
	console.log('[requestHandler] Action add was called.');
    post_handler(request, function(request_data) {
        var todo = new toDo({
            title : request_data.note
        });

        todo.save(function(err){
            console.log("saving"+ request_data.note);
            if(!err){
                console.log('todoItem saved '+todo);
            }
        });
    });

	redirect_to('/list',response);
}

function remove(request,response){
	console.log('[requestHandler] Action remove was called.');

    parsedURL = url.parse(request.url, true);
    console.log('[requestHandler] _id to remove ' + parsedURL.query['id']);
    toDo.findOne({_id: parsedURL.query['id']},function(err,docs){
        console.log('[requestHandler] deleting' + docs); //Remove all the documents that match!
        docs.remove();
        docs.save();
        redirect_to('/list',response);
    });
}    

function redirect_to(action,response){
    //Redirecciono a list
    console.log('[requestHandler] Redirect to '+action);
    response.writeHead(301, {'Location':appURL + action, 'Expires': (new Date).toGMTString()});
    response.end();
}

function post_handler(request, callback){
    var _REQUEST = { };
    var _CONTENT = '';

    if (request.method == 'POST'){
        request.addListener('data', function(chunk)
        {
            _CONTENT+= chunk;
        });

        request.addListener('end', function()
        {
            _REQUEST = querystring.parse(_CONTENT);
            callback(_REQUEST);
        });
    }
}

function print_form(response){
    response.write("</p></p><form method='post' action='"+ appURL +"/add'>");
    response.write("<input type='text' name='note' placeholder='Type your ToDo'>");
    response.write("<input type='submit' value='Add'>");
    response.write("</form>");
}

exports.add = add;
exports.list = list;
exports.remove = remove;
