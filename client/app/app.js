angular.module('knowitall', [
  'ui.router',
  'tags',
  'tags.questions'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('knowitall', {
      url: '',
      abstract: true
    });

    $urlRouterProvider.otherwise('/');
});
