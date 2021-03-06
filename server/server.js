var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/knowitall';
// Connect to mongo database names knowitall
mongoose.connect(mongoURI);
// Confirm connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

app.use('/docs', express.static(__dirname + '/../docs'));

app.get('/docs', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../docs/tableofcontents.html'));
});

// Configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

// Set up the port the server should listen to
var port = process.env.PORT || 4568;
app.listen(port);
console.log('Listening on port 4568');

// Export our app for testing and flexibility
module.exports = app;


/* Walkthrough of the server

  Express, mongoose, and our server are initialzed here
  Next, we then inject our server and express into our config/middleware.js file for setup.
  We also exported our server for easy testing.

  Middleware.js requires all express middleware. We also create individual routers 
  for our two main features, questions and tags, and each feature has its own folder with a 
  model, controller, and route file. The respective files are required in middleware.js and 
  injected with its mini router. These mini routers' route file then requires the respective 
  controller and sets up all the routes. That controller then requires the respective model 
  and sets up all our endpoints which respond to requests.

  Phew!

*/
