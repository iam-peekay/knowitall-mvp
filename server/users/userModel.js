// // Credit for this user auth code: Hack Reactor
// var mongoose = require('mongoose');
// Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');
// var Q = require('q');
// var SALT_WORK_FACTOR = 10;

// // array of ObjectIds. Ref object tells Mongoose which model to use during population, in our case, Question model. All _ids we store here must be document _ids from Question model

// var UserSchema = new Schema({

//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },

//   questions: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Question'
//   }]

//   // password: {
//   //   type: String,
//   //   required: true
//   // },
//   // salt: {
//   //   type: String
//   // },

// });

// module.exports = mongoose.model('User', UserSchema);

// UserSchema.methods.comparePasswords = function (candidatePassword) {
//   var defer = Q.defer();
//   var savedPassword = this.password;
//   bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
//     if (err) {
//       defer.reject(err);
//     } else {
//       defer.resolve(isMatch);
//     }
//   });
//   return defer.promise;
// };

// UserSchema.pre('save', function (next) {
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) {
//     return next();
//   }

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) {
//       return next(err);
//     }

//     // hash the password along with our new salt
//     bcrypt.hash(user.password, salt, null, function (err, hash) {
//       if (err) {
//         return next(err);
//       }

//       // override the cleartext password with the hashed one
//       user.password = hash;
//       user.salt = salt;
//       next();
//     });
//   });
// });

