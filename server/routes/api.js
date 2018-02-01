const express = require('express');
const Posty = require('mongoose').model('Posty');
const router = new express.Router();


//---Form Validation for Add Post
function validateAddPostForm(formData) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!formData || typeof formData.city !== 'string' || formData.city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please provide a valid city';
  }

  if (!formData || typeof formData.guests !== 'string' || formData.guests.trim().length === 0 || isNaN(formData.guests )) {
    isFormValid = false;
    errors.guests = 'Please enter a valid number';
  }

  if (!formData || typeof formData.type !== 'string' || formData.type.trim().length === 0 ) {
    isFormValid = false;
    errors.type = 'Cannot leave blank';
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

  let nodeObject = {};
  let problem = false;

  nodeObject = {
    uid: users._id,
    city: listing.city,
    guests: listing.guests,
    type: listing.type
  };

  // console.log(nodeObject);

  let postObject = new Posty(nodeObject);

  var saved = postObject.save(function (err){

    if(err){

      problem = true;

      console.log(err);
      return problem;
    }else {

      problem = false;

      return problem;
    }

  });

  return problem;



}


router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});

router.route('/add').post((req, res) => {

  // console.log(req.body);
  // res.status(200).send('OK');
  const formResults = validateAddPostForm(req.body);

  const postResults = saveListing(req.body, req.user);
  // console.log(postResults);

  if (!formResults.success) {
    return res.status(400).json({
      success: false,
      message: formResults.message,
      errors: formResults.errors
    });
  }

  ///ADD LOGIC FOR SAVING TO THE DATABASE HERE BY KEEPING UNIQUE EMAIL ID FOR EVERY POSTS
  //REORGANIZE THE SCHEMA SO THAT POSTS ARE SEPERATE DOCUMENT TYPE

  return res.status(200).json({
    success: true,
    message: 'You have successfully added a new listing!',
    user: req.user,
    post: req.body,
  });
});



module.exports = router;
