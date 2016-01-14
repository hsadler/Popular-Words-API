var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/routes')(app, express);

var port = process.env.PORT || 8080;
var node_env = process.env.NODE_ENV || 'development';


// serve static files from specified locations and index page on "/"
app.use(express.static(__dirname + '/../client/static'));
app.use(express.static(__dirname + '/../client/build'));
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});


app.listen(port, function() {
  console.log('app listening on port: ' + port + ' in ' + node_env + ' mode.');
});
