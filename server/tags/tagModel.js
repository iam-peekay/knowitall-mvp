var mongoose = require('mongoose');
var crypto = require('crypto');
Schema = mongoose.Schema;
var Question = require('../questions/questionModel.js');

// declared the Question _creator property as a Number, the same type as the _id used in the UserSchema. It is important to match the type of _id to the type of ref.
// http://mongoosejs.com/docs/populate.html

var TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  questionCount: {
    type: Number,
    required: true
  },

  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }]

});


TagSchema.pre('save', function (next) {
// ANYTHING?
  next();
});

var Tag = mongoose.model('Tag', TagSchema, 'tags');

// Tag.find({}).remove().exec();
// Tag.create({ name: 'test3' }, function (err, small) {
//   if (err) return console.log('error creating Tag model');
//   console.log('Tag model created!');
// });

// Tag.create({ name: 'General', questionCount: 0 }, function (err, small) {
//   if (err) return console.log('error creating Tag model');
//   console.log('Tag model created!');
// });


// Tag.remove({ name: 'wont' }, function (err, small) {
//   if (err) return console.log('error removing Tag document');
//   console.log('Tag document removed!');
// });

module.exports = Tag;
