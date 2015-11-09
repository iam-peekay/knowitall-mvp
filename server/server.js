var express = require('express');
var mongoose = require('mongoose');

var app = express();

// Connect to mongo database names knowitall
mongoose.connect('mongodb://localhost/knowitall');
// Confirm connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

// Configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

// Set up the port the server should listen to
app.listen(4568);

// Export our app for testing and flexibility
module.exports = app;


/* Walkthrough of the server

  Express, mongoose, and our server are initialzed here
  Next, we then inject our server and express into our config/middleware.js file for setup.
    We also exported our server for easy testing

  middleware.js requires all express middleware and sets it up
  our authentication is set up there as well
  we also create individual routers for are two main features, links and users
  each feature has its own folder with a model, controller, and route file
    the respective file is required in middleware.js and injected with its mini router
    that route file then requires the respective controller and sets up all the routes
    that controller then requires the respective model and sets up all our endpoints which respond to requests

*/
