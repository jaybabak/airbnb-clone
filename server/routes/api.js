const express = require('express');
const Posty = require('mongoose').model('Posty');
const router = new express.Router();


//---Form Validation for Add Post
function validateAddPostForm(formData) {

//NEED TO ADD addditonal validation for numbers min max etc.....
//VALIDATION HERE AS WELL BEFORE THE SAVE FUNCTION TO MAKE SURE DB DOESN'T CRASH


  const errors = {};
  let isFormValid = true;
  let message = '';

  // console.log(formData);

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

  return {
    success: isFormValid,
    message,
    errors
  };
}

function saveListing(listing, users){

  // console.log(users);

  //  LEFT OFF HEREEEEEEE --------

  let nodeObject = {};
  let problem = false;


  console.log(listing.to);
  // console.log(new Date(listing.to));

  const from = new Date(listing.from);
  const to = new Date(listing.to);
  console.log(from + '////' + to)

  nodeObject = {
    uid: users._id,
    city: listing.city,
    guests: listing.guests,
    type: listing.type,
    available: {
      from: from,
      to: to,
    }
  };

  console.log(nodeObject);

  let postObject = new Posty(nodeObject);




  var saved = postObject.save(function (err){

    if(err){

      problem = true;

      // console.log(err);
      return problem;
    }else {

      problem = false;

      return problem;
    }

  });

  //code to delete all documents in a collection
  // Posty.remove({}, function(err){
  //
  //   if(err){
  //     console.log(err);
  //   }else {
  //     console.log('------------------------ALL DOCUMENTS REMOVED FROM COLLECTION')
  //   }
  //
  // });

  return problem;



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

  if(req.user._id != null || req.user._id != ''){
    // const myLists = getUserLists(req.body.uid);
    // console.log(myLists);
    const all = Posty.find({ uid: req.user._id }, function (err, row) {
      if (err){
        return err
      }

      console.log(row);

      res.status(200).json({
        message: "You're authorized to see this secret message.",
        user: req.user,
        data: row
      });

      // allUserListings[0] = "";
    });

  }else {
    res.status(200).json({
      success: false,
      message: 'No listings found.',
    });
  }
});


router.get('/listing/:id', (req, res) => {

  // console.log(req.user);
  // console.log(req);
  var postID = req.url.split('/');


  if(postID !== 'null'){

    // console.log(postID[2]);
    // const myLists = getUserLists(req.body.uid);
    // console.log(myLists);
    const all = Posty.find({ _id: postID[2] }, function (err, item) {
      if (err){
        return err
      }
    //
      // console.log(item);
    //
      res.status(200).json({
        message: "You're authorized to see this secret message.",
        postData: item
      });
    //
    //   // allUserListings[0] = "";
    });

  }else {
    res.status(200).json({
      success: false,
      message: 'No listing found.',
    });
  }
});

router.get('/listing/:id/book', (req, res) => {

  // console.log(req.user);
  console.log(req);
  // var postID = req.url.split('/');

  // if(postID !== 'null'){
  //
  //   // console.log(postID[2]);
  //   // const myLists = getUserLists(req.body.uid);
  //   // console.log(myLists);
  //   const all = Posty.find({ _id: postID[2] }, function (err, item) {
  //     if (err){
  //       return err
  //     }
  //   //
  //     // console.log(item);
  //   //
  //     res.status(200).json({
  //       message: "You're authorized to see this secret message.",
  //       postData: item
  //     });
  //   //
  //   //   // allUserListings[0] = "";
  //   });
  //
  // }else {
  //   res.status(200).json({
  //     success: false,
  //     message: 'No listing found.',
  //   });
  // }
});



router.get('/views/random', (req, res) => {

  // console.log(req.user._id);

  if(req != null){
    // const myLists = getUserLists(req.body.uid);
    // console.log(myLists);
    const viewsRandom = Posty.find({}, function (err, row) {
      if (err){
        return err
      }

      // console.log(row);

      res.status(200).json({
        message: "You're authorized to see this secret message.",
        data: row
      });

      // allUserListings[0] = "";
    }).limit(25);

  }else {
    res.status(200).json({
      success: false,
      message: 'No listings found.',
    });
  }
});


//LEFT OFF HEREE ------------------------------------------
// creatinG dynamic route for each user to view only his own listings

// router.get('/dashboard', (req, res) => {
//   res.status(200).json({
//     message: "You're authorized to see this secret message.",
//     // user values passed through from auth middleware
//     user: req.user
//   });
// });

router.route('/add').post((req, res) => {

  // console.log(req.body);
  // res.status(200).send('OK');
  const formResults = validateAddPostForm(req.body);

  // const postResults = saveListing(req.body, req.user);
  // console.log(postResults);

  if (!formResults.success) {
    return res.status(400).json({
      success: false,
      message: formResults.message,
      errors: formResults.errors
    });
  }else if(formResults.success){

    saveListing(req.body, req.user)

    return res.status(200).json({
      success: true,
      message: 'You have successfully added a new listing!',
      user: req.user,
      post: req.body,
    });
  }

});



module.exports = router;
