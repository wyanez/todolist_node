var db = require('./db');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var toDoSchema = new Schema({
  title : String,
});

//mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name)
mongoose.connect('mongodb://' + db.host + ':' + db.port + '/' + db.name)
console.log('Conectandome a ' + 'mongodb://' + db.host + ':' + db.port + '/' + db.name);
//mongoose.connect('mongodb://127.0.0.1:27017/data');
mongoose.model('todo', toDoSchema);
