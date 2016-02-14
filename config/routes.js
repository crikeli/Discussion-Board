//requires the users.js controller

var users = require('./../server/controllers/users.js');
var topics = require('./../server/controllers/topics.js');

module.exports = function(app){

	//Renders the index page
	app.get('/', function(req, res){
		res.render('index');
	})

	//Gets all users
	app.get('/users', function(req, res){
		users.read(req, res);
	})

	//Finds one user in the db
	app.post('/user', function(req, res){
		users.read_one(req, res);
	})

	//creates a new user if one does not exist already
	app.post('/create_user', function(req, res){
		users.create(req, res);
	})

	//Sets the currently logged in user to the current user
	app.post('/set_current_user', function(req, res){
		users.set_current_user(req, res);
	})

	//Gets the current user and all attributes relating to the user.
	app.get('/get_current_user', function(req, res){
		users.get_current_user(req, res);
	})

		app.post('/get_current_user_and_inc', function(req, res){
		users.get_current_user_and_inc(req, res);
	})

	app.post('/get_current_user_and_inc_comments', function(req, res){
		users.get_current_user_and_inc_comments(req, res);
	})

	app.post('/get_current_user_and_inc_answers', function(req, res){
		users.get_current_user_and_inc_answers(req, res);
	})
	app.get('/topics', function(req, res){
		topics.read(req, res);
	})

	app.post('/topic', function(req, res){
		topics.read_one(req, res);
	})

	app.post('/create_topic', function(req, res){
		topics.create(req,res);
	})

	app.post('/create_answer', function(req, res){
		topics.create_answer(req, res);
	})

	app.post('/create_comment', function(req, res){
		topics.create_comment(req, res);
	})

	app.post('/create_answer', function(req, res){
		topics.create_answer(req, res);
	})

	app.post('/create_comment', function(req, res){
		topics.create_comment(req, res);
	})

	app.post('/upvote', function(req, res){
		topics.upvote(req, res);
	})

	app.post('/downvote', function(req, res){
		topics.downvote(req, res);
	})

	app.post('/inc_answers', function(req, res){
		topics.inc_answers(req, res);
	})

};