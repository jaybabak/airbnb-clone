const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// define the User model schema
const PostSchema = new mongoose.Schema({

  uid: String,
  city: { type: String, trim: true, required: true },
  guests: { type: Number, min: 1, max:12, required: true },
  type: { type: String, trim: true, required: true },

});



/**
 * The pre-save hook method.
 */
PostSchema.pre('save', function saveHook(next) {
  const post = this;
  // console.log(this);
  return next();
});



module.exports = mongoose.model('Post', PostSchema);
