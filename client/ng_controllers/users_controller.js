//The controller retrieves info from the factory and therefore, we need to inject the 
//userFactory into the usersController.

//The $location service parses the URL in the browser address bar 
//(based on the window.location) and makes the URL available to your application.

//The $routeParams service allows you to retrieve the current set of route parameters

Discussion_Board.controller('usersController', function($scope, $routeParams, $location, userFactory){

	//We call onto the readUsers method from our factory and set our $scope.users
	//to the data we got back from the factory
	userFactory.readUsers(function(data){
		console.log(data)
		$scope.users = data;
	})

	//We then call onto the getCurrentUser method from our factory and set our $scope.current_user
	//to the data we got back from the factory (ie. the single user)
	userFactory.getCurrentUser(function(data){
		console.log(data)
		$scope.current_user = data;
	})

	//I don't know what this does yet.
	if($routeParams.id){
		if(typeof $routeParams.id !== 'undefined'){
			userFactory.readUser($routeParams.id, function(data){
				$scope.user = data;
			})
		}
	}

	//We call to the factory method createUser and pass in the new_user 
	//It checks for any errors, they are displayed and if successful
	//our current_user is the output.
	$scope.createUser = function(new_user){
		userFactory.createUser(new_user, function(data){
			if(typeof data.errors !== 'undefined'){
				$('#errors').html(data.errors.name.message)
			}
			else{
				userFactory.setCurrentUser(data, function(output){
					$scope.current_user = output;
				});
			}
		});

		//Our $scope.new_user is instantiated and we give it a path of ("/dashboard") 
		$scope.new_user = {};
		$location.path("/dashboard")
	}

	//We verify whether a user exists in the db, if not, we create one.
	//We also check for validations here if the name field is left blank
	//Or if a user exists already
	$scope.verifyUser = function(new_user){
		var exists = false;
		// if(typeof new_user === 'undefined'){
  //       	$('#errors').html("<p>field cannot be left blank</p>");
  //       }
  //       else{
		// 	for(var i=0; i < $scope.users.length; i++){
		// 		if(new_user.name === $scope.users[i].name){
		// 			exists = true;
		// 		}
		// 	}
			if(exists){
	            $('#errors').html("<p>the name you entered already exists</p>");
	        }
	        else{
	            $scope.createUser(new_user);
	        }
	    // }
	}
});