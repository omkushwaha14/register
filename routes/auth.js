const express = require('express');
const { signup, signin, signout, forgotPassword, resetPassword } = require('../controllers/auth');

// import password reset validator
const { userSignupValidator, userSigninValidator, passwordResetValidator } = require('../validator');


const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', userSigninValidator, signin);
router.get('/signout', signout);

// password forgot and reset routes
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', passwordResetValidator, resetPassword);
 



module.exports = router;
