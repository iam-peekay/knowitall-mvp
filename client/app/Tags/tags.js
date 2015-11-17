/*
This module contains all the code for the quiz functionality.
The quiz is simple as it stands now: When a user clicks on the "Quiz Me!" button, 
we generated a quiz made up of 5 random questions from the questions database. 
Then we run the quiz and output a score out of 5.
*/

angular.module('tags', ['knowitall.services.tags'])
.config(function ($stateProvider) {
  $stateProvider
    .state('knowitall.tags', {
      url: '/',
      views: {
        'tags@': {
          controller: 'TagsController as tagsController',
          templateUrl: 'app/Tags/tags.html'
        },
        'questions@': {
          controller: 'QuestionsController as questionsController',
          templateUrl: 'app/Tags/Questions/questions.html'
        },
        'quiz@': {
          controller: 'QuizController as quizController',
          templateUrl: 'app/Quiz/quizTemplate.html'
        }
      }
    });
})
.controller('TagsController', function TagsController(TagsService) {
  var tagsController = this;
  TagsService.getAllTags()
    .then(function (result) {
      tagsController.tags = result;
    });
});
