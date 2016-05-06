'use strict';
var app = angular.module('app',[]);

app.directive('format', function ($filter) {
	return {
		require: '?ngModel',
		link: function (scope, elem, attrs, ctrl) {
			if (!ctrl) {
				return;
			}

			ctrl.$formatters.unshift(function () {
				return $filter('number')(ctrl.$modelValue);
			});

			ctrl.$parsers.unshift(function (viewValue) {
				var plainNumber = viewValue.replace(/[\,\.]/g, ''),
				b = $filter('number')(plainNumber);

				elem.val(b);

				return plainNumber;
			});
		}
	};
});

app.controller('mainController',function($scope,$http){
	$scope.requirements=[];
	$scope.resources = [];
	$scope.totalHoursVal = 0;

	// $scope.resources.forEach(function(elem,idx,array){
	// 	//elem.hours = elem.time_percentage*$scope.totalHoursVal/100;
	// 	elem.hours = 10;
	// });

  
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
			$scope.resources = res.data;
			console.log($scope.resources);
		},function(err){
			console.log(err);
		});
	}

	$scope.calculateResourceHours = function(elem){
		elem.hours = elem.time_percentage*$scope.totalHoursVal/100;
		return elem.hours;
	}

	$scope.calculateResourceCosts = function(elem){
		elem.cost = elem.hours*elem.wage/160;
		return elem.cost;
	}

	$scope.totalHoursResource = function(){
		var sum = 0;
		$scope.resources.forEach(function(elem,idx,array){
			sum += elem.hours;
		});
		return sum.toFixed(2);
	}

	$scope.totalCostsResource = function(){
		var sum = 0;
		$scope.resources.forEach(function(elem,idx,array){
			sum += elem.cost;
		});
		return sum;
	}
	updateRequirements();
	updateResources();
});





