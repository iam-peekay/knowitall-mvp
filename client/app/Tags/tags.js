angular.module('tags', ['knowitall.services.tags'])
.config(function ($stateProvider) {
  $stateProvider
    .state('knowitall.tags' {
      url: '/',
      views: {
        'tags@': {
          controller: 'TagsController',
          templateUrl: 'app/Tags/tags.html'
        },
        'questions@': {
          controller: 'QuestionsController',
          templateUrl: 'app/Tags/Questions/questions.html'
        }
      }
    });
})
.controller('TagsController', function TagsController(TagsService) {
  var tagsController = this;
  TagsFactory.getTags()
    .then(function (result) {
      tagsController.tags = result;
    });
});
