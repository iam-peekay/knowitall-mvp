/*
This is where we build up our questions service: common functionality 
related to questions that we want to use.

This service is reponsible for communicating with the back-end upon 
requests from the controller. 

*/
angular.module('knowitall.services.questions', [])
.service('QuestionsService', function ($http, $q) {
  var service = this;
  this.quizTime = false;

  service.addNewQuestion = function (question) {
    console.log('I\'ve reached the client side before adding question', question);
    return $http({
      method: 'POST',
      url: '/api/questions',
      data: question
    })
    .then(function (resp) {
      return resp.data;
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
    return $http({
      method: 'PUT',
      url: '/api/questions/delete',
      data: question
    })
    .then(function (resp) {
       console.log('deleting complete from client side', question);
      return resp.data;
    });
  };

  service.quizTime = function () {
    this.quizTime = !this.quizTime;
    return this.quizTime;
  };

});
