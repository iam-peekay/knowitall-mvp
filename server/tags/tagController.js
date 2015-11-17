var Tag = require('./tagModel.js');
var Question = require('../questions/questionModel.js');
var Q = require('q');
var util = require('../config/utils.js');

module.exports = {
  fetchAllTags: function (request, response, next) {
    // Create a promise returning function
    var findAll = Q.nbind(Tag.find, Tag);
    // find all tags in our Mongo database and return as a json response
    findAll({})
      .then(function (tags) {
        response.json(tags);
      })
      .fail(function (error) {
        next(error);
      });
  },

  addNewTag: function (req, res, next) {
    var name = req.body.tagName;
    // Create a promise returning function
    var createTag = Q.nbind(Tag.create, Tag);

    // add new tag to our database
    var newTag = {
      name: name
    };
    createTag(newTag)
    .then(function (createdTag) {
      if (createdTag) {
        res.json(createdTag);
      }
    })
    .fail(function (error) {
      next(error);
    });
  }
};
