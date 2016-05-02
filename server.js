var config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Setting up database connection on mlab
var mongoose = require('mongoose');
var mongoUri = 'mongodb://'+config.dbUser+':'+config.dbPassword+'@ds061777.mlab.com:61777/'+config.dbName;
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };    
mongoose.connect(mongoUri,options);

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));  
conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.     
  console.log("its ready db");
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.render('pages/index');
});

app.listen(3000);
console.log("server running on port 3000");