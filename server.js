var config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Setting up database connection on mlab
console.log(config);
var mongoUri = 'mongodb://'+config.dbUser+':'+config.dbPassword+'@ds061777.mlab.com:61777/'+config.dbName;
var options = { server: { socketOptions: { keepAlive: 3000, connectTimeoutMS: 3000 } }, 
                replset: { socketOptions: { keepAlive: 3000, connectTimeoutMS : 3000 } } };


console.log(mongoUri);
mongoose.connect(mongoUri,options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));  
db.once('open', function() {
  // Wait for the database connection to establish, then start the app.     
  console.log("its ready db");
  var testSchema = mongoose.Schema({
  	name: String
  });
  testSchema.methods.speak = function(){
  	var greeting = this.name ? "My name is " + this.name : "I dont have a name";
  	console.log(greeting);
  }
  var MyModel = mongoose.model('MyModel',testSchema);
  var carlos = new MyModel({name:"Carlos"});
  console.log(carlos.name);
  carlos.speak();
  carlos.save(function(err, carlos){
  	if(err){
  		return console.log(err);
  	}
  	carlos.speak();
  });
  MyModel.find(function(err, docs){
  	if(err) return console.log(err);
  	console.log(docs); 
  });
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.render('pages/index');
});

app.listen(3000);
console.log("server running on port 3000");