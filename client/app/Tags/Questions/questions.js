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
.controller('QuestionsController', function ($scope, $filter, $stateParams, $state, TagsService, QuestionsService) {
  var questionsController = this;

  TagsService.setCurrentTag($stateParams.tag);

  QuestionsService.showAllQuestions()
    .then(function (questions) {
      questionsController.questions = questions;
    });

  function updateQuestions() {
    QuestionsService.showAllQuestions()
      .then(function (questions) {
        questionsController.questions = questions;
      });
  }

  function addNewQuestion () {
    QuestionsService.addNewQuestion(questionsController.newQuestion)
      .then(function (newQuestion) {
        questionsController.questions.push(newQuestion);
        questionsController.addingQuestion = false;
        returnToQuestions();
        resetForm();
      });
  }


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
    QuestionsService.quizTime();
   }

   function deleteQuestion (question) {
    console.log('delete', question);
    var copyOfQuestion = angular.copy(question);
    QuestionsService.deleteQuestion(question);
    var index = _.findIndex(questionsController.questions, function (question) {
        return question.text === copyOfQuestion.text;
      });
        console.log(index, 'index');
        questionsController.questions.splice(index, 1);
   }

  questionsController.getCurrentTag = TagsService.getCurrentTag;
  questionsController.getCurrentTagName = TagsService.getCurrentTagName;
  questionsController.addNewQuestion = addNewQuestion;
  questionsController.deleteQuestion = deleteQuestion;
  questionsController.quizMe = quizMe;
  questionsController.updateQuestions = updateQuestions;

  // $scope.$watch(angular.bind(this, function() { return this.questions; }), function(newVal, oldVal) {
  //     if (newVal !== oldVal) {
  //       var selected = $filter('filter')(questionsController.questions, {id: questionsController.questions.text});
  //         questionsController.questions.text = selected.length ? selected[0].text : null;
  //     }
  //   });

  resetForm();
});
