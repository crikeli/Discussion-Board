var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.json());

require('./config/mongoose.js');

app.use(express.static(path.join(__dirname, './client')));

require('./config/routes.js')(app);

app.listen(8000, function(){
	console.log('listening on 8000');
});