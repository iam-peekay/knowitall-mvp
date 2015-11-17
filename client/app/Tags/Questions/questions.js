/*
This module and controller talks to our questions view and communicates with the questions service
for requests to the bad end and other common methods that are available through the questions service.
*/

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

  // We use this to initialize the app with a local cache of the current questions 
  // we have in our database. It would be empty if it's the user's first time using the product
  // This local cache is used to render the questions in the view
  QuestionsService.showAllQuestions()
    .then(function (questions) {
      questionsController.questions = questions;
    });

  // Update questions if we need to
  function updateQuestions () {
    QuestionsService.showAllQuestions()
      .then(function (questions) {
        questionsController.questions = questions;
      });
  }

  // Adds a new question to our database and local cache if the users submits it on the front end
  function addNewQuestion () {
    QuestionsService.addNewQuestion(questionsController.newQuestion)
      .then(function (newQuestion) {
        questionsController.questions.push(newQuestion);
        questionsController.addingQuestion = false;
        returnToQuestions();
        resetForm();
      });
  }

  // Once a user submits a new question, they return back to the current tag state
  function returnToQuestions () {
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

   // deleting a question is tricky because we need to also delete the question from the
   // tag it's associated with in the backend. Each tag has a "questions" property with an 
   // array of all it's questions. The removal of a question from a tag is done in the back-end
   // Here, we're just finding the index of the question in the local cache and removing that 
   // question so that the view can accurately reflect the deletion of the question

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

   // Functins that we want to export
  questionsController.getCurrentTag = TagsService.getCurrentTag;
  questionsController.getCurrentTagName = TagsService.getCurrentTagName;
  questionsController.addNewQuestion = addNewQuestion;
  questionsController.deleteQuestion = deleteQuestion;
  questionsController.quizMe = quizMe;
  questionsController.updateQuestions = updateQuestions;

  resetForm();
});
