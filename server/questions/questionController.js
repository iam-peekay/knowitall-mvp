var Question = require('./questionModel.js');
var Tag = require('../tags/tagModel.js');
var Q = require('q');
var util = require('../config/utils.js');

module.exports = {
  fetchAllQuestions: function (request, response, next) {
    // Create a promise returning function
    var findAll = Q.nbind(Question.find, Question);

    findAll({})
      .then(function (questions) {
        response.json(questions);
      })
      .fail(function (error) {
        next(error);
      });
  },

  postNewQuestion: function (req, res, next) {
    var text = req.body.text;
    var answer = req.body.answer;
    var tag = req.body.tag;
    console.log(req.body)
    var createQuestion = Q.nbind(Question.create, Question);
    var findTag = Q.nbind(Tag.findOne, Tag);
    var createTag = Q.nbind(Tag.create, Tag);

    findTag({name: tag})
    .then(function (foundTag) {
      if (foundTag) {
        foundTag.save(function (err) {
          if (err) {
            return console.error(err);
          }
          var newQuestion = new Question({
            text: text,
            answer: answer,
            _tag: foundTag.name
          });
          newQuestion.save(function (err) {
            if (err) {
              return console.error(err);
            }
            res.json(newQuestion);
          });
        });
      } else {
        var newTag = new Tag({
          name: tag
        });

        newTag.save(function (err) {
          if (err) {
            return console.error(err);
          }
          var newQuestion = new Question({
            text: text,
            answer: answer,
            _tag: newTag.name
          });
          res.json(newQuestion);
        });
      }
    });

    // findTag({_tag: tag})
    //   .then(function (foundTag) {
    //     if (foundTag) {
    //       return foundTag;
    //     } else {
    //       var newTag = {
    //         name: tag
    //       };
    //       return createTag(newTag)
    //     }
    //   })
    //   .then(function (tag) {
    //     var newQuestion = {
    //       text: text,
    //       answer: answer,
    //       _tag: tag.name
    //     };
    //     createQuestion(newQuestion)
    //   })
    //   .then(function (createdQuestion) {
    //     if (createdQuestion) {
    //       res.json(createdQuestion);
    //     }
    //   })
    //   .fail(function (error) {
    //     next(error);
    //   });
  }
};
