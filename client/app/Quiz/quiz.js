/*
This module contains all the code for the quiz functionality.
The quiz is simple as it stands now: When a user clicks on the "Quiz Me!" button, 
we generated a quiz made up of 5 random questions from the questions database. 
Then we run the quiz and output a score out of 5.
*/
angular.module('quiz', ['tags.questions', 'knowitall.services.tags', 'knowitall.services.questions'])
.config(function ($stateProvider) {
  $stateProvider
    .state('quiz', {
      url: 'quiz/',
      views: {
        'quiz@': {
          templateUrl: 'app/Quiz/quiz.html',
          controller: 'QuizController as quizController'
        }
      }
    });
})
.controller('QuizController', function ($stateParams, $state, TagsService, QuestionsService) {
  var quizController = this;

  // Sets the state variables for quiz and accmulates questions for quiz
  function startQuiz () {
    QuestionsService.showAllQuestions()
      .then(function (questions) {
        quizController.questions = questions;
        quizController.getQuestions();
        quizController.id = 0;
        quizController.quizOver = false;
        quizController.inProgress = true;
        quizController.getNextQuestion();
      });
  }

  // Generates 5 random questions from our questions database
  function getQuestions () {
    quizController.quizQuestions = [];
    for (var i = 0; i < 5; i++) {
      var rand = Math.floor(Math.random() * quizController.questions.length);
      quizController.quizQuestions[i] = quizController.questions[rand];
    }
  }


  function getNextQuestion () {
    var q = quizController.quizQuestions[quizController.id];
    if (q) {
      quizController.question = q.text;
      quizController.answer = q.answer;
      quizController.answerMode = true;
    } else {
      quizController.quizOver = true;
    }
  }

  function checkAnswer () {
    var answer = $("input[name='answer']").val();
    $("input[name='answer']").val('');
    console.log(answer);
    if (answer === quizController.answer) {
      quizController.score++;
      quizController.scorePercentage = (quizController.score / 5) * 100;
      quizController.correctAns = true;
    } else {
      quizController.correctAns = false;
    }

    quizController.answerMode = false;
  }

  function nextQuestion () {
    quizController.id++;
    quizController.getNextQuestion();
  }


  function reset () {
    quizController.inProgress = false;
    quizController.score = 0;
  }

  // Define functions that we want to export 
  quizController.startQuiz = startQuiz;
  quizController.getQuestions = getQuestions;
  quizController.getNextQuestion = getNextQuestion;
  quizController.checkAnswer = checkAnswer;
  quizController.nextQuestion = nextQuestion;
  quizController.reset = reset;

  // quizController.quizTime = QuestionsService.quizTime;
  quizController.reset();

});
