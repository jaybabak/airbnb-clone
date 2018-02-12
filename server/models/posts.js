const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// define the User model schema
const PostySchema = new mongoose.Schema({

  uid: {type: Schema.Types.ObjectId, required: true},
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
  console.log(this.uid);
  console.log('------WAS SAVED!');

  var Posty = mongoose.model('Posty', PostySchema);

  Posty.find({ }, function (err, row) {
    if (err) return err;
    // Prints "Space Ghost is a talk show host".
    // console.log(row);
    for (var i = 0; i < row.length; i++) {
      // console.log(row[i]);
    }

  });

  return next();
});



module.exports = mongoose.model('Posty', PostySchema);
