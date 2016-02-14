//Here we declare the User Schemas

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	//Keeps track of the name and the validations associated with it
	name: {type: String, required: true, minlength: 4, maxlength: 20 },
	//Keeps track of the number of topics the user has created and has a number value
	num_topics: Number,
	//Keeps track of the number of answers the user has provided and has a numeric value
	num_answers: Number,
	//Keeps track of the number of comments a user input and has a numeric val.
	num_comments: Number,
	//created_at attribute associated with the user creation.	
	created_at: {type: Date, default: new Date}
});

mongoose.model('User', UserSchema);
