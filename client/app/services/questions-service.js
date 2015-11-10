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

  service.deleteQuestion = function (question) {
    console.log('deleting from client side this question: ', question)
    return $http({
      method: 'PUT',
      url: '/api/questions/delete',
      data: question
    })
    .then(function (resp) {
      console.log('deleted!');
    });
  };
});
