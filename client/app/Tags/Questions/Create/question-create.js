angular.module('tags.questions.create', [])
.config(function ($stateProvider) {
  $stateProvider
    .state('knowitall.tags.questions.create', {
      url: '/questions/create',
      templateUrl: 'app/Tags/Questions/Create/question-create.html',
      controller: 'CreateQuestionController as createQuestionController'
    });
})
.controller('CreateQuestionController', function ($state, $stateParams, QuestionsService) {

  var createQuestionController = this;

  function addNewQuestion () {
    QuestionsService.addNewQuestion(createQuestionController.newQuestion);
  }

  function returnToBookmarks() {
    $state.go('knowitall.tags.questions', {tag: $stateParams.tag});
  }

  function resetForm () {
    createQuestionController.newQuestion = {
      text: '',
      answer: '',
      tag: $stateParams.tag
    };

    returnToBookmarks();
  }

  createQuestionController.addNewQuestion = addNewQuestion;

  resetForm();
});
