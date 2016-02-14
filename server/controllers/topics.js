var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

var topics = {};

topics.read = function(req, res){
	Topic.find({}, function(err, topics){
		if(err){
			console.log(err);
		}
		else{
			res.json(topics);
		}
	}).sort({created_at: -1});
};

topics.read_one = function(req, res){
	console.log("retrieving topic:", req.body.topic_id);
	Topic.findOne({_id: req.body.topic_id}, function(err, topic){
		if(err){
			console.log(err);
		}
		else{
			res.json(topic);
		}
	})
}

topics.create = function(req, res){
	console.log("POSTED TOPIC", req.body);
	var new_topic = new Topic({user: req.body.user, user_id: req.body.user_id, topic: req.body.topic, category: req.body.category, description: req.body.description, answers: [], created_at: Date()});
	new_topic.save(function(err){
		if(err){
			res.json(err);
		}
		else{
			console.log('topic added!');
			Topic.find({}, function(err, topics){
				if(err){
					console.log(err);
				}
				else{
					res.json(topics);
				}
			}).sort({created_at: -1});
		}
	})
}

topics.create_answer = function(req, res){
	Topic.update({_id: (req.body.topic_id)}, {$push: {answers: {user: req.body.new_answer.user, user_id: req.body.new_answer.user_id, answer: req.body.new_answer.answer, up_votes: 0, down_votes: 0, comments: [], created_at: Date()}} }, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('updated answers');
		}
		res.json('successfully updated answers');
	});
}

topics.create_comment = function(req, res){

	Topic.update({_id: req.body.topic_id, "answers._id": req.body.answer_id}, {$push: {"answers.$.comments": {user: req.body.new_comment.user, user_id: req.body.new_comment.user_id, comment: req.body.new_comment.comment, created_at: Date()}} }, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('updated answers');
		}
		res.json('successfully updated comments');
	});
}

topics.upvote = function(req, res){
	Topic.update({_id: req.body.topic_id, "answers._id": req.body.answer_id}, {$inc: {"answers.$.up_votes": 1}}, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.json('successfully upvoted');
		}
	})
}

topics.downvote = function(req, res){
	Topic.update({_id: req.body.topic_id, "answers._id": req.body.answer_id}, {$inc: {"answers.$.down_votes": 1}}, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.json('successfully downvoted');
		}
	})
}

topics.inc_answers = function(req, res){
	Topic.update({_id: req.body.topic_id}, {$inc: {num_answers: 1}}, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.json("successfully incremented answers");
		}
	})
}

module.exports = topics;
