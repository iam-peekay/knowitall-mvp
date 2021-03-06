/*
Our main Angular app module and configuration. We use ui-router for managing state.
*/
angular.module('knowitall', [
  'ui.router',
  'xeditable',
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
})
.run(function (editableOptions) {
  editableOptions.theme = 'bs3';
});

