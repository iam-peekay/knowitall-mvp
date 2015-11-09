// angular.module('tags.questions.create', [])
// .config(function ($stateProvider) {
//   $stateProvider
//     .state('knowitall.tags.questions.create', {
//       url: '/questions/create',
//       controller: 'CreateQuestionController as createQuestionController',
//       templateUrl: 'app/Tags/Questions/Create/create.html'
//     });
// })
// .controller('CreateQuestionController', function ($state, $stateParams, QuestionsService) {

//   var createQuestionController = this;

//   function addNewQuestion () {
//     QuestionsService.addNewQuestion(createQuestionController.newQuestion);
//     returnToQuestions();
//   }

//   function returnToQuestions() {
//     $state.go('knowitall.tags.questions', {tag: $stateParams.tag});
//   }

//   function resetForm () {
//     createQuestionController.newQuestion = {
//       text: '',
//       answer: '',
//       tag: $stateParams.tag
//     }
//      returnToQuestions();
//    }

//   createQuestionController.addNewQuestion = addNewQuestion;

//   resetForm();
// });
