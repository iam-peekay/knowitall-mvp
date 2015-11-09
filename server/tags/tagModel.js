var mongoose = require('mongoose');
var crypto = require('crypto');
Schema = mongoose.Schema;

// declared the Question _creator property as a Number, the same type as the _id used in the UserSchema. It is important to match the type of _id to the type of ref.
// http://mongoosejs.com/docs/populate.html

var TagSchema = new Schema({
  name: {
    type: String,
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

var Tag = mongoose.model('Tag', TagSchema);

// Tag.create({ name: 'test' }, function (err, small) {
//   if (err) return console.log('error creating Tag model');
//   console.log('Tag model created!');
// });

// Tag.create({ name: 'test2' }, function (err, small) {
//   if (err) return console.log('error creating Tag model');
//   console.log('Tag model created!');
// });

module.exports = Tag;
