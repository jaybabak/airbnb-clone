const express = require('express');
const mongoose = require('mongoose')
const Posty = mongoose.model('Posty');
const Bookings = mongoose.model('Bookings');
const router = new express.Router();

//---Form Validation for Add Post
function validateAddPostForm(formData) {

  //NEED TO ADD addditonal validation for numbers min max etc.....
  //VALIDATION HERE AS WELL BEFORE THE SAVE FUNCTION TO MAKE SURE DB DOESN'T CRASH

  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!formData || typeof formData.city !== 'string' || formData.city.trim().length === 0 || formData.city == 'undefined') {
    isFormValid = false;
    errors.city = 'Please provide a valid city';
  }

  if (!formData || typeof formData.guests !== 'string' || formData.guests.trim().length === 0 || isNaN(formData.guests) && typeof formData != 'undefined') {
    isFormValid = false;
    errors.guests = 'Please enter a valid number';
  }

  if (!formData || typeof formData.type !== 'string' || formData.type.trim().length === 0 || formData.type == 'undefined') {
    isFormValid = false;
    errors.type = 'Must select an option';
  }

  if (!formData || typeof formData.from !== 'string' || formData.from.trim().length === 0 || formData.from == 'undefined') {
    isFormValid = false;
    errors.from = 'Enter Date!';
  }

  if (!formData || typeof formData.to !== 'string' || formData.to.trim().length === 0 || formData.to == 'undefined') {
    isFormValid = false;
    errors.to = 'Enter Date!';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {success: isFormValid, message, errors};
}

function saveListing(listing, users) {

  let nodeObject = {};
  let problem = false;

  const from = listing.from;
  const to = listing.to;

  nodeObject = {
    uid: users._id,
    city: listing.city,
    guests: listing.guests,
    type: listing.type,
    available: {
      from: from,
      to: to
    }
  };

  let postObject = new Posty(nodeObject);

  var saved = postObject.save(function(err) {

    if (err) {
      problem = true;
      console.log(err);

      return problem;
    } else {
      problem = false;

      return problem;
    }

  });

  return problem;
}

function saveBooking(booking, pids, user) {

  let nodeObject = {};

  const from = new Date(booking.from);
  const to = new Date(booking.to);

  nodeObject = {
    pid: pids,
    uid: user._id,
    from: from,
    to: to
  };

  let postObject = new Bookings(nodeObject);
  let newID = mongoose.Types.ObjectId(pids);

  const testQuery = Bookings.find({
    pid: newID,
    from: {
      $lte: to
    },
    to: {
      $gte: from
    }
  }, function(err, row) {
    if (err) {
      return err
    }

    // console.log(row);

    if (row && row.length > 0) {

      console.log('\n\n\n------------------------------------ QUERY DATA START');
      console.log(row);
      console.log('\n\n\n------------------------------------ QUERY DATA END');
      // console.log(isBooked);
      // console.log('Not Booked');
    } else {
      // ---------------------------------------------
      // SAVES THE nodeObject
      //
      var saved = postObject.save(function(err) {
        if (err) {
          console.log(err);
          return err;
        }
      });
    }
  });
}

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});

router.get('/listings', (req, res) => {

  // console.log(req.user._id);

  if (req.user._id != null || req.user._id != '') {
    // const myLists = getUserLists(req.body.uid);
    // console.log(myLists);
    const all = Posty.find({
      uid: req.user._id
    }, function(err, row) {
      if (err) {
        return err
      }

      res.status(200).json({message: "Sucess", user: req.user, data: row});
    });

  } else {
    res.status(200).json({success: false, message: 'No listings found.'});
  }
});

router.get('/listing/:id', (req, res) => {

  //----need TO ADDRESS THIS QUESTION
  var postID = req.url.split('/');

  if (postID !== 'null') {

    const all = Posty.find({
      _id: postID[2]
    }, function(err, item) {
      if (err) {
        return err
      }

      res.status(200).json({message: "Success", postData: item});
    });

  } else {
    res.status(200).json({success: false, message: 'No listing found.'});
  }
});

//ROUTE FOR INVIDUAL BOOKING!!! --------------------------------
router.post('/book/:id/', (req, res) => {

  var upid = req.body.pid;

  if(req.body.from != 'undefined'){

    console.log('Successful booking');
    console.log(upid);
    const BookingResult = saveBooking(req.body, req.body.pid, req.user);
    res.status(200).json({success: true, message: 'Booking submitted cant tell you if its already booked'});

  }else{
    console.log('Empty dates recieved');
        console.log(upid);
    res.status(400).json({success: false, message: 'Must enter the "From" date and "To" date to book.'});
  }
});

//ROUTE FOR LOADING INFORMATION ABOUT THE POST IN QUESTION

router.get('/book/:id/', (req, res) => {


  console.log(req.url.split('/')[2]);

  const pid = req.url.split('/')[2];

  if (pid !== 'undefined') {
    const all = Posty.find({
      _id: pid
    }, function(err, item) {
      if (err) {
        return err
      }

      res.status(200).json({message: "Success", postData: item});
    });

  } else {
    res.status(200).json({success: false, message: 'Could not load the listing. Error.'});
  }

});

router.get('/views/random', (req, res) => {

  console.log(req.user);

  if (req != null) {

    const getAuthor = Posty.aggregate([
      // Unwind the source
      {
        $match: {},
      }, {
        //creating a join to the users enitity and grabbing authors name
        $lookup: {
          from: 'users',
          localField: 'uid',
          foreignField: '_id',
          as: 'author'
        }
      }, {
        //removing fields from the returned results query
        $project: {
          "author.email": 0,
          "author.password": 0,
          "author._id": 0
        }
      }
    ], function(errs, rows) {

      if (errs) {
        return errs
      }

      res.status(200).json({message: "Success", data: rows});

    });
    //updating uid to object ID
    const viewsRandom = Posty.find({}, function(err, row) {
      if (err) {
        return err
      }
    });

  } else {
    res.status(200).json({success: false, message: 'No listings found.'});
  }
});

router.route('/add').post((req, res) => {

  const formResults = validateAddPostForm(req.body);

  if (!formResults.success) {
    return res.status(400).json({success: false, message: formResults.message, errors: formResults.errors});
  } else if (formResults.success) {

    saveListing(req.body, req.user)

    return res.status(200).json({success: true, message: 'You have successfully added a new listing!', user: req.user, post: req.body});
  }

});

module.exports = router;
