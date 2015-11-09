angular.module('tags.questions.create', [])

.controller('CreateQuestionController', function ($state, $stateParams, QuestionsService) {

  var createQuestionController = this;

  function addNewQuestion() {
    QuestionsService.addNewQuestion(createQuestionController.newQuestion);
  };

});
