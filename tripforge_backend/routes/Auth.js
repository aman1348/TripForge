const express = require('express');
const {createUser, loginUser, checkAuth, request_otp, verify_otp, updatePassword} = require('../controller/Auth');
const passport = require('passport');
const router = express.Router();
router.post('/signup',createUser)
      .post('/login',passport.authenticate('local'),loginUser)
      .get('/check',passport.authenticate('jwt'),checkAuth)
      .post('/request-otp', request_otp)
      .post('verify-otp', verify_otp)
      .post('/reset-password', updatePassword);

console.log("in routes");
module.exports = router;