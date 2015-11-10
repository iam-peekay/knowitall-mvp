angular.module('knowitall.services.questions', [])
.service('QuestionsService', function ($http, $q) {
  var service = this;
  var questions;

  service.addNewQuestion = function (question) {
    console.log('client side before adding question', question);
    return $http({
      method: 'POST',
      url: '/api/questions',
      data: question
    });
  };

  service.showAllQuestions = function () {
    return $http({
      method: 'GET',
      url: '/api/questions'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  service.quizMe = function (question, callback) {
    var correct;
    var attemptedAnswer = question.attempt.toLowerCase();
    var correctAnswer = question.text.toLowerCase();
    if (attemptedAnswer === correctAnswer) {
      correct = true;
    } else {
      correct = false;
    }
    callback(correct);
  };
});
