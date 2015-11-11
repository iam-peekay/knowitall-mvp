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
    var findQuestion = Q.nbind(Question.find, Tag);
    var text = req.body.text;
    var tag = req.body._tag;
    var id;
    console.log(text);
    findQuestion({'text': text})
      .then(function (err, ques) {
        id = ques._creator;
        // ques.remove().exec();
      });
  
  // Question.find({'text': text}, function (err, obj) {
  //   console.log(obj);
  // });
    Question.find({text: text}).remove().exec();
    findTag({name: tag})
      .then(function (foundTag) {
        console.log(foundTag);
        var index = foundTag.questions.indexOf(id);
        foundTag.questions.splice(index, 1);
        if (foundTag.questions.length <= 0) {
          foundTag.remove().exec();
        }
        foundTag.save();
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
      if (foundTag) {

          var newQuestion = new Question({
            text: text,
            answer: answer,
            _tag: foundTag.name,
            _creator: foundTag._id
          });
          newQuestion.save(function (err) {
            if (err) {
              return console.error(err);
            }
            foundTag.questions.push(newQuestion);
            foundTag.save(function (err) {
              if (err) {
                return console.error(err);
              }
            });
            console.log('new question', newQuestion);
            res.json(newQuestion);
          });

      } else {

        var newTag = new Tag({
          name: tag
        });
        var newQuestion = new Question({
          text: text,
          answer: answer,
          _tag: newTag.name,
          _creator: newTag._id
        });
        newQuestion.save(function (err) {
          if (err) {
            console.error(err);
          } else {
            newTag.save(function (err) {
              if (err) {
                return console.error(err);
              }
              newTag.questions.push(newQuestion);
              res.json(newQuestion);
            });
          }
        });
    }
      Question.findOne({text: text}).populate('_creator').exec(function (err, story) {
        if (err) {
          return console.error(err);
        }
        console.log('successfully populated!');
      });
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
