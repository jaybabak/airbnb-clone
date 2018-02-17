const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// define the User model schema
const BookingsSchema = new mongoose.Schema({

  pid: { type: Schema.Types.ObjectId, required: true },
  uid: { type: Schema.Types.ObjectId, required: true },
  from: Date,
  to: Date,

});

/**
 * The pre-save hook method.
 */
BookingsSchema.pre('save', function saveHook(next) {
  const post = this;
  var Bookings = mongoose.model('Bookings', BookingsSchema);

  return next();
});

module.exports = mongoose.model('Bookings', BookingsSchema);
