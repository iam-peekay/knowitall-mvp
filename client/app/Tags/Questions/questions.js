angular.module('tags.questions', ['tags.questions.create', 'knowitall.services.tags', 'knowitall.services.questions'])
.config(function ($stateProvider) {
  $stateProvider
    .state('knowitall.tags.questions', {
      url: 'tags/:tag',
      views: {
        'tags@': {
          templateUrl: 'app/tags/questions/questions.html',
          controller: 'QuestionsController as questionsController'
        }
      }
    });
})
.controller('QuestionsController', function ($stateParams, TagsService, QuestionsService) {
  var questionsController = this;

  TagsService.setCurrentTag($stateParams.tag);

  QuestionsService.showAllQuestions()
    .then(function (questions) {
      questionsController.questions = questions;
    });

  questionsController.getCurrentTag = TagsService.getCurrentTag;

  questionsController.getCurrentTagName = TagsService.getCurrentTagName;

});
