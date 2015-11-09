var mongoose = require('mongoose');
var crypto = require('crypto');
Schema = mongoose.Schema;

// declared the Question _creator property as a Number, the same type as the _id used in the UserSchema. It is important to match the type of _id to the type of ref.
// http://mongoosejs.com/docs/populate.html

var QuestionSchema = new Schema({
  _tag: {
   type: String,
   ref: 'Tag'
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


module.exports = Question;
