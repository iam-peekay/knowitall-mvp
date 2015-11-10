var questionsController = require('./questionController.js');

// app === questionRouter injected from middleware.js

module.exports = function (app) {

// Middleware is setup so that this route path is /api/questions + whatever we define here
  app.get('/', questionsController.fetchAllQuestions);
  app.post('/', questionsController.postNewQuestion);
  app.put('/delete', questionsController.deleteQuestion);

};
