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

module.exports = mongoose.model('Tag', TagSchema);
