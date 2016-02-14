Discussion_Board.factory('userFactory', function($http){

	var factory = {};

	//We send a request to the backend to retrieve a user in our case, (new_user)
	factory.createUser = function(new_user, callback){
		$http.post('/create_user', new_user).success(function(output){
			callback(output);
		})
	}

	//Another request to the backend that communicates with the read method in the backend
	factory.readUsers = function(callback){
		$http.get('/users').success(function(output){

		})
	}

	// Another request made to the backend that communicates with the read_one method which
	// contains an additional parameter of the user id which is important to distinguish users
	factory.readUser = function(user_id, callback){
		$http.post('/user', {user_id: user_id}).success(function(output){
			callback(output);
		})
	}

	//A request made to the set_current_user method in the backend
	factory.setCurrentUser = function(user, callback){
		$http.post('set_current_user', user).success(function(output){
			callback(output);
		})
	}

	//A request made to the get_current_user method in the backend and assign it to the current lifespan.
	factory.getCurrentUser = function(callback){
		$http.get('/get_current_user').success(function(output){
			callback(output);
		})
	}

		factory.getCurrentUserandInc = function(callback){
		$http.post('/get_current_user_and_inc').success(function(output){
			callback(output);
		})
	}

	factory.getCurrentUserandIncAnswers = function(callback){
		$http.post('/get_current_user_and_inc_answers').success(function(output){
			callback(output);
		})
	}

	factory.getCurrentUserandIncComments = function(callback){
		$http.post('/get_current_user_and_inc_comments').success(function(output){
			callback(output);
		})
	}

	return factory;
})