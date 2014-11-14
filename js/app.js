
var myWeb = angular.module('myWebApp',['ngRoute']);


myWeb.controller('NavbarController',function($scope){

	$scope.navbar = [

	{'name':'Profile', 'url':'#/profile'},
	{'name':'Projects', 'url':'#/projects'},
	{'name':'Contact', 'url':'#/contact'}
	];

	$scope.websiteHeader = "Sukhdeep Singh Saini";
	$scope.websiteTitle = "Software Developer";

});

myWeb.controller('ProjectsController',function($scope,$http){

    $scope.projectHeader = "Projects";

    $scope.GetRecipeData = function()
    {
        var searhCriteria = $("#recipeSeachText").val();
        if(searhCriteria == "")
        {
            return; //Provide a better error alert
        }
    	var parameterizedQuery = 'http://api.yummly.com/v1/api/recipes?_app_id=222e8fca&_app_key=9e9a3459d35a5b4918595200eb4f7d4b&q='+ searhCriteria +'&requirePictures=true'
    	$http.get(parameterizedQuery).success(function(data,status, headers, config){

    		$scope.queryResult = data;
    		console.log(data);
    		var recipeIds = new Array();
    		var recipeNames = new Array();
    		var jsonData = {};
    		for(i = 0 ; i < 10 ; i++)
    		{	
    			recipeIds[i] = data.matches[i].id;  // Get the Recipe ID's To Get Full details later on to call the service further
    			recipeNames[i] = data.matches[i].recipeName; // Get the Recipe Name
    		}
    		//ProcessRecipes(recipeIds);
    		$scope.recipeIds = recipeIds;
    		$scope.recipeNames = recipeNames;

            $('#filterRecipes').prop('disabled', false);

    	});
    };

});


myWeb.controller('RecipeDetailCtrl',function($scope, $routeParams,$http) {
	console.log("check");
    $scope.recipename = $routeParams.recipename; //need to modify recipe name to recipe ID
    var recipeIdName = $scope.recipename;
    var recipeID = recipeIdName.substring(recipeIdName.length-6);
    var updatedName = recipeIdName.substring(0,recipeIdName.length-7);
    $scope.updatedRecipeName = updatedName;
    console.log(recipeID,updatedName);

    var recipdedetailUrl = 'http://api.yummly.com/v1/api/recipe/' + recipeIdName + '?_app_id=222e8fca&_app_key=9e9a3459d35a5b4918595200eb4f7d4b';
    $http.get(recipdedetailUrl).success(function(data,status, headers, config){
    	var ingredients = data.ingredientLines;
    	$scope.ingredients = ingredients; //ingredients contains duplicates , use track by $index in ng-repeat to avoid error
    	$scope.recipeLargeImage = data.images[0].hostedLargeUrl;
    	$scope.rating = data.rating;
    	$scope.prepratationTime = data.totalTime;
    	$scope.course = data.attributes.course[0];
    	console.log(data.images[0].hostedLargeUrl);
    	console.log(ingredients);  //Ingredients information
    	console.log(data);  // All Data

    	//window.history.back saves the history information about the previous page and 
    	//user can navigate to previous page using this
    	$scope.navigateBack = function(){

    		window.history.back();  //not working for me , the data is not showing
    	}


    	/*
    	<a href='http://www.yummly.com/recipe/Chicken-Caesar-Pita-548482'>Chicken Caesar Pita recipe</a> 
    	information powered by <img alt='Yummly' src='http://static.yummly.com/api-logo.png'/>
    	*/
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
		.otherwise({redirectTo:'/'});


}]);


