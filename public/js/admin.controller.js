var app = angular.module('app',[]);

app.controller('mainController',function($scope,$http){
	$('.modal-trigger').leanModal();
	$scope.requirement = {};
	$scope.requirements = {};
	$scope.resources = {};
	$scope.resource = {};

	$scope.addResource = function(){
		$http.post('/resource',$scope.resource);
		$scope.resource = {};
		updateResources();
	}
	$scope.addRequeriment = function(){
		$http.post('/requirement',$scope.requirement);
		$scope.requirement = {};
		updateRequirements();
	}
	function updateRequirements(){
		$http.get('/requirements').then(function(res){
			$scope.requirements = res.data;
		},function(err){
			console.log(err);
		});
	}
	function updateResources(){
		$http.get('/resources').then(function(res){
			$scope.resources = res.data;
		},function(err){
			console.log(err);
		});
	}
	updateRequirements();
	updateResources();
});