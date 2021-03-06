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
      url: '/api/tags'
    })
    .then(function (result) {
      return result.data;
    });
  };

  service.getCurrentTag = function () {
    return currentTag;
  };

  service.setCurrentTag = function (tag) {
    currentTag = tag;
  };

  service.getCurrentTagName = function () {
    return currentTag ? currentTag : '';

  };


  // need to build out a service function to look through the database to find a tag that matches the tagname from database (i.e. need to build this out in the database too)

});
