Discussion_Board.controller('topicsController', function($scope, $routeParams, topicFactory, userFactory){

	topicFactory.readTopics(function(data){
		$scope.topics = data;
	})

	if(typeof $routeParams.id !== 'undefined'){
		topicFactory.readTopic($routeParams.id, function(data){
			$scope.topic = data;
		})
	}


	$scope.createTopic = function(new_topic){
		
		userFactory.getCurrentUserandInc(function(data){
			$scope.current_user = data;
			console.log($scope.current_user);
		});

		new_topic.user = $scope.current_user.name;
		new_topic.user_id = $scope.current_user._id;

		topicFactory.createTopic(new_topic, function(data){

			if(typeof data.errors !== 'undefined'){
				$('#errors').html("<p>"+data.errors.name.message+"</p>");
			}
			else{
				$scope.topics = data;
				console.log('successfully created topic');
			}
		});

		$scope.new_topic = {};
	};

	$scope.createAnswer = function(new_answer, topic_id){

		userFactory.getCurrentUserandIncAnswers(function(data){
			$scope.current_user = data;
		});

		topicFactory.incAnswers(topic_id, function(data){
			console.log(data);
		})

		new_answer.user = $scope.current_user.name;
		new_answer.user_id = $scope.current_user._id;
		
		topicFactory.createAnswer(new_answer, topic_id, function(data){
			if(typeof data.errors !== 'undefined'){
				$('#errors').html("<p>"+data.errors.name.message+"</p>");
			}
			else{
				console.log(data);
				topicFactory.readTopic($routeParams.id, function(data){
				$scope.topic = data;
		})
			}
		})

		$scope.new_answer = {};
	}

	$scope.createComment = function(new_comment, answer_id, topic_id){

		userFactory.getCurrentUserandIncComments(function(data){
			$scope.current_user = data;
		});

		new_comment.user = $scope.current_user.name;
		new_comment.user_id = $scope.current_user._id;
		
		topicFactory.createComment(new_comment, answer_id, topic_id, function(data){
			if(typeof data.errors !== 'undefined'){
				$('#errors').html("<p>"+data.errors.name.message+"</p>");
			}
			else{
				console.log(data);
				topicFactory.readTopic($routeParams.id, function(data){
				$scope.topic = data;
		})
			}
		})

		$scope.new_answer = {};
	}

	$scope.upVote = function(topic_id, answer_id, answer_user_id){
		if(answer_user_id == $scope.current_user._id){
			console.log("can't vote on your own answer");
			$scope.vote_error = "can't vote on your own answer";
		}
		else{
			topicFactory.upVote(topic_id, answer_id, function(data){
				console.log(data);
				topicFactory.readTopic($routeParams.id, function(data){
				$scope.topic = data;
		})
			})
		}
	}

	$scope.downVote = function(topic_id, answer_id, answer_user_id){
		if(answer_user_id == $scope.current_user._id){
			console.log("can't vote on your own answer");
			$scope.vote_error = "can't vote on your own answer";
		}
		else{
			topicFactory.downVote(topic_id, answer_id, function(data){
			console.log(data);
			topicFactory.readTopic($routeParams.id, function(data){
			$scope.topic = data;
		})
			});

		}
	}
});
		