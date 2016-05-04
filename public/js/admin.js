var app = angular.module('app',[]);

app.controller('mainController',function($scope,$http){
	$('.modal-trigger').leanModal();
	$scope.requirement = {};
	$scope.addRequeriment = function(){
		console.log($scope.requirement);
		$http.post('/requirement',$scope.requirement);
		$scope.requirement = {};
	}
});