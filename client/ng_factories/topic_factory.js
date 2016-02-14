Discussion_Board.factory('topicFactory', function($http){
	var factory = {};
	
	factory.createTopic = function(new_topic, callback){
		$http.post('/create_topic', new_topic).success(function(output){
				callback(output);
			})
	}

	factory.readTopics = function(callback){
		$http.get('/topics').success(function(output){
			callback(output);
		})
	}

	factory.readTopic = function(topic_id, callback){
		$http.post('/topic', {topic_id: topic_id}).success(function(output){
			callback(output);
		})
	}

	factory.createAnswer = function(new_answer, topic_id, callback){
		$http.post('/create_answer', {new_answer: new_answer, topic_id: topic_id}).success(function(output){
			callback(output);
		})
	}

	factory.createComment = function(new_comment, answer_id, topic_id, callback){
		$http.post('/create_comment', {new_comment: new_comment, answer_id: answer_id, topic_id: topic_id}).success(function(output){
			callback(output);
		})
	}

	factory.upVote = function(topic_id, answer_id, callback){
		$http.post('/upvote', {topic_id: topic_id, answer_id: answer_id}).success(function(output){
			callback(output);
		})
	}

	factory.downVote = function(topic_id, answer_id, callback){
		$http.post('/downvote', {topic_id: topic_id, answer_id: answer_id}).success(function(output){
			callback(output);
		})
	}

	factory.incAnswers = function(topic_id, callback){
		$http.post('/inc_answers', {topic_id: topic_id}).success(function(output){
			callback(output);
		})
	}

	return factory;

});