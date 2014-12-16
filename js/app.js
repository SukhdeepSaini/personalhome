
var myWeb = angular.module('myWebApp',['ngRoute']);

$(document).ready(function() {
    var colorOrig=$(".hovereffect").css('background-color');
    $(".hovereffect").hover(
    function() {
        //mouse over
        $(this).css('background', '#ff0')
    }, function() {
        //mouse out
        $(this).css('background', colorOrig)
    });
});


myWeb.config(['$routeProvider',function ($routeProvider){

	$routeProvider
		.when('/',
		{
			controller: 'NavbarController',
			templateUrl:'home.html'

		})
		.when('/profile',
		{
			controller: 'NavbarController',
			templateUrl:'profile.html'

		})
		.when('/profile/prototype1',
		{
			controller: 'NavbarController',
			templateUrl:'prototype1.html'

		})
		.when('/projects',
		{
			controller: 'ProjectsController',
			templateUrl:'projects.html'

		})
		.when('/contact',
		{
			controller: 'NavbarController',
			templateUrl:'contact.html'

		})
		.when('/recipes/:recipename',
		{
			controller: 'RecipeDetailCtrl',
			templateUrl:'recipedetails.html'

		})
        .when('/recipes',
        {
            controller: 'ProjectsController',
            templateUrl:'recipes.html'

        })
        .when('/Instafeed',
        {
            controller: 'InstaCtrl',
            templateUrl:'Instagram.html'

        })
		.otherwise({redirectTo:'/'});


}]);


