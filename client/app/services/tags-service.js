angular.module('knowitall.services.tags', [])
.service('TagsService', function ($http, $q) {
  var service = this;
  var currentTag;
  var tags;
  service.addNewTag = function (tag) {
    return $http({
      method: 'POST',
      url: '/api/tags',
      data: tag
    });
  };

  service.getAllTags = function () {
    return $http({
      method: 'GET',
      url: 'api/tags'
    })
    .then(function (result) {
      return result.data;
    });
  };

  service.getCurrentTag = function () {
    return currentTag;
  };

  service.setCurrentTag = function (tag) {
    return service.getTagByName(tag).then(function (tag) {
      currentTag = tag;
    });
  };

  service.getCurrentTagName = function () {
    return currentTag ? currentTag.name : '';
  };

});

// TAGS.js
// TAGS.html
// TAGS SERVICE.js
// CREATE QUESTIONS.js
// CREATE QUESTIONS.html
// QUESTIONS SERVICE.js
