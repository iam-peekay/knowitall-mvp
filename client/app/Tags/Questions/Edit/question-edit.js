angular.module('knowitall.create', [])

.controller('CreateController', ['$scope','$location', 'Questions', function ($scope, $location, Questions) {

  $scope.question = {};

  $scope.addNewQuestion = function () {
    Questions.addNewQuestion($scope.question)
      .then(function () {
        $location.path('/');
      })
      .catch(function (error) {
        console.error('Error adding new question.', error);
      });
  };

}]);
