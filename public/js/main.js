'use strict';
var app = angular.module('app',[]);

app.controller('mainController',function($scope){
	$scope.functionalities={};
	$scope.functionalities.items=[
	{'description':'Página de bienvenida', 'hours':10, 'selected':false},
	{'description':'Registro y Log-In con correo', 'hours':8, 'selected':false},
	{'description':'Registro y Log-In con Facebook', 'hours':15, 'selected':false}
	]; 
  
	$scope.totalHours = function(){
		var sum = 0; 
		$scope.functionalities.items.forEach(function(elem,idx,array){
			sum += elem.selected ? elem.hours : 0;
		});
		return sum;
	};
});