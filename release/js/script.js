angular.module('SMApp', 
	['ui.router',
	 'ngAnimate',
	 'ngSanitize',
	 'ui.bootstrap'])

.config(function($stateProvider) {
  var cityState = {
    name: 'cityMaster',
    url: '/cityMaster',
    template: '<h3>City Master</h3>'
  };
  
  var branchState = {
    name: 'branchMaster',
    url: '/branchMaster',
    template: '<h3>Branch Master</h3>'
  };
  
  $stateProvider.state(cityState);
  $stateProvider.state(branchState);
})

.controller('CollapseMenuCtrl',['$scope', '$log', function($scope,$log) {
	/*$scope.isTransCollapsed = true;
	$scope.isMasterCollapsed = true;
	$scope.isReportCollapsed = true;*/
}]);

var jQ = jQuery.noConflict();

var SMApp = SMApp || {};

(function(SMApp){

})(SMApp);