var mongoose = require('mongoose');
var User = mongoose.model('User');

//we declare a users variable as an object that stores user info
var users = {};
//we declare a current_user variable to keep track of the current user
var current_user;

//A method that finds all the users in the database and renders them as json objects
users.read = function(req, res){
	User.find({}, function(err, users){
		if(err){
			console.log(err);
		}
		else {
			res.json(users);
		}
	})
}

//A method that finds one user in the database and renders it as a json object.
users.read_one = function(req, res){
	User.findOne({_id: req.body.user_id}, function(err, user){
		if(err){
			console.log(err);
		}
		else{
			res.json(user)
		}
	})
}

//Creates a new user if a user is not found in the db
users.create = function(req, res){
	console.log("new user", req.body);
	var new_user = new User({name: req.body.name, num_topics: 0, num_answers: 0, num_comments: 0, created_at: Date()});
	//This is where the user actually gets saved into the db.
	new_user.save(function(err){
		if(err){
			res.json(err);
		}
		//If we cannot save that user, we look for that user in the database.
		else{
			User.findOne({name: req.body.name}, function(err, user){
				if(err){
					console.log(err);
				}
				else{
					res.json(user);
				}
			})
		}
	})
}

//Setting the currently logged in user to the current user
users.set_current_user = function(req, res){
	console.log(req.body);
	current_user = req.body;
	res.json(current_user);
}

//Getting the current user
users.get_current_user = function(req, res){
	res.json(current_user);
}

users.get_current_user_and_inc = function(req, res){
	User.update({name: current_user.name}, {$inc: {num_topics: 1}}, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('successfully updated user');
		}
	});
	res.json(current_user);
}

users.get_current_user_and_inc_answers = function(req, res){
	User.update({name: current_user.name}, {$inc: {num_answers: 1}}, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("successfully updated user's answer count");
		}
	});
	res.json(current_user);
}

users.get_current_user_and_inc_comments = function(req, res){
	User.update({name: current_user.name}, {$inc: {num_comments: 1}}, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("successfully updated user's comment count");
		}
	});
	res.json(current_user);
}

module.exports = users;