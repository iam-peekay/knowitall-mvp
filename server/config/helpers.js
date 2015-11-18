module.exports = {

  errorLogger: function (error, req, res, next) {
    // Log the error then send it to the next middleware in
    // middleware.js
    console.error(error.stack);
    next(error);
  },

  errorHandler: function (error, req, res, next) {
    // Send error message to client
    // Message for gracefull error handling on app
    res.send(500, {error: error.message});
  }
};

// https://github.com/odhyan/quizapp-angular/blob/master/app.js
