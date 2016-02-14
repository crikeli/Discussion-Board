var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Comments = new mongoose.Schema({
	user: String,
	user_id: String,
	comment: String,
	created_at: {type: Date, default: new Date}
});

var Answers = new mongoose.Schema({
	user: String,
	user_id: String,
	answer: String,
	up_votes: Number,
	down_votes: Number,
	comments: [Comments],
	created_at: {type: Date, default: new Date}
})


var TopicSchema = new mongoose.Schema({
	user: String,
	user_id: String,
	topic: String,
	category: String,
	description: String,
	num_answers: Number,
	answers: [Answers],
	created_at: {type: Date, default: new Date}
});

mongoose.model('Topic', TopicSchema);