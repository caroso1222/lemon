'use strict';
var app = angular.module('app',[]);

app.controller('mainController',function($scope,$http){
	$scope.requirements=[];
	$scope.resources = [];
	$scope.totalHoursVal = 0;
  
	$scope.totalHours = function(){
		var sum = 0; 
		$scope.requirements.forEach(function(elem,idx,array){
			sum += elem.selected ? elem.design_hours + elem.frontend_hours + elem.backend_hours + elem.integration_hours: 0;
		});
		$scope.totalHoursVal = sum;
		return sum;
	};

	function updateRequirements(){
		$http.get('/requirements').then(function(res){
			$scope.requirements = res.data;
			$scope.requirements.forEach(function(elem,idx,array){
				elem.selected = false;
			});
		},function(err){
			console.log(err);
		});
	}
	function updateResources(){
		$http.get('/resources').then(function(res){
			res.data.time_percentage = parseInt(res.data.time_percentage);
			$scope.resources = res.data;
		},function(err){
			console.log(err);
		});
	}
	updateRequirements();
	updateResources();
});