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
