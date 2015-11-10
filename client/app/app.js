angular.module('knowitall', [
  'ui.router',
  'tags',
  'tags.questions',
  'knowitall.services.questions',
  'knowitall.services.tags',
  'quiz'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('knowitall', {
      url: '',
      abstract: true
    });

    $urlRouterProvider.otherwise('/');
});


// GET UPDATE TO WORK
