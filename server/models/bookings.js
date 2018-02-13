const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// define the User model schema
const BookingsSchema = new mongoose.Schema({

  pid: { type: Schema.Types.ObjectId, required: true },
  reserved: {
    from: Date,
    to: Date,
  },

});



/**
 * The pre-save hook method.
 */
BookingsSchema.pre('save', function saveHook(next) {
  const post = this;
  console.log(this);
  console.log('------WAS SAVED!');

  var Bookings = mongoose.model('Bookings', BookingsSchema);

  // Bookings.find({ uid: this.uid }, function (err, row) {
  //   if (err) return err;
  //   // Prints "Space Ghost is a talk show host".
  //   // console.log(row);
  //   // for (var i = 0; i < row.length; i++) {
  //   //   console.log(row[i]);
  //   // }
  //
  // });

  return next();
});



module.exports = mongoose.model('Bookings', BookingsSchema);
