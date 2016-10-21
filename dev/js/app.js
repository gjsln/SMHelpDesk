angular.module('SMApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])

.controller('CollapseMenuCtrl',['$scope', '$log', function($scope,$log) {
	$scope.isTransCollapsed = true;
	$scope.isMasterCollapsed = true;
	$scope.isReportCollapsed = true;
}]);