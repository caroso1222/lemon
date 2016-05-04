var Category = require('../models/category');
var Requirement = require('../models/requirement');

var routes = function(app){
	app.get('/admin',function(req,res){
		res.render('pages/admin');
	});

	app.post('/requirement',function(req,res){
		console.log(req.body);
		var newReq = new Requirement(req.body);
		newReq.category = 1; //UX-UI
		newReq.save(function(err,obj){
			if(err) return console.log(err);
			console.log("added succesfully");
		});
		/*
		var cat = new Category({
			code:1,
			value:"UX/UI"
		});
		cat.save(function(err,obj){
			if(err) return console.log(err);
			console.log(obj);
		});*/
	});
}


module.exports = routes;