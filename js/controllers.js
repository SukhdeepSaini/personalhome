myWeb.controller('NavbarController',function($scope){

	$scope.navbar = [

	{'name':'Profile', 'url':'#/profile'},
	{'name':'Projects', 'url':'#/projects'},
	];

	$scope.websiteHeader = "Sukhdeep Singh Saini";
	$scope.websiteTitle = "Software Developer";

    $('.carousel').carousel({
        interval: 2000
    });


    $scope.interests = "Engineering - Software Developer \n Engineering - Software Testing";

    $(function () {
        $('[data-toggle="popover"]').popover()
    });

//Send mail from Client Side
    $scope.sendmail =  function()
    {
    /*   console.log("Test");
        var contacingName = $('#contactingname').value;
        var contactingEmail = $('#contactingemail').value;
        var message = $('#message').value;

        var link = "mailto:me@example.com"
             + "?cc=myCCaddress@example.com"
             + "&subject=" + escape("This is my subject")
             + "&body=" + escape(document.getElementById('message').value)
        

        window.location.href = link;
    */
        $('#ContactMeModal').modal('hide');
        console.log("Mail Send");
    };

    
});


function ProjectDescriptionDisplay(ID)
{
    var $btn2 = $(ID);
    $btn2.data('state', 'hover');

    var enterShow = function () {
        if ($btn2.data('state') === 'hover') {
            $btn2.popover('show');
        }
    };
    var exitHide = function () {
        if ($btn2.data('state') === 'hover') {
            $btn2.popover('hide');
        }
    };

    var clickToggle = function () {
        if ($btn2.data('state') === 'hover') {
            $btn2.data('state', 'pinned');
        } else {
            $btn2.data('state', 'hover')
            $btn.popover('hover');
        }
    };

    $btn2.popover({trigger: 'manual'})
        .on('mouseenter', enterShow)
        .on('mouseleave', exitHide)
        .on('click', clickToggle);

}

//handle backward navigation
myWeb.controller('ProjectsController',function($scope,$http){

    var recipeDesId = "#recipeProject";
    var punjabipower = "#punjabipower";
    var webexp = "#webexp";
    var instagramproject = "#instagramproject";

    var recipeAppDetails = "Recipe Web Search App enable you to search for food recipes" +
                            " based on recipe name, ingredients " +
                             "and displays the top 10 matching results. An image, ingredients and other relevant information "+
                              "will be provided. Full complete descriton can be viewed by navigating to the " +
                              "link provided on recipe details page.";

    var punjabiPowerDetails = "Punjabi Power Pack is a health and fitness website and contains" +
                              " all the information needed starting from excercises,food recipes," +
                             "motivational videos,buying dietery supplements and reading fitness articles. "+
                              "Feel free to explore. ";


    var webexpDetails = " These are the experiments which I have been doing to learn" +
                         " more about web technologies. Includes experiments on " +
                         "javascript, jquery, ASP.NET, Rest and SOAP webservices, BootStrap, responsive CSS. Feel free to explore";


    var instagramDetails = "Currently experiment with Instagram API to build an Application using " +
                            "Instagram Authentication where users can search for popular images and "+
                            "tagged images and can also download there own images from there account";

    ProjectDescriptionDisplay(recipeDesId);
    ProjectDescriptionDisplay(punjabipower);
    ProjectDescriptionDisplay(webexp);
    ProjectDescriptionDisplay(instagramproject);

    $scope.projectHeader = "Projects";
    $scope.recipetooltip = recipeAppDetails;
    $scope.punjabipowertip = punjabiPowerDetails;
    $scope.webexptooltip = webexpDetails;
    $scope.instagramtip = instagramDetails;
    
    $scope.GetRecipeData = function()
    {
        var searhCriteria = $("#recipeSeachText").val();
        if(searhCriteria == "")
        {
            return; //Provide a better error alert
        }

        $scope.query = searhCriteria;
        var search = $scope.query;
    	var parameterizedQuery = 'http://api.yummly.com/v1/api/recipes?_app_id=222e8fca&_app_key=9e9a3459d35a5b4918595200eb4f7d4b&q='+ search +'&requirePictures=true'
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
        if($scope.course === undefined || $scope.course === null)
        {
            $scope.course = "Not Known";
        }
        $scope.cuisine = data.attributes.cuisine[0]; //handle cases when cuisine and course value is null
        if($scope.course === undefined || $scope.course === null)
        {
            $scope.cuisine = "Not Known";
        }
        $scope.recipeSourceUrl = data.source.sourceRecipeUrl;
        console.log($scope.recipeSourceUrl);
    	console.log(data.images[0].hostedLargeUrl);
    	console.log(ingredients);  //Ingredients information
    	console.log(data);  // All Data

    	//window.history.back saves the history information about the previous page and 
    	//user can navigate to previous page using this
    	$scope.navigateBack = function(){

    		window.history.back();  //not working for me , the data is not showing
    	}
    });
  });


function GetFeed(tag)
{
    var feed = "";
    document.getElementById("instafeed").innerHTML = "";
    var loadButton = document.getElementById('load-more');
    console.log(tag);
    if(tag == "popular")
    {
         feed = new Instafeed({
                get: 'popular',
                limit: "21",
                clientId: '51ca7b64a091467ea749c0fdc407efb7',
                resolution: "low_resolution",
                template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'

            }); 
    }
    else
    {
        feed = new Instafeed({
                get: 'tagged',
                tagName: tag,
                limit: "21",
                clientId: '51ca7b64a091467ea749c0fdc407efb7',
                resolution: "low_resolution",
                after: function() {
                 // disable button if no more results to load
                     if (!this.hasNext()) {
                        loadButton.setAttribute('disabled', 'disabled');
                     }
                 },
                template:'<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
            });  
    }

    loadButton.addEventListener('click', function() {
                                    feed.next();
                                });
    feed.run();    
}

myWeb.controller('InstaCtrl',function($scope){

        $scope.disablethis = true;
        $scope.itemselected =  function(item)
        {   
            if(item == "Tagged")
            {
                $scope.disablethis = false;
            }
            else
            {
                $scope.disablethis = true;
                $scope.instatag = "";
                GetFeed(item);
            }
        };

        $scope.getfeed = function()
        { 
            var tagtosearch = $scope.instatag;
            GetFeed(tagtosearch);
        };

        var REDIRECT_URL = "http://sukhdeepsaini.github.io/personalhome/#/Instafeed";
        var clientId = "51ca7b64a091467ea749c0fdc407efb7";

        $scope.instalogin = "https://api.instagram.com/oauth/authorize/?client_id="+ clientId +
                            "&redirect_uri="+ REDIRECT_URL +"&response_type=code";
});








