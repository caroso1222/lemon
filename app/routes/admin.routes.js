var Category = require('../models/category');
var Requirement = require('../models/requirement');
var Resource = require('../models/resource');

var routes = function(app){
	app.get('/admin',function(req,res){
		res.render('pages/admin');
	});

	app.post('/requirement',function(req,res){
		var newReq = new Requirement(req.body);
		newReq.category = 1; //UX-UI
		newReq.save(function(err,obj){
			if(err) return console.log(err);
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

	app.get('/requirements',function(req,res){
		Requirement.find(function(err,elems){
			if(err) return console.log(err);
			res.send(elems);
		});
	});

	app.post('/resource',function(req,res){
		console.log(req.body);
		var newResource = new Resource(req.body);
		newResource.wage = 0;
		newResource.save(function(err,obj){
			if(err) return console.log(err);
		});
	});

	app.get('/resources',function(req,res){
		Resource.find(function(err,elems){
			if(err) return console.log(err);
			res.send(elems);
		});
	});
}

module.exports = routes;