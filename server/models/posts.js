const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// define the User model schema
const PostySchema = new mongoose.Schema({

  uid: { type: Schema.Types.ObjectId, required: true },
  city: { type: String, trim: true, required: true },
  guests: { type: Number, min: 1, max:12, required: true },
  type: { type: String, trim: true, required: true },
  available: {
    from: Date,
    to: Date,
  },

});



/**
 * The pre-save hook method.
 */
PostySchema.pre('save', function saveHook(next) {
  const post = this;
  console.log(this);
  console.log('------WAS SAVED!');

  var Posty = mongoose.model('Posty', PostySchema);

  return next();
});



module.exports = mongoose.model('Posty', PostySchema);
