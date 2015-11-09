var TagsController = require('./tagController.js');

// app === tagRouter injected from middleware.js

module.exports = function (app) {

// Middleware is setup so that this route path is /api/questions + whatever we define here
  app.get('/', TagsController.fetchAllTags);
  app.post('/', TagsController.addNewTag);

};
