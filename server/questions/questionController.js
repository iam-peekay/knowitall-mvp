var Question = require('./questionModel.js');
var User = require('../users/userModel.js');
var Q = require('q');
var util = require('../config/utils.js');

module.exports = {
  fetchAllQuestions: function (request, response, next) {
    // Create a promise returning function
    var findAll = Q.nbind(Question.find, Question);

    findAll({})
      .then(function (questions) {
        response.json(questions);
      })
      .fail(function (error) {
        next(error);
      });
  },

  postNewQuestion: function (req, res, next) {
    var text = req.body.text;
    var answer = req.body.answer;
    var tag = req.body.tag;

    var createQuestion = Q.nbind(Question.create, Question);
    // TODO: need to find tag to match before doing this
    var newQuestion = {
      text: text,
      answer: answer,
      _tag: tag
    };
    createQuestion(newQuestion)
    .then(function (createdQuestion) {
      if (createdQuestion) {
        res.json(createdQuestion);
      }
    })
    .fail(function (error) {
      next(error);
    });
  }
};
