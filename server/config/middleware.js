var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser'); // parses the body of incoming requests
var helpers = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
// Create new User and Question sub routers
  var tagRouter = express.Router();
  var questionRouter = express.Router();

  // Logger
  app.use(morgan('dev'));
  // Parse forms (signup/login)
  app.use(bodyParser.urlencoded({extended: true}));
  // Parse JSON (uniform resource locators)
  app.use(bodyParser.json());
  // Serve static files
  app.use(express.static(__dirname + '/../../client'));


  app.use('/api/tags', tagRouter); // use tag router for all tag requests

  app.use('/api/questions', questionRouter); // question router for question requests
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../tags/tagRoutes.js')(tagRouter);
  require('../questions/questionRoutes.js')(questionRouter);
};
