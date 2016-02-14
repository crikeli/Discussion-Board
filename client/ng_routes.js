//AngularMoment is a module for handling time.
var Discussion_Board = angular.module('Discussion_Board', ['ngRoute']);


//This is where the routes are set up.

Discussion_Board.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/login.html'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html'
	})
	.when('/topic/:id',{
		templateUrl: 'partials/topic.html'
	})
	.when('/user/:id', {
		templateUrl: 'partials/user.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

