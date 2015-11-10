var mongoose = require('mongoose');
var crypto = require('crypto');
Schema = mongoose.Schema;
var Tag = require('../tags/tagModel.js');

// declared the Question _creator property as a Number, the same type as the _id used in the UserSchema. It is important to match the type of _id to the type of ref.
// http://mongoosejs.com/docs/populate.html

var QuestionSchema = new Schema({
  _tag: {
   type: String,
   required: true
 },

  text: {
    type: String,
    required: true
  },

  answer: {
    type: String,
    required: true
  }
  
});

var Question = mongoose.model('Question', QuestionSchema);

QuestionSchema.pre('save', function (next) {
// ANYTHING?
  next();
});


// Question.find({}).remove().exec();

// Question.remove({ text: 'test4' }, function (err, small) {
//   if (err) return console.log('error removing Tag document');
//   console.log('Question document removed!');
// });

// Question.create({ text: 'test4', answer: 'boooo', _tag: 'love' }, function (err, small) {
//   if (err) return console.log('error creating Tag model');
//   console.log('Tag model created!');
// });

module.exports = Question;
