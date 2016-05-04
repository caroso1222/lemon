var Category = require('../models/category');
var Requirement = require('../models/requirement');

var routes = function(app){
	app.get('/',function(req,res){

		var req1 = new Requirement({
			category: 1,
			name: 'Integración con Facebook',
			design_hours: 4,
			front_hours: 5,
			back_hours: 6,
			integration_hours: 10
		});

		req1.save(function(err, carlos){
			if(err){
				return console.log(err);
			}
			console.log(carlos);
		});

		res.render('pages/index');
	});
}


module.exports = routes;

