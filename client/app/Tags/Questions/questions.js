angular.module('tags.questions', ['knowitall.services.tags', 'knowitall.services.questions'])
.config(function ($stateProvider) {
  $stateProvider
    .state('knowitall.tags.questions', {
      url: 'tags/:tag',
      views: {
        'questions@': {
          templateUrl: 'app/tags/Questions/questions.html',
          controller: 'QuestionsController as questionsController'
        }
      }
    });
})
.controller('QuestionsController', function ($stateParams, $state, TagsService, QuestionsService) {
  var questionsController = this;

  TagsService.setCurrentTag($stateParams.tag);

  QuestionsService.showAllQuestions()
    .then(function (questions) {
      questionsController.questions = questions;
    });

  questionsController.getCurrentTag = TagsService.getCurrentTag;

  questionsController.getCurrentTagName = TagsService.getCurrentTagName;


  function addNewQuestion () {
    console.log('adding new question');
    QuestionsService.addNewQuestion(questionsController.newQuestion);
    returnToQuestions();
  }

  questionsController.deleteQuestion = QuestionsService.deleteQuestion;

  function returnToQuestions() {
    $state.go('knowitall.tags.questions', {tag: $stateParams.tag});
  }

  function resetForm () {
    questionsController.newQuestion = {
      text: '',
      answer: '',
      tag: $stateParams.tag
    };
     returnToQuestions();
   }

   function quizMe () {
    questionsController.quizTime = !questionsController.quizTime;
   }

  questionsController.addNewQuestion = addNewQuestion;
  questionsController.quizMe = quizMe;

  resetForm();
});
