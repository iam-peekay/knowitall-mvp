var Question = require('./questionModel.js');
var Tag = require('../tags/tagModel.js');
var Q = require('q');
var util = require('../config/utils.js');

module.exports = {
  fetchAllQuestions: function (req, res, next) {
    // Create a promise returning function
    var findAll = Q.nbind(Question.find, Question);

    findAll({})
      .then(function (questions) {
        res.json(questions);
      })
      .fail(function (error) {
        next(error);
      });
  },

  deleteQuestion: function (req, res, next) {
    var findTag = Q.nbind(Tag.findOne, Tag);
    var text = req.body.text;
    var tag = req.body._tag;
    Question.find({text: text}).remove().exec();
    findTag({name: tag})
      .then(function (foundTag) {
        foundTag.questionCount -= 1;
        foundTag.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(foundTag)
            findTag({name: tag})
            .then(function(newUpdatedTag) {
              if (newUpdatedTag.questionCount <= 0) {
                newUpdatedTag.remove().exec();
            }
            });
          }
        });
      });
  },

  postNewQuestion: function (req, res, next) {
    var text = req.body.text;
    var answer = req.body.answer;
    var tag = req.body.tag;
    var createQuestion = Q.nbind(Question.create, Question);
    var findTag = Q.nbind(Tag.findOne, Tag);
    var createTag = Q.nbind(Tag.create, Tag);

    findTag({name: tag})
    .then(function (foundTag) {
      console.log('found tag', foundTag)
      if (foundTag) {
        foundTag.questionCount = foundTag.questionCount + 1;
        foundTag.save(function (err) {
          if (err) {
            return console.error(err);
          }
          var newQuestion = new Question({
            text: text,
            answer: answer,
            _tag: foundTag.name,
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
          name: tag,
          questionCount: 1
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

          newQuestion.save(function (err) {
            if (err) {
              console.error(err);
            } else {
              res.json(newQuestion);
            }
          });
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
